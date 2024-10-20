"use client";
import StarIcon from "@/components/ui/icons/StarIcon";
import { motion } from "framer-motion";

const MarqueeText = ({ texts }) => {
  return (
    <div className="mt-[10px] border-t border-b p-3 border-black whitespace-nowrap">
      <motion.div
        className="inline-flex items-center space-x-8"
        initial={{ x: "0" }}
        animate={{ x: "-100%" }}
        transition={{ repeat: Infinity, duration: 70, ease: "linear" }}
      >
        {texts.map((text, index) => (
          <div
            key={index}
            className=" inline-flex items-center gap-2 space-x-2 justify-center "
          >
            <StarIcon />
            <span className="text-[16px] font-light tracking-wide">{text}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default MarqueeText;
