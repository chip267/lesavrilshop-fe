// components/filters/FilterSection.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus, Minus } from "lucide-react";

interface FilterSectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export const FilterSection = ({
  title,
  isOpen,
  onToggle,
  children,
}: FilterSectionProps) => (
  <div className="border-b border-gray-200 py-4">
    <div
      className="flex justify-between items-center cursor-pointer"
      onClick={onToggle}
    >
      <h3 className="text-lg font-normal">{title}</h3>
      {isOpen ? <Minus size={20} /> : <Plus size={20} />}
    </div>
    {isOpen && <div className="mt-4">{children}</div>}
  </div>
);

// Color option component
interface ColorOptionProps {
  color: string;
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export const ColorOption = ({
  color,
  label,
  isSelected,
  onClick,
}: ColorOptionProps) => (
  <div
    className="flex items-center gap-3 cursor-pointer py-2"
    onClick={onClick}
  >
    <div
      className={cn(
        "w-6 h-6 rounded flex items-center justify-center",
        isSelected ? "border-2 border-black" : ""
      )}
    >
      <div
        className="w-5 h-5"
        style={{
          backgroundColor:
            color === "White"
              ? "#FFFFFF"
              : color === "Black"
              ? "#000000"
              : color === "Brown"
              ? "#795548"
              : color === "Blue"
              ? "#1976D2"
              : color === "Grey"
              ? "#9E9E9E"
              : color === "Beige"
              ? "#F5E6D3"
              : color === "Green"
              ? "#388E3C"
              : color,
        }}
      />
    </div>
    <span className="text-sm">{label}</span>
  </div>
);

interface SizeOptionProps {
  size: string;
  isSelected: boolean;
  onClick: () => void;
}

export const SizeOption = ({ size, isSelected, onClick }: SizeOptionProps) => (
  <button
    onClick={onClick}
    className={cn(
      "px-6 py-2 rounded border text-sm min-w-[60px]",
      isSelected ? "border-black" : "border-gray-300"
    )}
  >
    {size}
  </button>
);

// Sort option component
interface SortOptionProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export const SortOption = ({ label, isSelected, onClick }: SortOptionProps) => (
  <button
    onClick={onClick}
    className={cn(
      "w-full py-2 px-4 rounded-full border text-sm",
      isSelected ? "border-black bg-black text-white" : "border-gray-300"
    )}
  >
    {label}
  </button>
);

// Price option component
interface PriceOptionProps {
  price: number;
  isSelected: boolean;
  onClick: () => void;
}

export const PriceOption = ({
  price,
  isSelected,
  onClick,
}: PriceOptionProps) => (
  <button
    onClick={onClick}
    className={cn(
      "w-full py-2 px-4 rounded-full border text-sm mb-2",
      isSelected ? "border-black" : "border-gray-300"
    )}
  >
    Up to{" "}
    {new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)}
  </button>
);
