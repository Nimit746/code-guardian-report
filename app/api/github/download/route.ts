import { NextRequest, NextResponse } from "next/server";

/**
 * GitHub Repository Download Proxy
 *
 * This API route acts as a server-side proxy to download GitHub repositories.
 * It solves CORS issues when downloading repository archives directly from the browser.
 *
 * Endpoints:
 * - API zipball: /repos/{owner}/{repo}/zipball/{branch}
 * - Archive URL: github.com/{owner}/{repo}/archive/refs/heads/{branch}.zip
 */

export const runtime = "nodejs"; // Ensure Node.js runtime for fetch capabilities
export const maxDuration = 60; // Max 60 seconds for large repositories

interface DownloadParams {
  owner: string;
  repo: string;
  branch: string;
  useArchive?: boolean; // If true, use public archive URL instead of API
}

/**
 * POST /api/github/download
 * Downloads a GitHub repository as a zip file via server-side proxy
 */
export async function POST(request: NextRequest) {
  try {
    const body: DownloadParams = await request.json();
    const { owner, repo, branch, useArchive = false } = body;

    // Validate required parameters
    if (!owner || !repo || !branch) {
      return NextResponse.json(
        { error: "Missing required parameters: owner, repo, branch" },
        { status: 400 }
      );
    }

    // Security: Validate owner and repo names (GitHub restrictions)
    const validNamePattern = /^[a-zA-Z0-9._-]+$/;
    if (!validNamePattern.test(owner) || !validNamePattern.test(repo)) {
      return NextResponse.json(
        { error: "Invalid owner or repository name" },
        { status: 400 }
      );
    }

    // Validate branch name (allow slashes for branch names like 'feature/branch')
    const validBranchPattern = /^[a-zA-Z0-9._/-]+$/;
    if (!validBranchPattern.test(branch)) {
      return NextResponse.json(
        { error: "Invalid branch name" },
        { status: 400 }
      );
    }

    // Construct the download URL
    let downloadUrl: string;
    const headers: HeadersInit = {
      "User-Agent": "CodeGuardian-Security-Scanner/11.0.0",
      Accept: "application/vnd.github+json",
    };

    if (useArchive) {
      // Use public archive URL (no authentication required for public repos)
      downloadUrl = `https://github.com/${owner}/${repo}/archive/refs/heads/${branch}.zip`;
    } else {
      // Use GitHub API zipball endpoint
      downloadUrl = `https://api.github.com/repos/${owner}/${repo}/zipball/${branch}`;

      // Add GitHub token if available for higher rate limits
      const githubToken =
        process.env.GITHUB_TOKEN || process.env.NEXT_PUBLIC_GITHUB_TOKEN;
      if (githubToken) {
        headers["Authorization"] = `Bearer ${githubToken}`;
      }
    }

    console.log(`[GitHub Proxy] Downloading from: ${downloadUrl}`);

    // Fetch the repository archive from GitHub
    const response = await fetch(downloadUrl, {
      headers,
      redirect: "follow",
    });

    if (!response.ok) {
      console.error(
        `[GitHub Proxy] Download failed: ${response.status} ${response.statusText}`
      );

      // Handle specific error cases
      if (response.status === 404) {
        return NextResponse.json(
          {
            error: `Repository or branch not found. Please verify that ${owner}/${repo} exists and branch '${branch}' is correct.`,
            status: 404,
          },
          { status: 404 }
        );
      }

      if (response.status === 403) {
        const rateLimitRemaining = response.headers.get(
          "x-ratelimit-remaining"
        );
        if (rateLimitRemaining === "0") {
          return NextResponse.json(
            {
              error:
                "GitHub API rate limit exceeded. Please try again later or configure a GitHub token.",
              status: 403,
            },
            { status: 429 }
          );
        }

        return NextResponse.json(
          {
            error:
              "Access forbidden. The repository might be private or require authentication.",
            status: 403,
          },
          { status: 403 }
        );
      }

      return NextResponse.json(
        {
          error: `Failed to download repository: ${response.statusText}`,
          status: response.status,
        },
        { status: response.status }
      );
    }

    // Get the content as a blob
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();

    console.log(
      `[GitHub Proxy] Successfully downloaded ${arrayBuffer.byteLength} bytes`
    );

    // Return the zip file with appropriate headers
    return new NextResponse(arrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${owner}-${repo}-${branch}.zip"`,
        "Content-Length": arrayBuffer.byteLength.toString(),
        // CORS headers for client-side access
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error) {
    console.error("[GitHub Proxy] Error:", error);

    return NextResponse.json(
      {
        error: "Internal server error while downloading repository",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS /api/github/download
 * Handle CORS preflight requests
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400", // 24 hours
    },
  });
}
