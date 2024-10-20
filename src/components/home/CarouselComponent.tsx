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
const CarouselComponent = () => {
  return (
    <Carousel
      opts={{
        align: "center",
      }}
      className="w-ful ml-4 mt-3"
    >
      <CarouselContent>
        {products.map((item, index) => (
          <CarouselItem key={index} className="lg:basis-1/4 md:basis-1/2">
            <div className="p-1">
              <div className="h-[500px] w-full">
                <img
                  src={item.productImage}
                  alt="clothes"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[12px] mt-2 font-light tracking-wide">
                {item.productName}
              </p>
              <p className="text-[12px] mt-2 font-extrabold ">
                {item.productPrice}
              </p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default CarouselComponent;
