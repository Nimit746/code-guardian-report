# Security Policy

## Overview

Code Guardian Report is committed to maintaining the highest security standards for our users. This document outlines our security practices, vulnerability reporting process, and guidelines for secure usage of the application.

We take security seriously and encourage responsible disclosure of any vulnerabilities you may discover. This policy applies to all Code Guardian Report services, including the web application, API endpoints, and any associated infrastructure.

---

## Supported Versions

We release patches for security vulnerabilities. Which versions are eligible for receiving such patches depends on the CVSS v3.0 Rating:

| Version | Supported          | Security Updates |
| ------- | ------------------ | ---------------- |
| 10.x.x  | :white_check_mark: | Yes              |
| 9.x.x   | :white_check_mark: | Yes              |
| < 9.0   | :x:                | No               |

### Version Support Policy

- **Critical (CVSS 9.0-10.0)**: Patches released within 48 hours
- **High (CVSS 7.0-8.9)**: Patches released within 7 days
- **Medium (CVSS 4.0-6.9)**: Patches released within 14 days
- **Low (CVSS 0.1-3.9)**: Patches included in next scheduled release

---

## Reporting a Vulnerability

Please report (suspected) security vulnerabilities to **[security@example.com](mailto:security@example.com)** or through GitHub's private vulnerability reporting feature. You will receive a response from us within 48 hours. If the issue is confirmed, we will release a patch as soon as possible depending on complexity but historically within a few days.

### How to Report

1. **GitHub Private Reporting (Preferred)**: Use GitHub's [private vulnerability reporting](https://github.com/Xenonesis/code-guardian-report/security/advisories/new) feature to submit a security advisory.

2. **Email**: Send details to the security email listed above.

### What to Include

When reporting a vulnerability, please include:

- **Description**: A detailed description of the vulnerability
- **Impact**: What an attacker could potentially achieve
- **Steps to Reproduce**: Clear steps to reproduce the issue
- **Affected Versions**: Which versions are affected
- **Suggested Fix**: If you have suggestions for how to fix the vulnerability
- **Proof of Concept**: If applicable, a minimal proof of concept

### What to Expect

- **Acknowledgment**: We will acknowledge receipt of your vulnerability report within 48 hours.
- **Communication**: We will keep you informed about the progress of fixing and announcing the vulnerability.
- **Credit**: We will credit you in the security advisory (unless you prefer to remain anonymous).
- **Timeline**: We aim to resolve critical vulnerabilities within 7 days of confirmation.

---

## Security Best Practices

### For Users

- **Keep Updated**: Always use the latest version of Code Guardian Report
- **Dependency Management**: Keep your dependencies up to date
- **Security Advisories**: Review security advisories regularly
- **Environment Variables**: Use environment variables for sensitive configuration
- **Strong Authentication**: Use strong, unique passwords and enable 2FA when available
- **Network Security**: Access the application only over HTTPS
- **Session Management**: Log out after use, especially on shared devices
- **Data Backup**: Regularly backup your analysis data

### For Contributors

- **No Secrets**: Never commit sensitive data (API keys, passwords, tokens)
- **Secure Coding**: Follow secure coding practices
- **Immediate Reporting**: Report any security concerns immediately
- **Code Review**: Review the [CONTRIBUTING.md](./md/CONTRIBUTING.md) guidelines
- **Testing**: Write security tests for new features
- **Dependencies**: Audit dependencies before adding them

---

## Data Privacy and Handling

### Data Collection

Code Guardian Report collects the following types of data:

- **Analysis Results**: Code analysis findings and security metrics
- **User Preferences**: Application settings and preferences
- **Usage Analytics**: Anonymous usage statistics for improvement
- **Authentication Data**: Minimal data required for authentication

### Data Storage

- **Client-Side Storage**: User preferences and non-sensitive data stored locally
- **Firebase Storage**: Analysis results stored securely in Firebase
- **Encryption**: Sensitive data encrypted at rest and in transit
- **Data Retention**: User data retained according to our privacy policy

### Data Sharing

- **No Third-Party Sharing**: We do not sell or share user data with third parties
- **Service Providers**: Limited data shared only with necessary service providers
- **Legal Compliance**: Data may be disclosed when required by law

### User Rights

- **Access**: Users can request access to their data
- **Deletion**: Users can request deletion of their data
- **Export**: Users can export their analysis data
- **Correction**: Users can correct inaccurate data

---

## Authentication and Authorization

### Authentication Methods

- **GitHub OAuth**: Primary authentication method via GitHub OAuth 2.0
- **Firebase Authentication**: Backend authentication service
- **Session Management**: Secure session tokens with expiration

### Authorization Model

- **Role-Based Access Control**: Different access levels for different user types
- **Resource Ownership**: Users can only access their own analysis data
- **Permission Scopes**: Minimal required permissions for GitHub access

### Security Features

- **Token Management**: Secure token storage and rotation
- **Session Expiration**: Automatic session timeout after inactivity
- **Multi-Factor Authentication**: Support for 2FA where applicable
- **Account Recovery**: Secure account recovery process

---

## API Security Considerations

### API Endpoints

All API endpoints implement the following security measures:

- **Rate Limiting**: Protection against abuse and DoS attacks
- **Input Validation**: Strict validation of all input parameters
- **Output Encoding**: Proper encoding of output to prevent XSS
- **Authentication**: Required authentication for protected endpoints
- **CORS**: Configured Cross-Origin Resource Sharing policies

### API Key Management

- **Secure Storage**: API keys stored securely in environment variables
- **Rotation**: Regular rotation of API keys
- **Scope Limitation**: Keys limited to minimum required permissions
- **Revocation**: Ability to revoke compromised keys

### API Usage Best Practices

- **HTTPS Only**: All API calls must use HTTPS
- **Error Handling**: Proper error handling without exposing sensitive information
- **Logging**: Security-relevant events logged for audit purposes
- **Versioning**: API versioning for backward compatibility

---

## Dependency Security

### Dependency Management

- **Automated Updates**: Dependabot configured for automated dependency updates
- **Vulnerability Scanning**: Regular scanning for known vulnerabilities
- **Pinning**: Production dependencies pinned to specific versions
- **Review Process**: Manual review of all dependency updates

### Security Audits

- **CodeQL**: Automated code scanning with CodeQL
- **Secret Scanning**: GitHub secret scanning enabled
- **Snyk**: Integration with Snyk for vulnerability detection
- **Manual Review**: Regular manual security audits

### Third-Party Libraries

- **Minimal Dependencies**: Use of minimal, well-maintained libraries
- **Reputation**: Preference for libraries with strong security reputation
- **Active Maintenance**: Only actively maintained dependencies
- **License Compliance**: All dependencies comply with project license

---

## Environment Variables and Secrets Management

### Required Environment Variables

The following environment variables must be configured:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# GitHub OAuth
NEXT_PUBLIC_GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# AI Services (Optional)
OPENAI_API_KEY=your_openai_api_key
ANTHROPIC_API_KEY=your_anthropic_api_key

# Application
NEXT_PUBLIC_APP_URL=https://your-app-url.com
NODE_ENV=production
```

### Secrets Management Best Practices

- **Never Commit**: Never commit secrets to version control
- **Environment-Specific**: Use different secrets for different environments
- **Rotation**: Regular rotation of secrets
- **Access Control**: Limit access to secrets to authorized personnel
- **Encryption**: Secrets encrypted at rest
- **Audit Logging**: All secret access logged

### Local Development

- **Use .env.example**: Reference `.env.example` for required variables
- **Local Secrets**: Use local `.env` file (not committed)
- **Testing**: Test with non-production secrets
- **Documentation**: Document all required environment variables

---

## Security Headers and CSP Configuration

### Implemented Security Headers

The application implements the following security headers:

```http
# Content Security Policy
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://*.firebaseio.com https://*.firebase.com https://api.github.com; frame-src 'self' https://*.firebase.com; object-src 'none'; base-uri 'self'; form-action 'self';

# Strict-Transport-Security
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload

# X-Content-Type-Options
X-Content-Type-Options: nosniff

# X-Frame-Options
X-Frame-Options: DENY

# X-XSS-Protection
X-XSS-Protection: 1; mode=block

# Referrer-Policy
Referrer-Policy: strict-origin-when-cross-origin

# Permissions-Policy
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

### Content Security Policy (CSP)

The CSP is configured to:

- **Restrict Sources**: Only allow resources from trusted origins
- **Prevent XSS**: Mitigate cross-site scripting attacks
- **Control Scripts**: Restrict script execution to approved sources
- **Frame Protection**: Prevent clickjacking attacks
- **Inline Restrictions**: Minimize use of inline scripts and styles

### CSP Violation Reporting

- **Report-Only Mode**: CSP violations reported without blocking in development
- **Monitoring**: Active monitoring of CSP violations in production
- **Adjustment**: Regular review and adjustment of CSP rules

---

## OWASP Top 10 Compliance

### A01:2021 – Broken Access Control

- **Implementation**: Proper access control checks on all endpoints
- **Testing**: Regular testing for access control vulnerabilities
- **Logging**: All access control failures logged

### A02:2021 – Cryptographic Failures

- **Encryption**: All sensitive data encrypted at rest and in transit
- **Strong Algorithms**: Use of industry-standard encryption algorithms
- **Key Management**: Secure key management practices

### A03:2021 – Injection

- **Input Validation**: Strict validation of all user input
- **Parameterized Queries**: Use of parameterized queries for database access
- **Output Encoding**: Proper encoding of output to prevent injection attacks

### A04:2021 – Insecure Design

- **Threat Modeling**: Regular threat modeling exercises
- **Security Requirements**: Security considered in all design decisions
- **Defense in Depth**: Multiple layers of security controls

### A05:2021 – Security Misconfiguration

- **Hardening**: All systems hardened according to best practices
- **Default Credentials**: No default credentials in production
- **Configuration Management**: Proper configuration management process

### A06:2021 – Vulnerable and Outdated Components

- **Dependency Management**: Regular updates of all dependencies
- **Vulnerability Scanning**: Automated scanning for known vulnerabilities
- **Patch Management**: Timely application of security patches

### A07:2021 – Identification and Authentication Failures

- **Strong Authentication**: Implementation of strong authentication mechanisms
- **Session Management**: Secure session management practices
- **Multi-Factor**: Support for multi-factor authentication

### A08:2021 – Software and Data Integrity Failures

- **Code Signing**: Code signing for production builds
- **Integrity Checks**: Verification of data integrity
- **Secure Updates**: Secure update mechanisms

### A09:2021 – Security Logging and Monitoring Failures

- **Comprehensive Logging**: Logging of all security-relevant events
- **Monitoring**: Active monitoring of security logs
- **Alerting**: Automated alerting for suspicious activities

### A10:2021 – Server-Side Request Forgery (SSRF)

- **Input Validation**: Strict validation of URLs and external requests
- **Network Segmentation**: Proper network segmentation
- **Allowlisting**: Use of allowlists for permitted destinations

---

## Security Measures

This project implements several security measures:

1. **Dependency Management**: Automated dependency updates via Dependabot
2. **Code Scanning**: Automated security scanning with CodeQL
3. **Secret Scanning**: GitHub secret scanning enabled
4. **Branch Protection**: Protected main branch with required reviews
5. **Security Headers**: Proper security headers in production
6. **Input Validation**: Comprehensive input validation on all endpoints
7. **Output Encoding**: Proper output encoding to prevent XSS
8. **Authentication**: Secure authentication with Firebase and GitHub OAuth
9. **Authorization**: Role-based access control
10. **Encryption**: Encryption of sensitive data at rest and in transit
11. **Rate Limiting**: Protection against abuse and DoS attacks
12. **Audit Logging**: Comprehensive logging of security events

---

## Disclosure Policy

When we receive a security bug report, we will:

1. **Confirm**: Confirm the problem and determine affected versions
2. **Audit**: Audit code to find any similar problems
3. **Prepare**: Prepare fixes for all supported versions
4. **Release**: Release new security fix versions
5. **Announce**: Publish security advisories with appropriate credit
6. **Coordinate**: Coordinate with reporters on disclosure timing

### Coordinated Disclosure

We follow a coordinated disclosure process:

- **Initial Response**: Acknowledge receipt within 48 hours
- **Investigation**: Investigate and validate the vulnerability
- **Fix Development**: Develop and test the fix
- **Release**: Release the fix to all supported versions
- **Public Disclosure**: Publish security advisory after fix is available

---

## Incident Response

### Incident Categories

- **Critical**: Immediate threat to user data or system integrity
- **High**: Significant security issue requiring urgent attention
- **Medium**: Security issue that should be addressed promptly
- **Low**: Minor security issue for next scheduled release

### Response Process

1. **Detection**: Identify and confirm the security incident
2. **Containment**: Limit the impact of the incident
3. **Eradication**: Remove the cause of the incident
4. **Recovery**: Restore normal operations
5. **Lessons Learned**: Document and learn from the incident

### Communication

- **Affected Users**: Timely notification of affected users
- **Public Disclosure**: Appropriate public disclosure for significant incidents
- **Transparency**: Clear and honest communication about incidents

---

## Contact Information

### Security Issues

- **Email**: [security@example.com](mailto:security@example.com)
- **GitHub**: [Private Vulnerability Reporting](https://github.com/Xenonesis/code-guardian-report/security/advisories/new)
- **Response Time**: Within 48 hours

### General Inquiries

- **Email**: [support@example.com](mailto:support@example.com)
- **GitHub Issues**: [Open an Issue](https://github.com/Xenonesis/code-guardian-report/issues)

### Security Team

The security team reviews all security reports and coordinates the response process. For urgent security matters, please mark your email as "URGENT" in the subject line.

---

## Comments on This Policy

If you have suggestions on how this process could be improved, please submit a pull request or open an issue. We value community feedback and are committed to continuously improving our security practices.

---

## Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [CWE Top 25](https://cwe.mitre.org/top25/)
- [Security Best Practices](https://github.com/github/github-security-lab)
- [Firebase Security](https://firebase.google.com/docs/security)
- [Next.js Security](https://nextjs.org/docs/app/building-your-application/configuring/security)

---

_Last Updated: 2025-02-11_
