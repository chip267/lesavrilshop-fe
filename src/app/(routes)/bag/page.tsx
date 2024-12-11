import AddBagBtn from "@/components/detail/AddBagBtn";
import { Button } from "@/components/ui/button";
import BagIcon from "@/components/ui/icons/BagIcon";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HeartIcon } from "@radix-ui/react-icons";
import React, { useRef } from "react";

const BagPage = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="bg-transparent shadow-none hover:bg-transparent h-6  rounded-full justify-center items-center"
          size="icon"
        >
          <BagIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetTitle className="sr-only">My Cart</SheetTitle>
        <SheetHeader />
        <div className="items-center flex mt-6 mb-6 justify-between">
          <p className="font-medium text-[20px]">Basket</p>
          <a href="/favorite">
            <Button className="border px-3 py-4 h-[36px] border-black rounded-full shadow-none text-black tracking-wide font-bold text-[12px] bg-transparent py-[10px] active:bg-black focus:text-white focus:font-bold ">
              Favourite
            </Button>
          </a>
        </div>
        <div className="p-2 mt-6 flex flex-col justify-center items-center">
          <div className="w-[150px] h-[150px]">
            <img
              src="/assets/images/img_banner_empty.png"
              alt="clothes"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center justify-items">
            <p className="mt-6 mb-3 text-[16px]">Empty basket</p>
          </div>
          <div className="flex items-center justify-items">
            <p className=" mb-6 text-center align-center font-light text-[12px]">
              Your basket is still empty, discover everything we’ve got for you
            </p>
          </div>

          <AddBagBtn content="DISCOVER" />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BagPage;
