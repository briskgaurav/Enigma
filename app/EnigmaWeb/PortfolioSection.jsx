import React from "react";
import ThirdPage from "./ThirdPage";

function PortfolioSection() {
  return (
    <>
    
      <div className="h-screen  w-screen bg-black flex flex-row  items-center justify-center px-20 gap-10 py-5">
        <div className="w-[45%] h-full rounded-[3vw] bg-[#FF6B00] p-8 flex  flex-col justify-between">
          <h1 className="text-black text-[7.5vw] leading-none font-light">
            Garden City Mall
          </h1>
          <div className="flex flex-row items-center justify-between">
            <p>2023</p>
            <div className="flex flex-row  gap-4">
              <p>Web Design</p>
              <p>Branding</p>
              <p>Marketing</p>
            </div>
          </div>
        </div>
        <div className="w-[45%] h-full rounded-[3vw] bg-[#33EAFF]">
          <img
            src="/EnigmaAssets/laptop.png"
            className="w-full h-full object-contain"
            alt=""
          />
        </div>
      </div>
    </>
  );
}

export default PortfolioSection;
