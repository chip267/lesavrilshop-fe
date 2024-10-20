import { Button } from "@/components/ui/button";
import FilterIcon from "@/components/ui/icons/FilterIcon";
import GridItemComponent from "@/components/women/GridItemComponent";
import HeaderWomen from "@/components/women/HeaderWomen";
import TabBarComponent from "@/components/women/TabBarComponent";
import { products } from "@/components/women/data";
import React from "react";

const WomenPage = () => {
  return (
    <div className="pt-2">
      <HeaderWomen />
      <TabBarComponent />
      <GridItemComponent products={products} />
    </div>
  );
};

export default WomenPage;
