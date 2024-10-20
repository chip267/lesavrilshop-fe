import GridFavouriteComponent from "@/components/favourite/GridFavouriteComponent";
import HeaderWomen from "@/components/women/HeaderWomen";
import React from "react";

const FavoritePage = () => {
  return (
    <div className="pt-2 px-6 flex flex-col">
      <span className="text-[24px] tracking-wide">Favourites</span>
      <GridFavouriteComponent />
    </div>
  );
};

export default FavoritePage;
