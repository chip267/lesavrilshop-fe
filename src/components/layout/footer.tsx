import DotIcon from "@/components/ui/icons/DotIcon";
import EmailIcon from "@/components/ui/icons/EmailIcon";
import React from "react";

const Footer = () => {
  return (
    <div className="py-10 px-[60px] flex flex-col">
      <div className="py-8 border-t border-b border-[#e4e4e4]">
        <div className="flex justify-between">
          <div>
            <p className="text-black text-[16px] font-semibold">
              Can we help you?
            </p>
            <div className="flex gap-1 mt-6 items-center">
              <EmailIcon />
              <span className="font-medium text-black text-[12px]">
                Send email
              </span>
            </div>
            <p className="text-[10px] mt-2 font-light text-[#8C8C8C]">
              We will reply asap
            </p>
          </div>
          <div>
            <p className="text-black text-[16px] font-semibold">Help</p>
            <div className="flex gap-3 mt-6 flex-col">
              <span className=" text-black font-light tracking-wide text-[12px]">
                Shop online
              </span>
              <span className=" text-black font-light tracking-wide text-[12px]">
                Payment
              </span>
              <span className=" text-black font-light tracking-wide text-[12px]">
                Delivery
              </span>
              <span className=" text-black font-light tracking-wide text-[12px]">
                Returns
              </span>
              <span className=" text-black font-light tracking-wide text-[12px]">
                Guest purchase
              </span>
              <span className=" text-black font-light tracking-wide text-[12px]">
                Electronic receipt
              </span>
              <span className=" text-black font-light tracking-wide text-[12px]">
                Cancel my subscription
              </span>
            </div>
          </div>
          <div>
            <p className="text-black text-[16px] font-semibold">
              We are LESAVRIL
            </p>
            <div className="flex gap-3 mt-6 flex-col">
              <span className=" text-black font-light tracking-wide text-[12px]">
                About LESAVRIL
              </span>
              <span className=" text-black font-light tracking-wide text-[12px]">
                Sustainability
              </span>
              <span className=" text-black font-light tracking-wide text-[12px]">
                Work with us
              </span>
              <span className=" text-black font-light tracking-wide text-[12px]">
                Press
              </span>
            </div>
          </div>
          <div>
            <p className="text-black text-[16px] font-semibold">
              You might be interested in
            </p>
            <div className="flex gap-3 mt-6 flex-col">
              <span className=" text-black font-light tracking-wide text-[12px]">
                Jackets and blazers
              </span>
              <span className=" text-black font-light tracking-wide text-[12px]">
                Dresses
              </span>
              <span className=" text-black font-light tracking-wide text-[12px]">
                Tops and bodysuits
              </span>
              <span className=" text-black font-light tracking-wide text-[12px]">
                Jeans
              </span>
              <span className=" text-black font-light tracking-wide text-[12px]">
                Trousers
              </span>
              <span className=" text-black font-light tracking-wide text-[12px]">
                T-shirts
              </span>
              <span className=" text-black font-light tracking-wide text-[12px]">
                Sweatshirts and hoodies
              </span>
              <span className=" text-black font-light tracking-wide text-[12px]">
                Sweaters and cardigans
              </span>
            </div>
          </div>
          <div>
            <p className="text-black text-[16px] font-semibold">
              Our communication
            </p>
            <div className="flex gap-3 mt-6 flex-col">
              <span className=" text-black font-light tracking-wide text-[12px]">
                Jackets and blazers
              </span>
              <span className=" text-black font-light tracking-wide text-[12px]">
                Dresses
              </span>
              <span className=" text-black font-light tracking-wide text-[12px]">
                Tops and bodysuits
              </span>
              <span className=" text-black font-light tracking-wide text-[12px]">
                Jeans
              </span>
              <span className=" text-black font-light tracking-wide text-[12px]">
                Trousers
              </span>
              <span className=" text-black font-light tracking-wide text-[12px]">
                T-shirts
              </span>
              <span className=" text-black font-light tracking-wide text-[12px]">
                Sweatshirts and hoodies
              </span>
              <span className=" text-black font-light tracking-wide text-[12px]">
                Sweaters and cardigans
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="py-4 flex justify-between">
        <div className="flex flex-col gap-3">
          <div className="flex gap-2 items-center">
            <span className=" text-black tracking-wide font-light text-[12px]">
              Terms and conditions of purchase
            </span>
            <DotIcon />
            <span className=" text-black tracking-wide font-light text-[12px]">
              Terms and conditions for #lesavrilstyle
            </span>
            <DotIcon />
            <span className=" text-black tracking-wide font-light text-[12px]">
              Privacy policy
            </span>
            <DotIcon />
            <span className=" text-black tracking-wide font-light text-[12px]">
              Cookies policy
            </span>
            <DotIcon />
          </div>
          <div className="flex gap-2 items-center">
            <span className=" text-black tracking-wide font-light text-[12px]">
              Cookie settings
            </span>
            <DotIcon />
            <span className=" text-black tracking-wide font-light text-[12px]">
              Sitemap
            </span>
          </div>
        </div>
        <div className=" text-black tracking-wide text-[12px]">
          @2024 LESAVRIL
        </div>
      </div>
    </div>
  );
};

export default Footer;
