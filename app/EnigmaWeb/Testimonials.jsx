import React from "react";

function Testimonials() {
  return (
    <div className="w-screen h-screen bg-white text-[#FF6B00] px-20 flex  justify-center flex-col">
      <div className="flex flex-row items-center gap-5 ">
        <div className="w-10 h-10 rounded-full border-[#FF6B00] border-5"></div>
        <h1 className="text-9xl">Stories that stick, </h1>
      </div>
      <div className="flex flex-row items-center gap-5">
        <div className="w-10 h-10 rounded-full "></div>

        <h1 className="text-9xl">Results that show.</h1>
      </div>
    </div>
  );
}

export default Testimonials;
