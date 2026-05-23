"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MapPin, Star, Bookmark, BookmarkCheck, TrendingUp } from "lucide-react";
import { College } from "@/lib/types";
import { formatFees } from "@/lib/data";




interface CollegeCardProps {
  college: College;
  onCompare: (college: College) => void;
  isComparing: boolean;
  isSaved?: boolean;
  onSaveToggle?: (id: string) => void;
}

export default function CollegeCard({
  college,
  onCompare,
  isComparing,
  isSaved,
  onSaveToggle,
}: CollegeCardProps) {
  const [localSaved, setLocalSaved] = useState(false);
  const router = useRouter();

  const isSavedState = isSaved !== undefined ? isSaved : localSaved;

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    if (onSaveToggle) {
      onSaveToggle(String(college.id));
    } else {
      try {
        const { toggleSaveCollege } = await import("@/lib/api");
        const res = await toggleSaveCollege(college.id);
        if (res.success) {
          setLocalSaved(!!res.saved);
        }
      } catch (err) {
        console.error("Save error:", err);
      }
    }
  };

  return (
    <div className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden hover:-translate-y-1">
      <div className="relative h-44 overflow-hidden">
        <img
          src={college.image}
          alt={college.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <button
          onClick={handleSave}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white shadow-sm transition-all duration-200 hover:scale-110"
          aria-label={isSavedState ? "Unsave college" : "Save college"}
        >
          {isSavedState ? (
            <BookmarkCheck className="h-4.5 w-4.5 text-blue-600" />
          ) : (
            <Bookmark className="h-4.5 w-4.5 text-gray-500" />
          )}
        </button>
        <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-medium bg-white/90 rounded-full text-gray-700">
          {college.type}
        </span>
      </div>


      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2 mb-2 group-hover:text-blue-700 transition-colors">
          {college.name}
        </h3>

        <div className="flex items-center text-xs text-gray-500 mb-3">
          <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
          <span>{college.location}</span>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <p className="text-[10px] text-gray-500 mb-0.5">Fees</p>
            <p className="text-xs font-semibold text-gray-800">{formatFees(college.fees)}</p>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <p className="text-[10px] text-gray-500 mb-0.5">Rating</p>
            <div className="flex items-center justify-center gap-0.5">
              <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
              <span className="text-xs font-semibold text-gray-800">{college.rating}</span>
            </div>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <p className="text-[10px] text-gray-500 mb-0.5">Placement</p>
            <div className="flex items-center justify-center gap-0.5">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-xs font-semibold text-gray-800">{college.placementPercentage}%</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Link
            href={`/college/${college.id}`}
            className="flex-1 text-center px-3 py-2 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200"
          >
            View Details
          </Link>
          <button
            onClick={() => onCompare(college)}
            className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors duration-200 ${
              isComparing
                ? "text-blue-600 bg-blue-50 border border-blue-200"
                : "text-gray-600 bg-gray-50 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {isComparing ? "Added" : "Compare"}
          </button>
        </div>
      </div>
    </div>
  );
}
