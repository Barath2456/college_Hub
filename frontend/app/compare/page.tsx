"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Star,
  TrendingUp,
  MapPin,
  IndianRupee,
  BookOpen,
  X,
  ChevronDown,
  Trophy,
} from "lucide-react";
import { formatFees, formatSalary } from "@/lib/data";
import { College } from "@/lib/types";
import { compareColleges, fetchColleges } from "@/lib/api";
import { useEffect } from "react";

export default function ComparePage() {
  const [selectedColleges, setSelectedColleges] = useState<College[]>([]);
  const [allColleges, setAllColleges] = useState<College[]>([]);
  const [selectOpen, setSelectOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  // 1. Fetch details of colleges to compare on mount/load from localStorage
  useEffect(() => {
    const loadCompareColleges = async () => {
      const storedIdsStr = localStorage.getItem("compareIds");
      if (storedIdsStr) {
        try {
          const ids: number[] = JSON.parse(storedIdsStr);
          if (ids.length > 0) {
            setLoading(true);
            const res = await compareColleges(ids);
            if (res.success && res.colleges) {
              setSelectedColleges(res.colleges);
            }
          }
        } catch (err) {
          console.error("Error loading comparison colleges:", err);
        } finally {
          setLoading(false);
        }
      }
    };
    loadCompareColleges();
  }, []);

  // 2. Fetch all colleges to populate the 'Add College' dropdown list
  useEffect(() => {
    const loadAllColleges = async () => {
      try {
        const res = await fetchColleges();
        if (res.success && res.colleges) {
          setAllColleges(res.colleges);
        }
      } catch (err) {
        console.error("Error loading dropdown colleges:", err);
      }
    };
    loadAllColleges();
  }, []);

  const availableColleges = allColleges.filter(
    (c) => !selectedColleges.find((s) => Number(s.id) === Number(c.id))
  );

  const filteredAvailable = availableColleges.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const syncCompareList = async (nextList: College[]) => {
    setSelectedColleges(nextList);
    const ids = nextList.map((c) => Number(c.id));
    if (ids.length === 0) {
      localStorage.removeItem("compareIds");
      return;
    }
    localStorage.setItem("compareIds", JSON.stringify(ids));
    if (ids.length >= 2) {
      setLoading(true);
      try {
        const res = await compareColleges(ids);
        if (res.success && res.colleges) {
          setSelectedColleges(res.colleges);
        }
      } catch (err) {
        console.error("Error syncing comparison:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  const addCollege = (college: College) => {
    if (selectedColleges.length < 3) {
      const nextList = [...selectedColleges, college];
      syncCompareList(nextList);
      setSearchQuery("");
      setSelectOpen(false);
    }
  };

  const removeCollege = (id: string | number) => {
    const nextList = selectedColleges.filter((c) => String(c.id) !== String(id));
    syncCompareList(nextList);
  };

  const getBestValue = (field: "fees" | "rating" | "placementPercentage"): string | null => {
    if (selectedColleges.length < 2) return null;
    if (field === "fees") {
      const min = Math.min(...selectedColleges.map((c) => c.fees));
      const best = selectedColleges.find((c) => c.fees === min);
      return best ? String(best.id) : null;
    }
    if (field === "rating") {
      const max = Math.max(...selectedColleges.map((c) => c.rating));
      const best = selectedColleges.find((c) => c.rating === max);
      return best ? String(best.id) : null;
    }
    const max = Math.max(...selectedColleges.map((c) => c.placementPercentage));
    const best = selectedColleges.find((c) => c.placementPercentage === max);
    return best ? String(best.id) : null;
  };

  return (
    <main className="min-h-screen bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Link
            href="/"
            className="flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <div className="h-5 w-px bg-gray-200" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Compare Colleges</h1>
        </div>

        {/* College Selection */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-8">
          <h2 className="font-semibold text-gray-900 mb-4">Select Colleges to Compare</h2>
          <div className="flex flex-wrap gap-3 mb-4">
            {selectedColleges.map((college) => (
              <div
                key={college.id}
                className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium"
              >
                <span className="max-w-[200px] truncate">{college.name.split(",")[0]}</span>
                <button
                  onClick={() => removeCollege(college.id)}
                  className="hover:bg-blue-100 rounded-full p-0.5 transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
            {selectedColleges.length < 3 && (
              <div className="relative">
                <button
                  onClick={() => setSelectOpen(!selectOpen)}
                  className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-gray-200 text-gray-400 rounded-lg text-sm hover:border-blue-300 hover:text-blue-400 transition-colors"
                >
                  + Add College
                </button>
                {selectOpen && (
                  <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl border border-gray-200 shadow-xl z-20 overflow-hidden">
                    <div className="p-3 border-b border-gray-100">
                      <input
                        type="text"
                        placeholder="Search colleges..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                      />
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                      {filteredAvailable.length === 0 ? (
                        <p className="p-4 text-sm text-gray-400 text-center">No colleges found</p>
                      ) : (
                        filteredAvailable.map((college) => (
                          <button
                            key={college.id}
                            onClick={() => addCollege(college)}
                            className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
                          >
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {college.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {college.location} | {formatFees(college.fees)}
                              </p>
                            </div>
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          {selectedColleges.length > 0 && (
            <p className="text-xs text-gray-400">
              {selectedColleges.length}/3 colleges selected
            </p>
          )}
        </div>

        {/* Comparison Table */}
        {selectedColleges.length >= 2 ? (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-500 bg-gray-50/50 w-44 min-w-[11rem]">
                      Feature
                    </th>
                    {selectedColleges.map((college) => (
                      <th
                        key={college.id}
                        className="text-left py-4 px-6 text-sm font-semibold text-gray-900 min-w-[200px]"
                      >
                        <Link
                          href={`/college/${college.id}`}
                          className="hover:text-blue-600 transition-colors"
                        >
                          {college.name}
                        </Link>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Fees */}
                  <tr className="border-b border-gray-50">
                    <td className="py-4 px-6 text-sm text-gray-600 bg-gray-50/30">
                      <div className="flex items-center gap-2">
                        <IndianRupee className="h-4 w-4 text-gray-400" />
                        Annual Fees
                      </div>
                    </td>
                    {selectedColleges.map((college) => {
                      const isBest = getBestValue("fees") === String(college.id);
                      return (
                        <td key={college.id} className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-sm font-semibold ${
                                isBest ? "text-green-600" : "text-gray-900"
                              }`}
                            >
                              {formatFees(college.fees)}
                            </span>
                            {isBest && (
                              <span className="flex items-center gap-1 px-2 py-0.5 bg-green-50 text-green-600 rounded-full text-xs font-medium">
                                <Trophy className="h-3 w-3" />
                                Best
                              </span>
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                  {/* Rating */}
                  <tr className="border-b border-gray-50">
                    <td className="py-4 px-6 text-sm text-gray-600 bg-gray-50/30">
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-gray-400" />
                        Rating
                      </div>
                    </td>
                    {selectedColleges.map((college) => {
                      const isBest = getBestValue("rating") === String(college.id);
                      return (
                        <td key={college.id} className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                              <span
                                className={`text-sm font-semibold ${
                                  isBest ? "text-green-600" : "text-gray-900"
                                }`}
                              >
                                {college.rating}/5
                              </span>
                            </div>
                            {isBest && (
                              <span className="flex items-center gap-1 px-2 py-0.5 bg-green-50 text-green-600 rounded-full text-xs font-medium">
                                <Trophy className="h-3 w-3" />
                                Best
                              </span>
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                  {/* Placement */}
                  <tr className="border-b border-gray-50">
                    <td className="py-4 px-6 text-sm text-gray-600 bg-gray-50/30">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-gray-400" />
                        Placement Rate
                      </div>
                    </td>
                    {selectedColleges.map((college) => {
                      const isBest = getBestValue("placementPercentage") === String(college.id);
                      return (
                        <td key={college.id} className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-sm font-semibold ${
                                isBest ? "text-green-600" : "text-gray-900"
                              }`}
                            >
                              {college.placementPercentage}%
                            </span>
                            {isBest && (
                              <span className="flex items-center gap-1 px-2 py-0.5 bg-green-50 text-green-600 rounded-full text-xs font-medium">
                                <Trophy className="h-3 w-3" />
                                Best
                              </span>
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                  {/* Location */}
                  <tr className="border-b border-gray-50">
                    <td className="py-4 px-6 text-sm text-gray-600 bg-gray-50/30">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        Location
                      </div>
                    </td>
                    {selectedColleges.map((college) => (
                      <td key={college.id} className="py-4 px-6 text-sm text-gray-900">
                        {college.location}, {college.state}
                      </td>
                    ))}
                  </tr>
                  {/* Type */}
                  <tr className="border-b border-gray-50">
                    <td className="py-4 px-6 text-sm text-gray-600 bg-gray-50/30">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-gray-400" />
                        Type
                      </div>
                    </td>
                    {selectedColleges.map((college) => (
                      <td key={college.id} className="py-4 px-6">
                        <span className="px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                          {college.type}
                        </span>
                      </td>
                    ))}
                  </tr>
                  {/* Established */}
                  <tr className="border-b border-gray-50">
                    <td className="py-4 px-6 text-sm text-gray-600 bg-gray-50/30">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-gray-400" />
                        Established
                      </div>
                    </td>
                    {selectedColleges.map((college) => (
                      <td key={college.id} className="py-4 px-6 text-sm text-gray-900">
                        {college.established}
                      </td>
                    ))}
                  </tr>
                  {/* Avg Package */}
                  <tr className="border-b border-gray-50">
                    <td className="py-4 px-6 text-sm text-gray-600 bg-gray-50/30">
                      <div className="flex items-center gap-2">
                        <IndianRupee className="h-4 w-4 text-gray-400" />
                        Avg Package
                      </div>
                    </td>
                    {selectedColleges.map((college) => {
                      const avg = college.placements.averagePackage;
                      const maxAvg = Math.max(...selectedColleges.map((c) => c.placements.averagePackage));
                      const isBest = avg === maxAvg;
                      return (
                        <td key={college.id} className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-sm font-semibold ${
                                isBest ? "text-green-600" : "text-gray-900"
                              }`}
                            >
                              {formatSalary(avg)}
                            </span>
                            {isBest && (
                              <span className="flex items-center gap-1 px-2 py-0.5 bg-green-50 text-green-600 rounded-full text-xs font-medium">
                                <Trophy className="h-3 w-3" />
                                Best
                              </span>
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                  {/* Highest Package */}
                  <tr className="border-b border-gray-50">
                    <td className="py-4 px-6 text-sm text-gray-600 bg-gray-50/30">
                      <div className="flex items-center gap-2">
                        <IndianRupee className="h-4 w-4 text-gray-400" />
                        Highest Package
                      </div>
                    </td>
                    {selectedColleges.map((college) => (
                      <td key={college.id} className="py-4 px-6 text-sm font-semibold text-gray-900">
                        {formatSalary(college.placements.highestPackage)}
                      </td>
                    ))}
                  </tr>
                  {/* Courses */}
                  <tr>
                    <td className="py-4 px-6 text-sm text-gray-600 bg-gray-50/30">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-gray-400" />
                        Courses
                      </div>
                    </td>
                    {selectedColleges.map((college) => (
                      <td key={college.id} className="py-4 px-6">
                        <div className="space-y-1.5">
                          {college.courses.map((course) => (
                            <div key={course.name} className="text-xs text-gray-600">
                              {course.name}
                            </div>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-16 text-center">
            <div className="text-gray-300 mb-4">
              <Trophy className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Select at least 2 colleges to compare
            </h3>
            <p className="text-sm text-gray-500 max-w-md mx-auto">
              Use the search above to add colleges and see a detailed side-by-side comparison of fees, ratings, placements, and more.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
