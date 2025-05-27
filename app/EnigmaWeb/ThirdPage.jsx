import React from "react";

export default function ThirdPage() {
  return (
    <>
      <div className="h-screen w-screen flex flex-row  items-center justify-center px-20 py-20">
        <div className="w-full h-full ">
          <div className="flex flex-row gap-5 items-center">
            <div className="w-1.5 h-1.5  bg-white "></div>
            <h1 className=" capitalize text-white text-2xl">About Us</h1>
          </div>
        </div>
        <div className="w-full h-full flex flex-col items-start justify-between">
          <p className="text-white text-5xl  ">
            From Concept to Conversion We're Changing the Face of Web.
          </p>
          <p className="text-white text-xl">
            We unravel complex design challenges through meticulous user
            research, expert analysis, prototyping, and collaborative design
            with users and stakeholders. Harnessing the power of cutting-edge
            tools and our proprietary approach we craft delightful and intuitive
            experiences.
          </p>
          <div className="logo items-center gap-1 flex">
            {["Say Hi!"].map((item, index) => {
              return (
                <div
                  key={index}
                  className={`px-12 py-3 border-white border  text-white rounded-full flex items-center justify-center`}
                >
                  <p className="text-sm">{item}</p>
                </div>
              );
            })}
            <div className="w-12 h-12 border-white border-[1px] rounded-full flex items-center justify-center">
              <p className="text-2xl">↗</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
