import React from "react";

const ColorComponent = () => {
  return (
    <div
      className="p-[4px] cursor-pointer mt-3 h-[38px]  outline-none focus:border focus:border-black rounded-full border-black"
      tabIndex={0}
    >
      <div className="p-[1px] rounded-full border border-zinc-300">
        <div className="h-6 w-6 rounded-full px-0 py-0 bg-slate-900"></div>
      </div>
    </div>
  );
};

export default ColorComponent;
