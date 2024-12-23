import { Button } from "@/components/ui/button";
import React from "react";
interface Props {
  content: string;
}
const AddBagBtn = ({ content }: Props) => {
  return (
    <Button className="h-[48px] cracking-wide mt-8 w-full text-[14px] font-light">
      {content}
    </Button>
  );
};

export default AddBagBtn;
