"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ApiService } from "@/services/api";
import { type Product } from "@/store/useProductStore";
import FavoriteButton from "@/components/detail/FavoriteButton";
import SizeComponent from "@/components/detail/SizeComponent";
import AddBagBtn from "@/components/detail/AddBagBtn";
import DescriptionBox from "@/components/detail/DescriptionBox";
import DeliveryBox from "@/components/detail/DeliveryBox";
import GridItemsRecommend from "@/components/detail/GridItemsRecommend";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/button";

const ProductDetailPage = () => {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const apiService = ApiService.getInstance();
        const response = await apiService.get<Product>(`/Product/${params.id}`);

        if (response.success && response.data) {
          setProduct(response.data);
          if (response.data.colors?.length > 0) {
            setSelectedColor(response.data.colors[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  const { addToCart } = useCartStore();

  const handleAddToCart = async (productId: number, quantity: number) => {
    await addToCart(productId, quantity);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Product not found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-6 w-full h-full">
        {/* Left side - Images */}
        <div className="relative col-span-4 grid grid-cols-2 gap-1">
          {product.images.map((image, index) => (
            <div key={image.id} className="h-[600px] w-full">
              <img
                src={image.imageUrl}
                alt={`${product.name} view ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          <FavoriteButton />
        </div>

        {/* Right side - Product Details */}
        <div className="col-span-2 px-10 py-12 flex flex-col">
          <div className="border-b border-[#e0e0e0] pb-5">
            <p className="text-[18px] tracking-wide">{product.name}</p>
            <p className="text-[16px] mt-2 font-semibold tracking-wide">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(product.salePrice)}
            </p>

            {/* Color options */}
            <div className="flex gap-[10px]">
              {product.colors.map((color) => (
                <div
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`p-[4px] transition cursor-pointer mt-3 h-[38px] outline-none rounded-full ${
                    selectedColor === color ? "border border-black" : ""
                  }`}
                  tabIndex={0}
                >
                  <div className="p-[1px] rounded-full border border-zinc-300">
                    <div
                      className="h-6 w-6 rounded-full"
                      style={{ backgroundColor: `#${color}` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-[6px] font-extralight text-[12px] tracking-wide">
              {selectedColor ? `#${selectedColor} · ` : ""} Ref. {product.id}
            </p>
          </div>

          <div className="pt-5">
            {/* Size options */}
            <div className="flex flex-wrap gap-3 items-center">
              {product.sizes.map((size) => (
                <SizeComponent key={size} size={size} />
              ))}
            </div>

            <p className="underline mt-3 hover:font-medium cursor-pointer text-[12px] font-light">
              Style guide
            </p>

            <Button
              className="h-[48px] cracking-wide mt-8 w-full text-[14px] font-light"
              onClick={async () => {
                await handleAddToCart(product.id, 1);
              }}
            >
              ADD TO BASKET
            </Button>

            {/* <AddBagBtn content="ADD TO BASKET" /> */}

            <div className="mt-10 px-5 border border-[#e0e0e0] rounded-[4px]">
              <DescriptionBox description={product.productDescription} />
              <DeliveryBox description={product.deliveryDescription} />
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="mt-20 flex flex-col justify-center items-center">
        <p className="font-light text-[25px] tracking-wide">
          You might be interested in
        </p>
        <GridItemsRecommend />
      </div>
    </div>
  );
};

export default ProductDetailPage;
