import { Button } from "@/components/ui/button";
import React from "react";
interface Props {
  size: string;
}
const SizeComponent = ({ size }: Props) => {
  return (
    <Button className="h-10  shadow-none text-black bg-white text-[12px] font-light focus:bg-black focus:text-white w-10 hover:bg-white hover:border-black rounded-full border border-[#e0e0e0]">
      {size}
    </Button>
  );
};

export default SizeComponent;
