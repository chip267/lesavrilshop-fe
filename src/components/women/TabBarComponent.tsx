import { Button } from "@/components/ui/button";
import React from "react";
interface CatalogProps {
  catalogName: string;
}
const catalogs = [
  { catalogName: "Jeans" },
  { catalogName: "Trousers" },
  { catalogName: "Jacket and Blazers" },
  { catalogName: "Coats" },
  { catalogName: "Dresses" },
  { catalogName: "Skirts and Shorts" },
  { catalogName: "Knitwear" },
  { catalogName: "Shoes" },
  { catalogName: "Sweatshirts and Hoodies" },
  { catalogName: "T-shirts" },
  { catalogName: "Tops and Bodysuits" },
];
const TabBarComponent = () => {
  return (
    <div className="flex px-6 py-[10px] gap-3 items-center">
      {catalogs.map((item, index) => (
        <Button
          key={index}
          variant="outline"
          className="border px-3 py-4 h-[34px] border-[#C5C5C5] rounded-[6px] shadow-none text-black font-light tracking-wide text-[12px] bg-transparent py-[10px]"
        >
          {item.catalogName}
        </Button>
      ))}
    </div>
  );
};

export default TabBarComponent;
