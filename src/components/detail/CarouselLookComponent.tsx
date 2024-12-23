import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import React from "react";
interface ProductProps {
  productName: string;
  productPrice: string;
  productImage: string;
}
const products = [
  {
    productName: "Product 1",
    productPrice: "$100",
    productImage: "/assets/images/004e1822a69c7ad5049c.webp",
  },
  {
    productName: "Product 1",
    productPrice: "$100",
    productImage: "/assets/images/0625953d30df7a0e0fc7.webp",
  },
  {
    productName: "Product 1",
    productPrice: "$100",
    productImage: "/assets/images/b5d96298accf194580d4.webp",
  },
  {
    productName: "Product 1",
    productPrice: "$100",
    productImage: "/assets/images/eb5412eed34ab7b0afd0.webp",
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
const CarouselLookComponent = () => {
  return (
    <Carousel
      opts={{
        align: "center",
      }}
      className="w-ful ml-4 mt-8"
    >
      <CarouselContent>
        {products.map((item, index) => (
          <CarouselItem key={index} className="lg:basis-1/4 md:basis-1/2">
            <div className="p-[2px]">
              <div className="cursor-pointer relative group h-[600px] w-full">
                <img
                  src={item.productImage}
                  alt="clothes"
                  className="w-full h-full object-cover"
                />
                <div className=" bottom-0 cursor-pointer left-0 w-full opacity-0 absolute group-hover:opacity-100 bg-gradient-to-t transition-opacity duration-300 h-[400px] from-black via-black/5 to-transparent ">
                  <p className="absolute ml-6 mb-6 bottom-0 left-0 font-light text-white text-[12px]">
                    @lalisamanoban
                  </p>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default CarouselLookComponent;
