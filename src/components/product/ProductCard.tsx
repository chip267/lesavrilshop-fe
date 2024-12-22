// components/products/ProductCard.tsx
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import HeartIcon from "@/components/ui/icons/HeartIcon";
import { type Product } from "@/store/useProductStore";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter();
  const mainImage = product.images.find((img) => img.isMain)?.imageUrl;

  const handleClick = () => {
    router.push(`/products/${product.id}`);
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
      <div className="relative group h-[500px] w-full">
        <img
          src={mainImage}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 w-full p-3 gap-[10px] bg-white justify-center opacity-0 group-hover:opacity-100 items-center flex flex-col transition-opacity duration-300">
          <p className="text-[12px] mt-2 font-light tracking-wide">
            Select size
          </p>
          <div className="flex items-center gap-3">
            {product.sizes?.map((size) => (
              <p
                key={size}
                className="text-[12px] mt-2 font-light tracking-wide"
              >
                {size}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="px-2 flex justify-between items-center">
        <div>
          <p className="text-[12px] mt-2 font-light tracking-wide">
            {product.name}
          </p>
          <p className="text-[12px] mt-[2px] font-extrabold">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(product.salePrice)}
          </p>
        </div>
        <div onClick={(e) => e.stopPropagation()}>
          <HeartIcon />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
