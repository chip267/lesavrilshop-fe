import React from "react";
import ArrowRightIcon from "@/components/ui/icons/ArrowRightIcon";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface DeliveryBoxProps {
  description: string;
}

const DeliveryBox = ({ description }: DeliveryBoxProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="cursor-pointer flex py-5 justify-between items-center">
          <p className="underline text-[12px] font-light">
            Delivery and returns
          </p>
          <ArrowRightIcon />
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="font-light text-[14px] flex justify-center tracking-wide p-3 border-b border-[#e2e2e2]">
            Delivery and returns
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

export default DeliveryBox;
