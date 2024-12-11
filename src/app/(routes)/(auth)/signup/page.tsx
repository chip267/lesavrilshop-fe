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
import { RegisterForm } from "@/components/auth/RegisterForm";

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
        <div className="p-2 mt-6">
          <RegisterForm />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default RegisterSheet;
