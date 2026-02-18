"use client";

import { Search, X, Calendar as CalendarIcon, ChevronDown, ChevronUp, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

interface AnalysisFiltersProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    selectedSeverity: string;
    onSeverityChange: (value: string) => void;
    selectedLanguage: string;
    onLanguageChange: (value: string) => void;
    dateRange: { from: string; to: string };
    onDateRangeChange: (range: { from: string; to: string }) => void;
    sortBy: string;
    onSortByChange: (value: string) => void;
    sortOrder: "asc" | "desc";
    onSortOrderChange: (order: "asc" | "desc") => void;
    onClearFilters: () => void;
    availableLanguages: string[];
}

export const AnalysisFilters = ({
    searchTerm,
    onSearchChange,
    selectedSeverity,
    onSeverityChange,
    selectedLanguage,
    onLanguageChange,
    dateRange,
    onDateRangeChange,
    sortBy,
    onSortByChange,
    sortOrder,
    onSortOrderChange,
    onClearFilters,
    availableLanguages,
}: AnalysisFiltersProps) => {
    const hasActiveFilters =
        searchTerm !== "" ||
        selectedSeverity !== "all" ||
        selectedLanguage !== "all" ||
        dateRange.from !== "" ||
        dateRange.to !== "";

    const activeFilterCount = [
        searchTerm !== "",
        selectedSeverity !== "all",
        selectedLanguage !== "all",
        dateRange.from !== "" || dateRange.to !== "",
    ].filter(Boolean).length;

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Search */}
                <div className="relative">
                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    <Input
                        placeholder="Search projects or keywords..."
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="focus:border-primary/50 focus:ring-primary/20 h-10 w-full border-white/10 bg-black/20 pl-9 text-slate-200 placeholder:text-slate-600"
                    />
                </div>

                {/* Language Filter */}
                <Select value={selectedLanguage} onValueChange={onLanguageChange}>
                    <SelectTrigger className="focus:border-primary/50 focus:ring-primary/20 h-10 border-white/10 bg-black/20 text-slate-200">
                        <SelectValue placeholder="Language" />
                    </SelectTrigger>
                    <SelectContent className="border-white/10 bg-black/90 text-slate-200">
                        <SelectItem value="all">All Languages</SelectItem>
                        {availableLanguages.map((lang) => (
                            <SelectItem key={lang} value={lang}>
                                {lang.charAt(0).toUpperCase() + lang.slice(1)}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Severity Filter */}
                <Select value={selectedSeverity} onValueChange={onSeverityChange}>
                    <SelectTrigger className="focus:border-primary/50 focus:ring-primary/20 h-10 border-white/10 bg-black/20 text-slate-200">
                        <SelectValue placeholder="Severity" />
                    </SelectTrigger>
                    <SelectContent className="border-white/10 bg-black/90 text-slate-200">
                        <SelectItem value="all">All Severities</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                </Select>

                {/* Date Range Picker */}
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className={`focus:border-primary/50 h-10 w-full justify-start border-white/10 bg-black/20 text-left font-normal text-slate-200 hover:border-white/20 hover:bg-white/10 ${!dateRange.from && !dateRange.to && "text-slate-500"
                                }`}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {dateRange.from || dateRange.to ? (
                                <>
                                    {dateRange.from || "..."} - {dateRange.to || "..."}
                                </>
                            ) : (
                                <span>Pick a date range</span>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto border-white/10 bg-black/90 p-4" align="start">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="font-mono text-xs font-medium text-slate-400">From Date</label>
                                <Input
                                    type="date"
                                    value={dateRange.from}
                                    onChange={(e) =>
                                        onDateRangeChange({ ...dateRange, from: e.target.value })
                                    }
                                    className="border-white/10 bg-black/20 text-slate-200"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="font-mono text-xs font-medium text-slate-400">To Date</label>
                                <Input
                                    type="date"
                                    value={dateRange.to}
                                    onChange={(e) =>
                                        onDateRangeChange({ ...dateRange, to: e.target.value })
                                    }
                                    className="border-white/10 bg-black/20 text-slate-200"
                                />
                            </div>
                            {(dateRange.from || dateRange.to) && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="w-full text-slate-400 hover:bg-white/10 hover:text-white"
                                    onClick={() => onDateRangeChange({ from: "", to: "" })}
                                >
                                    Clear Range
                                </Button>
                            )}
                        </div>
                    </PopoverContent>
                </Popover>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                    {/* Sort By */}
                    <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-medium tracking-wider text-slate-400 uppercase">Sort:</span>
                        <Select value={sortBy} onValueChange={onSortByChange}>
                            <SelectTrigger className="h-8 w-[140px] border-white/10 bg-black/20 text-slate-200">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="border-white/10 bg-black/90 text-slate-200">
                                <SelectItem value="date">Date</SelectItem>
                                <SelectItem value="score">Security Score</SelectItem>
                                <SelectItem value="issues">Issue Count</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onSortOrderChange(sortOrder === "asc" ? "desc" : "asc")}
                            className="h-8 w-8 border border-white/10 bg-black/20 p-0 text-slate-400 hover:bg-white/10 hover:text-white"
                        >
                            {sortOrder === "asc" ? (
                                <ChevronUp className="h-4 w-4" />
                            ) : (
                                <ChevronDown className="h-4 w-4" />
                            )}
                        </Button>
                    </div>

                    {/* Active Filter Indicators */}
                    {hasActiveFilters && (
                        <div className="ml-2 flex items-center gap-2 border-l border-white/10 pl-4">
                            <span className="font-mono text-xs font-medium tracking-wider text-slate-500 uppercase">
                                Active ({activeFilterCount}):
                            </span>
                            <div className="flex flex-wrap gap-1">
                                {searchTerm && (
                                    <Badge variant="secondary" className="h-6 gap-1 border border-white/10 bg-white/5 px-2 py-0 font-mono text-[10px] text-slate-300">
                                        Search: {searchTerm.length > 10 ? searchTerm.substring(0, 10) + "..." : searchTerm}
                                        <X
                                            className="h-3 w-3 cursor-pointer hover:text-white"
                                            onClick={() => onSearchChange("")}
                                        />
                                    </Badge>
                                )}
                                {selectedLanguage !== "all" && (
                                    <Badge variant="secondary" className="h-6 gap-1 border border-white/10 bg-white/5 px-2 py-0 font-mono text-[10px] text-slate-300">
                                        Lang: {selectedLanguage}
                                        <X
                                            className="h-3 w-3 cursor-pointer hover:text-white"
                                            onClick={() => onLanguageChange("all")}
                                        />
                                    </Badge>
                                )}
                                {selectedSeverity !== "all" && (
                                    <Badge variant="secondary" className="h-6 gap-1 border border-white/10 bg-white/5 px-2 py-0 font-mono text-[10px] text-slate-300">
                                        Sev: {selectedSeverity}
                                        <X
                                            className="h-3 w-3 cursor-pointer hover:text-white"
                                            onClick={() => onSeverityChange("all")}
                                        />
                                    </Badge>
                                )}
                                {(dateRange.from || dateRange.to) && (
                                    <Badge variant="secondary" className="h-6 gap-1 border border-white/10 bg-white/5 px-2 py-0 font-mono text-[10px] text-slate-300">
                                        Date Range
                                        <X
                                            className="h-3 w-3 cursor-pointer hover:text-white"
                                            onClick={() => onDateRangeChange({ from: "", to: "" })}
                                        />
                                    </Badge>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {hasActiveFilters && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClearFilters}
                        className="h-8 gap-2 font-mono text-xs text-slate-400 hover:bg-white/10 hover:text-white"
                    >
                        <RotateCcw className="h-3.5 w-3.5" />
                        RESET_ALL
                    </Button>
                )}
            </div>
        </div>
    );
};
