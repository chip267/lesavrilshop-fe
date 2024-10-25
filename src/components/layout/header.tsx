"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BagIcon from "@/components/ui/icons/BagIcon";
import LogoIcon from "@/components/ui/icons/LogoIcon";
import UserIcon from "@/components/ui/icons/UserIcon";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import React from "react";
import LoginPage from "@/app/(routes)/(auth)/login/page";
import { useState } from "react";
import BagPage from "@/app/(routes)/bag/page";

const Header = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsVisible(true);
  };
  const handleMouseLeave = () => {
    setIsVisible(false);
  };
  const handleHoverEnter = () => {
    setIsHover(true);
  };
  const handleHoverLeave = () => {
    setIsHover(false);
  };
  return (
    <div className="bg-background top-0 transition-all duration-300 fixed z-50 flex flex-col  w-full px-4">
      <div className="flex items-center justify-between">
        <div className="py-5 flex items-center justify-center">
          <ToggleGroup type="single">
            <ToggleGroupItem onMouseEnter={handleMouseEnter} value="women">
              <span className="tracking-wider">WOMEN</span>
            </ToggleGroupItem>
            <ToggleGroupItem value="men">
              <span className="tracking-wider ">MEN</span>
            </ToggleGroupItem>
            <ToggleGroupItem value="teen">
              <div className="w-[69px] h-[21px] items-center justify-center">
                <img
                  src="/assets/images/img_logo_lsv_teen.png"
                  alt="A beautiful scenery"
                  className="w-full h-full object-cover"
                />
              </div>
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className="mx-auto">
          <LogoIcon />
        </div>

        <div className="flex gap-3 items-center">
          <Input
            className="w-[160px] px-3 placeholder-black placeholder:text-[12px] font-light h-[32px] border-none bg-[#f5f5f5] shadow-none rounded-full"
            placeholder="SEARCH"
          />
          <LoginPage />
          <BagPage />
        </div>
      </div>
      {isVisible && (
        <div
          onMouseLeave={handleMouseLeave}
          className="top-[-50px]  flex left-0 bg-white p-4 "
        >
          <div className="flex flex-col gap-3 text-[12px] text-[#4C4A4A] ">
            <span>NEWS</span>
            <span
              onMouseEnter={handleHoverEnter}
              onMouseLeave={handleHoverLeave}
              className="tracking-wider hover:text-gray-400 cursor-pointer"
            >
              CHLOTHES
            </span>
            <span className="tracking-wider">ACCESSORIES</span>
            <span className="tracking-wider">GET THE LOOK</span>
          </div>
          {isHover && (
            <div className="bg-slate-950 w-full ml-[60px]">Hihihihi</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
