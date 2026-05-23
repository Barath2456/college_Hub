"use client";

import { X } from "lucide-react";
import { College } from "@/lib/types";
import Link from "next/link";

interface CompareBarProps {
  colleges: College[];
  onRemove: (id: string) => void;
  onClear: () => void;
}

export default function CompareBar({ colleges, onRemove, onClear }: CompareBarProps) {
  if (colleges.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto flex-1">
            <span className="text-sm font-medium text-gray-600 whitespace-nowrap">
              Comparing ({colleges.length}/3):
            </span>
            {colleges.map((college) => (
              <div
                key={college.id}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium whitespace-nowrap"
              >
                <span className="max-w-[150px] truncate">{college.name.split(",")[0]}</span>
                <button
                  onClick={() => onRemove(college.id)}
                  className="hover:bg-blue-100 rounded-full p-0.5 transition-colors"
                  aria-label={`Remove ${college.name}`}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={onClear}
              className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Clear
            </button>
            <Link
              href="/compare"
              className={`px-4 py-1.5 text-sm font-medium text-white rounded-lg transition-colors ${
                colleges.length >= 2
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
              onClick={(e) => colleges.length < 2 && e.preventDefault()}
            >
              Compare Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
