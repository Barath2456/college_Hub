"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  Star,
  TrendingUp,
  Calendar,
  Award,
  BookOpen,
  Users,
  ArrowLeft,
  IndianRupee,
  Building2,
  ChevronRight,
} from "lucide-react";
import { formatFees, formatSalary } from "@/lib/data";
import { College } from "@/lib/types";
import { fetchCollegeById } from "@/lib/api";

const tabs = ["Overview", "Courses", "Placements", "Reviews"];

export default function CollegeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Overview");
  const [college, setCollege] = useState<College | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCollege = async () => {
      if (!params.id) return;
      setLoading(true);
      try {
        const res = await fetchCollegeById(params.id as string);
        if (res.success && res.college) {
          setCollege(res.college);
        }
      } catch (err) {
        console.error("Error fetching college details:", err);
      } finally {
        setLoading(false);
      }
    };
    loadCollege();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50/50">
        <div className="text-center space-y-4">
          <div className="relative w-12 h-12 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-blue-100 animate-pulse" />
            <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
          </div>
          <p className="text-sm font-medium text-gray-500 animate-pulse">Loading college details...</p>
        </div>
      </div>
    );
  }

  if (!college) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">College Not Found</h2>
          <p className="text-gray-500 mb-4">The college you are looking for does not exist.</p>
          <Link
            href="/"
            className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50/50">
      {/* Banner */}
      <div className="relative h-56 sm:h-72 md:h-80">
        <img
          src={college.image}
          alt={college.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-1 text-white/80 hover:text-white text-sm mb-3 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
              {college.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {college.location}, {college.state}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Est. {college.established}
              </div>
              <div className="flex items-center gap-1">
                <Award className="h-4 w-4" />
                {college.accreditation}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Tabs */}
            <div className="flex items-center gap-1 bg-white rounded-xl p-1 shadow-sm border border-gray-100 mb-6 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${
                    activeTab === tab
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === "Overview" && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">About</h2>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {college.description}
                  </p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
                    <IndianRupee className="h-5 w-5 text-blue-600 mx-auto mb-2" />
                    <p className="text-lg font-bold text-gray-900">{formatFees(college.fees)}</p>
                    <p className="text-xs text-gray-500 mt-0.5">Annual Fees</p>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
                    <Star className="h-5 w-5 text-amber-400 mx-auto mb-2" />
                    <p className="text-lg font-bold text-gray-900">{college.rating}/5</p>
                    <p className="text-xs text-gray-500 mt-0.5">Rating</p>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
                    <TrendingUp className="h-5 w-5 text-green-500 mx-auto mb-2" />
                    <p className="text-lg font-bold text-gray-900">{college.placementPercentage}%</p>
                    <p className="text-xs text-gray-500 mt-0.5">Placement Rate</p>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
                    <Building2 className="h-5 w-5 text-purple-500 mx-auto mb-2" />
                    <p className="text-lg font-bold text-gray-900">{college.type}</p>
                    <p className="text-xs text-gray-500 mt-0.5">Institute Type</p>
                  </div>
                </div>

                {/* Key Information */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Key Information</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { label: "Type", value: college.type },
                      { label: "Established", value: String(college.established) },
                      { label: "Accreditation", value: college.accreditation },
                      { label: "Location", value: `${college.location}, ${college.state}` },
                      { label: "Annual Fees", value: formatFees(college.fees) },
                      { label: "Courses Offered", value: String(college.courses.length) },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between py-2 border-b border-gray-50">
                        <span className="text-sm text-gray-500">{item.label}</span>
                        <span className="text-sm font-medium text-gray-900">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "Courses" && (
              <div className="space-y-4">
                {college.courses.map((course) => (
                  <div
                    key={course.name}
                    className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <BookOpen className="h-4 w-4 text-blue-600" />
                          <h3 className="font-semibold text-gray-900 text-sm">{course.name}</h3>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {course.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-3.5 w-3.5" />
                            {course.seats} seats
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-900">{formatFees(course.fees)}</p>
                        <p className="text-xs text-gray-500">per year</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "Placements" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                    <p className="text-xs text-gray-500 mb-1">Average Package ({college.placements.year})</p>
                    <p className="text-2xl font-bold text-gray-900">{formatSalary(college.placements.averagePackage)}</p>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                    <p className="text-xs text-gray-500 mb-1">Highest Package ({college.placements.year})</p>
                    <p className="text-2xl font-bold text-green-600">{formatSalary(college.placements.highestPackage)}</p>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Top Recruiters</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                    {college.placements.topRecruiters.map((recruiter) => (
                      <div
                        key={recruiter}
                        className="flex items-center justify-center py-3 px-4 bg-gray-50 rounded-lg text-sm font-medium text-gray-700"
                      >
                        {recruiter}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Placement Summary</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Placement Rate</span>
                      <span className="text-sm font-semibold text-gray-900">{college.placementPercentage}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                        style={{ width: `${college.placementPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "Reviews" && (
              <div className="space-y-4">
                {college.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-white rounded-xl border border-gray-100 shadow-sm p-5"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{review.author}</p>
                        <p className="text-xs text-gray-400">{review.date}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3.5 w-3.5 ${
                              i < review.rating
                                ? "text-amber-400 fill-amber-400"
                                : "text-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="lg:sticky lg:top-24 space-y-4">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Quick Info</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 py-2 border-b border-gray-50">
                    <IndianRupee className="h-4 w-4 text-blue-600" />
                    <div>
                      <p className="text-xs text-gray-500">Fees</p>
                      <p className="text-sm font-medium text-gray-900">{formatFees(college.fees)}/yr</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 py-2 border-b border-gray-50">
                    <Star className="h-4 w-4 text-amber-400" />
                    <div>
                      <p className="text-xs text-gray-500">Rating</p>
                      <p className="text-sm font-medium text-gray-900">{college.rating}/5</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 py-2 border-b border-gray-50">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <div>
                      <p className="text-xs text-gray-500">Placement</p>
                      <p className="text-sm font-medium text-gray-900">{college.placementPercentage}%</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 py-2">
                    <MapPin className="h-4 w-4 text-red-400" />
                    <div>
                      <p className="text-xs text-gray-500">Location</p>
                      <p className="text-sm font-medium text-gray-900">{college.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Average Package</h3>
                <p className="text-xl font-bold text-blue-600">
                  {formatSalary(college.placements.averagePackage)}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Highest: {formatSalary(college.placements.highestPackage)}
                </p>
              </div>

              <Link
                href="/compare"
                className="block w-full text-center px-4 py-3 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors border border-blue-100"
              >
                Compare with Other Colleges
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
