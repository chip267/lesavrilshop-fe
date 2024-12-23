import React from "react";
import HeartIcon from "@/components/ui/icons/HeartIcon";
interface ProductProps {
  productName: string;
  productPrice: string;
  productImage: string;
}
const products = [
  {
    productName: "Product 1",
    productPrice: "$100",
    productImage: "/assets/images/07002376712-p.jpg",
  },
  {
    productName: "Product 1",
    productPrice: "$100",
    productImage: "/assets/images/07001376712-p.jpg",
  },
  {
    productName: "Product 1",
    productPrice: "$100",
    productImage: "/assets/images/07124663800-p.jpg",
  },
  {
    productName: "Product 1",
    productPrice: "$100",
    productImage: "/assets/images/07126066829-p.jpg",
  },
  {
    productName: "Product 1",
    productPrice: "$100",
    productImage: "/assets/images/08564714712-p.jpg",
  },
  {
    productName: "Product 1",
    productPrice: "$100",
    productImage: "/assets/images/05003179400-13-a7o.jpg",
  },
  {
    productName: "Product 1",
    productPrice: "$100",
    productImage: "/assets/images/05003179428-13-a7o.jpg",
  },
  {
    productName: "Product 1",
    productPrice: "$100",
    productImage: "/assets/images/05003179809-13-a7o.jpg",
  },
  {
    productName: "Product 1",
    productPrice: "$100",
    productImage: "/assets/images/05033335775-13-a7o.jpg",
  },
  {
    productName: "Product 1",
    productPrice: "$100",
    productImage: "/assets/images/05033335800-14-a7o.jpg",
  },
  {
    productName: "Product 1",
    productPrice: "$100",
    productImage: "/assets/images/05042335400-13-a7o.jpg",
  },
  {
    productName: "Product 1",
    productPrice: "$100",
    productImage: "/assets/images/05044335400-13-a7o.jpg",
  },
  {
    productName: "Product 1",
    productPrice: "$100",
    productImage: "/assets/images/07124663800-p.jpg",
  },
  {
    productName: "Product 1",
    productPrice: "$100",
    productImage: "/assets/images/05044335428-13-a7o.jpg",
  },
  {
    productName: "Product 1",
    productPrice: "$100",
    productImage: "/assets/images/08564714712-p.jpg",
  },
];
const GridItemsRecommend = () => {
  return (
    <div className="px-[3px] mb-20 mt-8 grid grid-cols-5 gap-[6px]">
      {products.map((item, index) => (
        <div key={index}>
          <div className="hover:cursor-pointer relative group h-[350px] w-full">
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
            <HeartIcon height="20" width="20" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default GridItemsRecommend;
