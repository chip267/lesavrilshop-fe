import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

interface RegisterSheetProps {
  triggerRef: React.RefObject<HTMLButtonElement>;
}

const RegisterSheet: React.FC<RegisterSheetProps> = ({ triggerRef }) => {
  const AddBagBtn = ({ content }: { content: string }) => (
    <Button className="w-full bg-black text-white rounded-none hover:bg-black/90">
      {content}
    </Button>
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button ref={triggerRef} className="hidden" type="button">
          Register
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader />
        <div className="p-2 mt-6 flex flex-col justify-center items-center">
          <p className="mt-2 mb-6 font-medium text-[20px]">Create account</p>
          <Input
            className="shadow-none !bg-white placeholder:text-gray-400 placeholder:font-light placeholder:text-[12px] placeholder:tracking-wide h-10 border border-[#c5c5c5] rounded-[4px]"
            placeholder="Email address"
          />
          <Input
            className="mt-[30px] shadow-none placeholder:text-gray-400 placeholder:font-light placeholder:text-[12px] placeholder:tracking-wide h-10 border border-[#c5c5c5] rounded-[4px]"
            type="password"
            placeholder="Password"
          />
          <p className="text-[12px] text-gray-500 mt-2 self-start">
            Minimum 8 characters, including lowercase, uppercase and a number.
            Don't repeat the same character more than 3 times
          </p>

          <div className="w-full space-y-4 mb-6 mt-6">
            <div className="flex items-center space-x-2">
              <Checkbox id="session" className="mt-1" />
              <label htmlFor="session" className="text-[14px] leading-none">
                Continue session
              </label>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox id="news" />
              <label htmlFor="news" className="text-[14px] leading-none">
                I want to receive news and customised commercial communications
                from BERSHKA via email and other means
              </label>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox id="terms" className="mt-1" />
              <label htmlFor="terms" className="text-[14px] leading-none">
                I have read and accept the{" "}
                <span className="font-bold">Terms and Conditions of Use</span>{" "}
                and I understand the information on the use of my personal data
                explained in the{" "}
                <span className="font-bold">Privacy Policy</span>
              </label>
            </div>
          </div>

          <AddBagBtn content="CREATE ACCOUNT" />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default RegisterSheet;
