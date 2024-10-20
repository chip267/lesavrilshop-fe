import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ArrowRightIcon from "@/components/ui/icons/ArrowRightIcon";
const DeliveryBox = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="cursor-pointer flex py-5 justify-between items-center">
          <p className="underline text-[12px] font-light">
            Deliveries and returns
          </p>
          <ArrowRightIcon />
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="font-light text-[14px] flex justify-center tracking-wide p-3 border-b border-[#e2e2e2]">
            Deliveries and returns
          </SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4"></div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default DeliveryBox;
