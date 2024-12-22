// components/search/SearchInput.tsx
"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (searchTerm.trim()) {
        // Encode the search term for URL
        const encodedSearch = encodeURIComponent(searchTerm.trim());
        router.push(`/search?q=${encodedSearch}`);
      }
    },
    [searchTerm, router]
  );

  return (
    <form onSubmit={handleSearch} className="relative">
      <Input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-[160px] px-3 pl-9 placeholder:text-black placeholder:text-[12px] font-light h-[32px] border-none bg-[#f5f5f5] shadow-none rounded-full"
        placeholder="SEARCH"
      />
      <button
        type="submit"
        className="absolute left-3 top-1/2 -translate-y-1/2"
      >
        <Search size={16} className="text-gray-500" />
      </button>
    </form>
  );
};

export default SearchInput;
