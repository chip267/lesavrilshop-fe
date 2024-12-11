import { Button } from "@/components/ui/button";
import Image from "next/image";
import Head from "next/head";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import ArrowIcon from "@/components/ui/icons/ArrowIcon";
import MarqueeText from "@/components/home/MarqueeText";
import CarouselComponent from "@/components/home/CarouselComponent";

export default function Home() {
  const texts = [
    "HOME DELEVERY",
    "Receive your purchases in 5-7 working days",
    "30 DAYS TO RETURN",
    "Check conditions in My Account",
    "EASY PAYMENT",
    "With Visa, Mastercard, Paypal or American Express",
    "HOME DELEVERY",
    "Receive your purchases in 5-7 working days",
    "30 DAYS TO RETURN",
    "Check conditions in My Account",
    "EASY PAYMENT",
    "With Visa, Mastercard, Paypal or American Express",
    "HOME DELEVERY",
    "Receive your purchases in 5-7 working days",
    "30 DAYS TO RETURN",
    "Check conditions in My Account",
    "EASY PAYMENT",
    "With Visa, Mastercard, Paypal or American Express",
    "HOME DELEVERY",
    "Receive your purchases in 5-7 working days",
    "30 DAYS TO RETURN",
    "Check conditions in My Account",
    "EASY PAYMENT",
    "With Visa, Mastercard, Paypal or American Express",
  ];
  return (
    <div className="flex flex-col">
      <Head>
        <link rel="icon" href="/assets/images/ico_logo.ico" />
        <title>My Website</title>
      </Head>
      <div className="w-full h-[650px] items-center justify-center">
        <img
          src="/assets/images/img_banner_women.png"
          alt="A beautiful scenery"
          className="w-full h-full object-cover"
        />
      </div>
      <MarqueeText texts={texts} />

      <div className="flex gap-2 mt-2 mb-2 h-[280px]">
        <div className="w-full hover:cursor-pointer hover:bg- flex relative items-center justify-center">
          <img
            src="/assets/images/img_jacket_cover.jpg"
            alt="A beautiful scenery"
            className="w-full h-full object-cover"
          />
          <div className="absolute flex items-center justify-center">
            <p className="leading-tight tracking-wide text-center text-[24px] font-semibold text-white">
              JACKET AND BLAZERS
            </p>
          </div>
        </div>
        <div className="w-full hover:cursor-pointer flex relative items-center justify-center">
          <img
            src="/assets/images/img_dress_cover.jpg"
            alt="A beautiful scenery"
            className="w-full h-full object-cover"
          />
          <div className="absolute flex items-center justify-center">
            <p className="leading-tight tracking-wide text-center text-[24px] font-semibold text-white">
              DRESSES
            </p>
          </div>
        </div>
        <div className="w-full hover:cursor-pointer flex relative items-center justify-center">
          <img
            src="/assets/images/img_sweater_cover.jpg"
            alt="A beautiful scenery"
            className="w-full h-full object-cover"
          />
          <div className="absolute flex items-center justify-center">
            <p className=" leading-tight tracking-wide text-center text-[24px] font-semibold text-white">
              SWEATER AND CARDIGAN
            </p>
          </div>
        </div>
        <div className="w-full hover:cursor-pointer flex relative items-center justify-center">
          <img
            src="/assets/images/img_coat_cover.jpg"
            alt="A beautiful scenery"
            className="w-full h-full object-cover"
          />
          <div className="absolute flex items-center justify-center">
            <p className="leading-tight tracking-wide text-center text-[24px] font-semibold text-white">
              COATS AND TRENDCH COATS
            </p>
          </div>
        </div>
        <div className="w-full hover:cursor-pointer flex relative items-center justify-center">
          <img
            src="/assets/images/img_trouser_cover.jpg"
            alt="A beautiful scenery"
            className="w-full h-full object-cover"
          />
          <div className="absolute flex items-center justify-center">
            <p className="leading-tight tracking-wide text-center text-[24px] font-semibold text-white">
              TROUSERS
            </p>
          </div>
        </div>
        <div className="w-full hover:cursor-pointer flex relative items-center justify-center">
          <img
            src="/assets/images/img_jeans_cover.jpg"
            alt="A beautiful scenery"
            className="w-full h-full object-cover"
          />
          <div className="absolute flex items-center justify-center">
            <p className="leading-tight tracking-wide text-center text-[24px] font-semibold text-white">
              JEANS
            </p>
          </div>
        </div>
      </div>
      <div className="bg-black py-4 ">
        <div className="flex justify-between px-5 items-center">
          <div className="flex gap-5 items-center">
            <ArrowIcon color="white" />
            <p className="text-[48px] text-white font-light">GET THE LOOK</p>
            <p className="text-[14px] w-[450px] text-white font-extralight uppercase">
              Get inspiration from our gallery and share your looks on social
              media with <b>@lesavril</b> and <b>#lesavrilstyle</b>.
            </p>
          </div>
          <Button
            variant="outline"
            className="border border-white rounded-full text-white text-[14px] bg-transparent py-[10px]"
          >
            See all styles
          </Button>
        </div>
        <div className="flex gap-[6px] pb-5 mt-3 h-[420px]">
          <div className="w-full flex relative ">
            <img
              src="/assets/images/img_streetwear.jpg"
              alt="A beautiful scenery"
              className="w-full h-full object-cover"
            />
            <div className="absolute mt-[350px] ml-[20px] flex">
              <p className="leading-tight tracking-wide text-center text-[24px] font-semibold text-white">
                STREETWEAR
              </p>
            </div>
          </div>
          <div className="w-full flex relative ">
            <img
              src="/assets/images/img_leather.jpg"
              alt="A beautiful scenery"
              className="w-full h-full object-cover"
            />
            <div className="absolute flex ">
              <p className=" mt-[350px] ml-[20px] leading-tight tracking-wide text-center text-[24px] font-semibold text-white">
                LEATHER LOOK
              </p>
            </div>
          </div>
          <div className="w-full flex relative ">
            <img
              src="/assets/images/img_casual.jpg"
              alt="A beautiful scenery"
              className="w-full h-full object-cover"
            />
            <div className="absolute flex ">
              <p className=" mt-[350px] ml-[20px] leading-tight tracking-wide text-center text-[24px] font-semibold text-white">
                CASUAL
              </p>
            </div>
          </div>
          <div className="w-full flex relative ">
            <img
              src="/assets/images/img_city.jpg"
              alt="A beautiful scenery"
              className="w-full h-full object-cover"
            />
            <div className="absolute flex ">
              <p className=" mt-[350px] ml-[20px] leading-tight tracking-wide text-center text-[24px] font-semibold text-white">
                BACK TO THE CITY
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white py-4 ">
        <div className="flex justify-between px-5 items-center">
          <div className="flex gap-5 items-center">
            <ArrowIcon color="black" />
            <p className="text-[48px] text-black font-light">
              IT MAY INTEREST YOU
            </p>
            <p className="text-[14px] w-[450px] text-black font-extralight uppercase">
              Get inspiration from our gallery and share your looks on social
              media with <b>@lesavril</b> and <b>#lesavrilstyle</b>.
            </p>
          </div>
        </div>
        <CarouselComponent />
      </div>
      <div className="mt-6 bg-black p-[70px] flex flex-col justify-center items-center">
        <p className="font-semibold text-[42px] tracking-wider uppercase text-white">
          Subscribe to our newsletter
        </p>
        <p className="mt-2 text-white font-extralight text-[14px] ">
          Be the first to get the latest news about trends, promotions and much
          more!
        </p>
        <Button className="mt-4 hover:bg-transparent hover:border hover:border-white hover:text-white rounded-full text-black text-[14px] bg-white py-[22px]">
          Subscribes
        </Button>
      </div>
    </div>
  );
}
