import AddBagBtn from "@/components/detail/AddBagBtn";
import CarouselLookComponent from "@/components/detail/CarouselLookComponent";
import DeliveryBox from "@/components/detail/DeliveryBox";
import DescriptionBox from "@/components/detail/DescriptionBox";
import FavoriteButton from "@/components/detail/FavoriteButton";
import GridItemsRecommend from "@/components/detail/GridItemsRecommend";
import SizeComponent from "@/components/detail/SizeComponent";
import CarouselComponent from "@/components/home/CarouselComponent";
import { Button } from "@/components/ui/button";
import ArrowRightIcon from "@/components/ui/icons/ArrowRightIcon";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-6 w-full h-full">
        <div className="relative col-span-4 grid grid-cols-2 gap-1">
          <div className="h-[600px] w-full">
            <img
              src="/assets/images/05033335775-a3f.jpg"
              alt="clothes"
              className="w-full h-full object-cover"
            />
          </div>
          <div className=" h-[600px] w-full">
            <img
              src="/assets/images/05033335775-p.jpg"
              alt="clothes"
              className="w-full h-full object-cover"
            />
          </div>
          <div className=" h-[600px] w-full">
            <img
              src="/assets/images/05033335775-a1t.jpg"
              alt="clothes"
              className="w-full h-full object-cover"
            />
          </div>
          <div className=" h-[600px] w-full">
            <img
              src="/assets/images/05033335775-a5o.jpg"
              alt="clothes"
              className="w-full h-full object-cover"
            />
          </div>

          <FavoriteButton />
        </div>
        <div className="col-span-2 px-10 py-12 flex flex-col">
          <div className="border-b border-[#e0e0e0] pb-5">
            <p className="text-[18px] tracking-wide ">Balloon fit jeans</p>
            <p className="text-[16px] mt-2 font-semibold tracking-wide ">
              $100
            </p>
            <div className="flex gap-[10px]">
              <div
                className="p-[4px] transition cursor-pointer mt-3 h-[38px]  outline-none focus:border focus:border-black rounded-full border-black"
                tabIndex={0}
              >
                <div className="p-[1px] rounded-full border border-zinc-300">
                  <div className="h-6 w-6 rounded-full px-0 py-0 bg-slate-900"></div>
                </div>
              </div>
              <div
                className="p-[4px] cursor-pointer mt-3 h-[38px]  outline-none focus:border focus:border-black rounded-full border-black"
                tabIndex={0}
              >
                <div className="p-[1px] rounded-full border border-zinc-300">
                  <div className="h-6 w-6 rounded-full px-0 py-0 bg-orange-900"></div>
                </div>
              </div>
              <div
                className="p-[4px] cursor-pointer mt-3 h-[38px]  outline-none focus:border focus:border-black rounded-full border-black"
                tabIndex={0}
              >
                <div className="p-[1px] rounded-full border border-zinc-300">
                  <div className="h-6 w-6 rounded-full px-0 py-0 bg-lime-950"></div>
                </div>
              </div>
            </div>
            <p className="mt-[6px] font-extralight text-[12px] tracking-wide">
              Black · Ref. 5033/335/800
            </p>
          </div>
          <div className="pt-5">
            <div className="flex flex-wrap gap-3 items-center">
              <SizeComponent size="32" />
              <SizeComponent size="34" />
              <SizeComponent size="36" />
              <SizeComponent size="38" />
              <SizeComponent size="40" />
              <SizeComponent size="42" />
              <SizeComponent size="44" />
              <SizeComponent size="46" />
              <SizeComponent size="48" />
            </div>
            <p className="underline mt-3 hover:font-medium cursor-pointer text-[12px] font-light">
              Style guide
            </p>
            <AddBagBtn content="ADD TO BASKET" />
            <div className="mt-10 px-5 border border-[#e0e0e0] rounded-[4px]">
              <DescriptionBox />
              <DeliveryBox />
            </div>
          </div>
        </div>
      </div>
      <div className=" mt-20 flex flex-col justify-center items-center">
        <p className="font-light text-[25px] tracking-wide">
          You might be interested in
        </p>
        <GridItemsRecommend />
      </div>
    </div>
  );
};

export default page;
