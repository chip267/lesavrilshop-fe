// components/products/ProductGrid.tsx
"use client";
import React from "react";
import ProductCard from "./ProductCard";
import { type Product } from "@/store/useProductStore";

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
}

const ProductGrid = ({ products, isLoading }: ProductGridProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <p>Loading products...</p>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="flex justify-center items-center h-96">
        <p>No products found</p>
      </div>
    );
  }

  return (
    <div className="px-[8px] mt-8 grid grid-cols-4 gap-x-[6px] gap-y-10">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
