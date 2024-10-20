import { Button } from "@/components/ui/button";
import HeartFillIcon from "@/components/ui/icons/HeartFillIcon";
import HeartIcon from "@/components/ui/icons/HeartIcon";
import React from "react";

const GridFavouriteComponent = () => {
  return (
    <div className="px-[3px] mt-8 grid grid-cols-4 gap-5">
      <div className="h-[500px] px-10 shadow-[0px_0px_12px_4px_rgba(233,233,233,0.4)] w-full bg-white flex-col justify-center items-center flex">
        <span className="h-[45px] text-[30px] w-[30px]">✨</span>
        <p className="mt-2 text-[14px] text-center font-medium ">
          Your favourites will be saved for a limited time
        </p>
        <p className="mt-[8px] text-[11px] text-center font-light text-[#ababab] ">
          Create an account or log in if you already have one and we'll save
          your favourites so you can view them from different devices.
        </p>
        <p className="mt-5 cursor-pointer text-[12px] text-center font-medium ">
          Log in or create account
        </p>
      </div>
      <div>
        <div className="hover:cursor-pointer relative group h-[500px] w-full">
          <img
            src="/assets/images/07002376712-p.jpg"
            alt="clothes"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 w-full p-3 gap-[10px] bg-white justify-center opacity-0 group-hover:opacity-100 items-center  flex flex-col transition-opacity duration-300">
            <p className="text-[12px] mt-2 font-light tracking-wide">
              Select size
            </p>
            <div className="flex items-center gap-3">
              <p className="text-[12px] mt-2 font-light tracking-wide">32</p>
              <p className="text-[12px] mt-2 font-light tracking-wide">34</p>
              <p className="text-[12px] mt-2 font-light tracking-wide">36</p>
              <p className="text-[12px] mt-2 font-light tracking-wide">38</p>
              <p className="text-[12px] mt-2 font-light tracking-wide">40</p>
            </div>
            <Button className="h-[36px] bg-transparent border border-black text-black mt-4 shadow-none cracking-wide w-full text-[12px]">
              MOVE TO BASKET
            </Button>
          </div>
        </div>
        <div className="px-2 flex justify-between items-center">
          <div>
            <p className="text-[12px] mt-2 font-light tracking-wide">
              Wide-leg jeans
            </p>
            <p className="text-[12px] mt-[2px] font-extrabold ">35.99 €</p>
          </div>
          <HeartFillIcon height="18" width="18" />
        </div>
      </div>
    </div>
  );
};

export default GridFavouriteComponent;
