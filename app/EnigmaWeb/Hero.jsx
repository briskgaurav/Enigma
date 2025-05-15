import React from "react";

export default function Hero() {
  return (

    <div className="h-screen pointer-events-none w-screen absolute flex-col top-0 left-0 z-20">
      <nav className="w-full h-[10%] flex items-center justify-between px-20 py-10">
        <div className="flex w-full items-center justify-between">
          <div className="logo w-10 h-10">
            <img className="w-full h-full object-contain" src="/logo.png" alt="" />
          </div>

          <div className="logo items-center flex">
            {["Let's Talk", "Menu"].map((item, index) => {
              return (
                <div key={index}
                  className={`px-5 py-2  text-white ${
                    index === 0 ? "bg-[#fc8531] mr-4" : "bg-black"
                  } rounded-full flex items-center justify-center`}
                >
                  <p className="text-sm">{item}</p>
                </div>
              );
            })}
            <div className="w-9 h-9 bg-black rounded-full flex items-center justify-center">
                <img className="w-4 h-4 object-contain" src="/menu.png" alt="" />
            </div>
          </div>
        </div>
      </nav>
      <div className="w-full h-[90%] flex items-center justify-between">
        <div className="w-[65%] flex justify-end py-20 px-20 flex-col h-[90%] ">
          <h1 className="text-white text-[8vw] leading-none font-medium">
            Digital
          </h1>
          <h1 className="text-black text-[8vw] leading-none font-medium">
            Experience
          </h1>
          <h1
            className="text-transparent text-[8vw] leading-none font-medium"
            style={{ WebkitTextStroke: "1px white" }}
          >
            Design Agency
          </h1>
        </div>
        <div className="w-[35%] h-[90%] flex  items-end px-10 py-10">
          <p className="text-white tracking-wide ">
            Harnessing the power of Emotion, Design, Technology &
            Neuromarketing, we create Digital Brand Experiences that propel your
            success in the enigmatic realm of bits & bytes.
          </p>
        </div>
      </div>
    </div>
  );
}
