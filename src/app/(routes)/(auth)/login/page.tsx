"use client";
import SignUpPage from "@/app/(routes)/(auth)/signup/page";
import { LoginForm } from "@/components/auth/LoginForm";
import { UserMenu } from "@/components/auth/UserMenu";
import AddBagBtn from "@/components/detail/AddBagBtn";
import IllustrationLogin from "@/components/login/IllustrationLogin";
import { Button } from "@/components/ui/button";
import UserIcon from "@/components/ui/icons/UserIcon";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";

const LoginPage = () => {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();

  const registerTriggerRef = useRef<HTMLButtonElement>(null);
  const closeLoginRef = useRef<HTMLButtonElement>(null);

  if (isAuthenticated) {
    return (
      <Button
        variant="ghost"
        className="text-[12px] p-0 bg-transparent shadow-none hover:bg-transparent text-black tracking-wide flex items-center gap-1"
        onClick={() => router.push("/profile")}
      >
        <UserIcon />
        <span className="ml-1">{user?.username}</span>
      </Button>
    );
  }

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="text-[12px] p-0 bg-transparent shadow-none hover:bg-transparent text-black tracking-wide">
            <UserIcon /> LOG IN
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetTitle className="sr-only">Login</SheetTitle>
          <SheetHeader />
          <div className="p-2 mt-6 ">
            <div className="flex flex-col justify-center items-center">
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
            </div>
            <LoginForm onSuccess={() => closeLoginRef.current?.click()} />
            <div className="w-full">
              <p className="mt-6 mb-6 font-medium text-[12px]">
                Forget your password?
              </p>
            </div>
            <div className="flex items-center mt-4 gap-2">
              <p className="text-[12px]">Don't have an account</p>
              <SheetClose ref={closeLoginRef} className="hidden" />
              <p
                className="font-bold cursor-pointer text-[12px]"
                onClick={() => registerTriggerRef.current?.click()}
              >
                Register
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <SignUpPage triggerRef={registerTriggerRef} />
    </>
  );
};

export default LoginPage;
