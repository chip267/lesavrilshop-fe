import HeartIcon from "@/components/ui/icons/HeartIcon";
import React from "react";
interface ProductProps {
  products: {
    productName: string;
    productPrice: string;
    productImage: string;
  }[];
}

const GridItemComponent = ({ products }: ProductProps) => {
  return (
    <div className="px-[3px] mt-8 grid grid-cols-4 gap-x-[6px] gap-y-10">
      {products.map((item, index) => (
        <div key={index}>
          <div className="hover:cursor-pointer relative group h-[500px] w-full">
            <img
              src={item.productImage}
              alt="clothes"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full p-3 gap-[10px] bg-white justify-center opacity-0 group-hover:opacity-100 items-center  flex flex-col transition-opacity duration-300">
              <p className="text-[12px] mt-2 font-light tracking-wide">
                Select size
              </p>
              <div className="flex items-center gap-3">
                <p className="text-[12px] mt-2 font-light tracking-wide">32</p>
                <p className="text-[12px] mt-2 font-light tracking-wide">34</p>
                <p className="text-[12px] mt-2 font-light tracking-wide">36</p>
                <p className="text-[12px] mt-2 font-light tracking-wide">38</p>
                <p className="text-[12px] mt-2 font-light tracking-wide">40</p>
              </div>
            </div>
          </div>
          <div className="px-2 flex justify-between items-center">
            <div>
              <p className="text-[12px] mt-2 font-light tracking-wide">
                {item.productName}
              </p>
              <p className="text-[12px] mt-[2px] font-extrabold ">
                {item.productPrice}
              </p>
            </div>
            <HeartIcon />
          </div>
        </div>
      ))}
    </div>
  );
};

export default GridItemComponent;
