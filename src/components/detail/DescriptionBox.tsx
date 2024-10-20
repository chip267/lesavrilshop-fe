import ArrowRightIcon from "@/components/ui/icons/ArrowRightIcon";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import React from "react";

const DescriptionBox = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="cursor-pointer flex border-b py-5 border-[#e0e0e0] justify-between items-center">
          <p className="underline text-[12px] font-light">
            Material, care and source
          </p>
          <ArrowRightIcon />
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className=" font-light text-[14px] flex justify-center tracking-wide p-3 border-b border-[#e2e2e2]">
            Materials, care and source
          </SheetTitle>
        </SheetHeader>
        <div className="p-6">
          <div className="grid grid-cols-4 items-center gap-4"></div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default DescriptionBox;
