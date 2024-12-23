import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FilterIcon from "@/components/ui/icons/FilterIcon";
const HeaderWomen = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="flex px-6 justify-between">
          <span className="text-[24px] tracking-wide ">Women</span>
          <Button className="border px-3 py-4 h-[36px] border-black rounded-full shadow-none text-black tracking-wide font-bold text-[12px] bg-transparent py-[10px] active:bg-black focus:text-white focus:font-bold ">
            <FilterIcon /> Filters
          </Button>
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="font-light text-[14px] flex justify-center tracking-wide p-3 border-b border-[#e2e2e2]">
            Filter
          </SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4"></div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default HeaderWomen;
