import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <h2 className="text-2xl font-semibold mb-4">Category Not Found</h2>
      <p className="text-gray-600 mb-6 text-center">
        Sorry, the category you're looking for doesn't exist or might have been
        moved.
      </p>
      <Link
        href="/"
        className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
}
