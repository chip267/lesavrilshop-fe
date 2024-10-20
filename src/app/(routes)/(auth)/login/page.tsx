import AddBagBtn from "@/components/detail/AddBagBtn";
import IllustrationLogin from "@/components/login/IllustrationLogin";
import { Button } from "@/components/ui/button";
import UserIcon from "@/components/ui/icons/UserIcon";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import React from "react";

const LoginPage = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="text-[12px] p-0 bg-transparent shadow-none hover:bg-transparent  text-black tracking-wide">
          <UserIcon /> LOG IN
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader></SheetHeader>
        <div className="p-2 mt-6 flex flex-col justify-center items-center">
          <div className="w-[150px] h-[150px]">
            <img
              src="/assets/images/img_login.png"
              alt="clothes"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="mt-6 mb-6 font-medium text-[20px]">
            Log in or create an account
          </p>
          <Input
            className="shadow-none placeholder:text-gray-400 placeholder:font-light placeholder:text-[12px] placeholder:tracking-wide h-10 border border-[#c5c5c5] rounded-[4px]"
            placeholder="Email address"
          />
          <Input
            className=" mt-[30px] shadow-none placeholder:text-gray-400 placeholder:font-light placeholder:text-[12px] placeholder:tracking-wide h-10 border border-[#c5c5c5] rounded-[4px]"
            placeholder="Password"
          />
          <div className="w-full">
            <p className="mt-6 mb-6 font-medium text-[12px]">
              Forget your password?
            </p>
          </div>
          <AddBagBtn content="LOGIN" />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default LoginPage;
