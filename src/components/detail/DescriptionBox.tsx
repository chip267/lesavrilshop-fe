import React from "react";
import ArrowRightIcon from "@/components/ui/icons/ArrowRightIcon";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface DescriptionBoxProps {
  description: string;
}

const DescriptionBox = ({ description }: DescriptionBoxProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="cursor-pointer flex border-b py-5 border-[#e0e0e0] justify-between items-center">
          <p className="underline text-[12px] font-light">Description</p>
          <ArrowRightIcon />
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="font-light text-[14px] flex justify-center tracking-wide p-3 border-b border-[#e2e2e2]">
            Description
          </SheetTitle>
        </SheetHeader>
        <div className="p-6">
          <div className="text-[12px] font-light tracking-wide">
            {description}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default DescriptionBox;
