"use client";

import { useState, useEffect } from "react";
import { Search, SlidersHorizontal, X, MapPin, IndianRupee } from "lucide-react";
import CollegeCard from "@/components/CollegeCard";
import CollegeCardSkeleton from "@/components/CollegeCardSkeleton";
import CompareBar from "@/components/CompareBar";
import { locations, feesRanges } from "@/lib/data";
import { College } from "@/lib/types";
import { fetchColleges, fetchSavedColleges } from "@/lib/api";

const ITEMS_PER_PAGE = 6;

export default function Home() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("all");
  const [feesRange, setFeesRange] = useState("all");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [loading, setLoading] = useState(true);
  const [compareList, setCompareList] = useState<College[]>([]);
  const [collegesList, setCollegesList] = useState<College[]>([]);
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [fetchError, setFetchError] = useState("");

  // 1. Fetch colleges on search/filter change
  useEffect(() => {
    const loadColleges = async () => {
      setLoading(true);
      setFetchError("");
      try {
        const res = await fetchColleges(search, location, feesRange);
        if (res.success && res.colleges) {
          setCollegesList(res.colleges);
        } else {
          setCollegesList([]);
          setFetchError(res.error || res.message || "Failed to load colleges.");
        }
      } catch (err) {
        console.error("Error fetching colleges:", err);
        setCollegesList([]);
        setFetchError("Could not reach the API. Is the backend running on port 5000?");
      } finally {
        setLoading(false);
      }
    };

    // Slight debounce for search inputs to prevent spamming
    const handler = setTimeout(loadColleges, search ? 300 : 0);
    return () => clearTimeout(handler);
  }, [search, location, feesRange]);

  // 2. Fetch user's saved colleges if logged in
  useEffect(() => {
    const loadSaved = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setSavedIds([]);
        return;
      }
      try {
        const res = await fetchSavedColleges();
        if (res.success && res.colleges) {
          setSavedIds(res.colleges.map((c) => Number(c.id)));
        }
      } catch (err) {
        console.error("Error fetching saved colleges:", err);
      }
    };
    loadSaved();
  }, [collegesList]); // Reload saves whenever colleges are updated

  // 3. Load initial compare IDs from localStorage
  useEffect(() => {
    const storedIdsStr = localStorage.getItem("compareIds");
    if (storedIdsStr) {
      try {
        const ids: number[] = JSON.parse(storedIdsStr);
        // Load colleges details matching stored IDs
        if (collegesList.length > 0 && ids.length > 0) {
          const list = collegesList.filter((c) => ids.includes(Number(c.id)));
          setCompareList(list);
        }
      } catch (err) {
        console.error("Compare localStorage error:", err);
      }
    }
  }, [collegesList]);

  const filtered = collegesList;
  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const handleCompare = (college: College) => {
    setCompareList((prev) => {
      let nextList;
      if (prev.find((c) => c.id === college.id)) {
        nextList = prev.filter((c) => c.id !== college.id);
      } else if (prev.length >= 3) {
        return prev;
      } else {
        nextList = [...prev, college];
      }
      localStorage.setItem("compareIds", JSON.stringify(nextList.map((c) => Number(c.id))));
      return nextList;
    });
  };

  const handleRemoveCompare = (id: string) => {
    setCompareList((prev) => {
      const nextList = prev.filter((c) => String(c.id) !== String(id));
      localStorage.setItem("compareIds", JSON.stringify(nextList.map((c) => Number(c.id))));
      return nextList;
    });
  };

  const handleClearCompare = () => {
    setCompareList([]);
    localStorage.removeItem("compareIds");
  };


  return (
    <main className="min-h-screen bg-gray-50/50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoLTZ2LTZoNnptMC0zMHY2aC02VjRoNnptMCAxMHY2aC02VjE0aDZ6bTAgMTB2NmgtNnYtNmg2em0tMTAgMHY2aC02di02aDZ6bS0xMCAwdjZoLTZ2LTZoNnptMzAgMHY2aC02di02aDZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Find the Right College
              <br />
              for Your Future
            </h1>
            <p className="text-blue-100 text-base sm:text-lg mb-8 max-w-xl mx-auto">
              Explore top colleges across India. Compare fees, placements, and ratings to make the best choice for your career.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <div className="flex items-center bg-white rounded-xl shadow-lg shadow-blue-900/20 overflow-hidden">
                <Search className="h-5 w-5 text-gray-400 ml-4 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search colleges by name or location..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setVisibleCount(ITEMS_PER_PAGE);
                  }}
                  className="flex-1 px-4 py-4 text-sm text-gray-800 placeholder-gray-400 focus:outline-none bg-transparent"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50/50 to-transparent" />
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 relative z-10">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
              <SlidersHorizontal className="h-4 w-4 text-blue-600" />
              Filter Colleges
            </div>
            {(location !== "all" || feesRange !== "all" || search !== "") && (
              <button
                onClick={() => {
                  setSearch("");
                  setLocation("all");
                  setFeesRange("all");
                  setVisibleCount(ITEMS_PER_PAGE);
                }}
                className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors"
              >
                <X className="h-3.5 w-3.5" />
                Clear all
              </button>
            )}
          </div>

          {/* Location Filter */}
          <div className="mb-4">
            <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 mb-2.5">
              <MapPin className="h-3.5 w-3.5" />
              Location
            </div>
            <div className="flex flex-wrap gap-2">
              {locations.map((loc) => (
                <button
                  key={loc.value}
                  onClick={() => {
                    setLocation(loc.value);
                    setVisibleCount(ITEMS_PER_PAGE);
                  }}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
                    location === loc.value
                      ? "bg-blue-600 text-white shadow-sm shadow-blue-200"
                      : "bg-gray-50 text-gray-600 border border-gray-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200"
                  }`}
                >
                  {loc.label}
                </button>
              ))}
            </div>
          </div>

          {/* Fees Filter */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 mb-2.5">
              <IndianRupee className="h-3.5 w-3.5" />
              Fees Range
            </div>
            <div className="flex flex-wrap gap-2">
              {feesRanges.map((range) => (
                <button
                  key={range.value}
                  onClick={() => {
                    setFeesRange(range.value);
                    setVisibleCount(ITEMS_PER_PAGE);
                  }}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
                    feesRange === range.value
                      ? "bg-blue-600 text-white shadow-sm shadow-blue-200"
                      : "bg-gray-50 text-gray-600 border border-gray-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200"
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          {/* Active Filters Summary */}
          {(location !== "all" || feesRange !== "all") && (
            <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-100">
              <span className="text-xs text-gray-400">Active:</span>
              {location !== "all" && (
                <button
                  onClick={() => {
                    setLocation("all");
                    setVisibleCount(ITEMS_PER_PAGE);
                  }}
                  className="flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-medium hover:bg-blue-100 transition-colors"
                >
                  {locations.find((l) => l.value === location)?.label}
                  <X className="h-3 w-3" />
                </button>
              )}
              {feesRange !== "all" && (
                <button
                  onClick={() => {
                    setFeesRange("all");
                    setVisibleCount(ITEMS_PER_PAGE);
                  }}
                  className="flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-medium hover:bg-blue-100 transition-colors"
                >
                  {feesRanges.find((f) => f.value === feesRange)?.label}
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Results */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold text-gray-900">{visible.length}</span> of{" "}
            <span className="font-semibold text-gray-900">{filtered.length}</span> colleges
          </p>
        </div>

        {fetchError && !loading ? (
          <div className="text-center py-16">
            <h3 className="text-lg font-semibold text-red-600 mb-1">Unable to load colleges</h3>
            <p className="text-sm text-gray-500 max-w-md mx-auto">{fetchError}</p>
          </div>
        ) : filtered.length === 0 && !loading ? (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-3">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-1">No colleges found</h3>
            <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => <CollegeCardSkeleton key={i} />)
              : visible.map((college) => (
                  <CollegeCard
                    key={college.id}
                    college={college}
                    onCompare={handleCompare}
                    isComparing={compareList.some((c) => c.id === college.id)}
                    isSaved={savedIds.includes(Number(college.id))}
                  />
                ))}
          </div>
        )}

        {hasMore && !loading && (
          <div className="text-center mt-8">
            <button
              onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
              className="px-8 py-3 text-sm font-medium text-blue-600 bg-white border border-blue-200 hover:bg-blue-50 rounded-xl transition-all duration-200 shadow-sm hover:shadow"
            >
              Load More Colleges
            </button>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-gray-900">
                College<span className="text-blue-600">Hub</span>
              </span>
            </div>
            <p className="text-sm text-gray-500">
              Helping students find their dream college since 2025
            </p>
          </div>
        </div>
      </footer>

      <CompareBar
        colleges={compareList}
        onRemove={handleRemoveCompare}
        onClear={handleClearCompare}
      />
    </main>
  );
}
