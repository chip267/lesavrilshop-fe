"use client";
import { Button } from "@/components/ui/button";
import HeartFillIcon from "@/components/ui/icons/HeartFillIcon";
import HeartIcon from "@/components/ui/icons/HeartIcon";
import React from "react";
import { useState } from "react";

const FavoriteButton = () => {
  const [isHeart, setIsHeart] = useState(true);

  return (
    <Button
      onClick={() => setIsHeart(!isHeart)}
      className=" transition-colors duration-300 justify-center items-center ml-3/5 mt-[20px] shadow-md hover:bg-white rounded-full h-10 w-10 absolute bg-white "
      size="icon"
    >
      {isHeart ? (
        <HeartIcon height="18" width="18" />
      ) : (
        <HeartFillIcon height="18" width="18" />
      )}
    </Button>
  );
};

export default FavoriteButton;
