import React from "react";

function Testimonials2() {
  return (
    <div className="w-screen h-screen bg-gradient-to-r from-[#FF5600] to-[#FF8800]">
      <div className="h-full w-full relative top-0  left-0 flex flex-col ">
        <div className="h-[60%] items-center flex flex-row gap-5 py-20 justify-between px-20">
          <div className="w-1/2  flex flex-col ">
            <div className="w-32 h-32 bg-zinc-500 rounded-full"></div>
            <p className="text-white text-6xl font-bold">Paul Lees</p>
            <p className="text-white text-md">CEO, Petronum</p>
          </div>
          <div className="w-1/2 flex flex-col  justify-center">
            <p className="font-bold text-white text-9xl leading-none ">"</p>
            <p className="text-white text-sm ">
              Enigma Digital's mastery of web design and development is truly
              unparalleled. Their ability to craft a website that not only
              captured our essence but also transformed our digital presence is
              nothing short of miraculous. We are beyond thrilled with the
              results and can't thank the Enigma team enough for their tireless
              dedication and creativity. Our collaboration has been a
              game-changer for Wragby Business Solutions, and we wholeheartedly
              recommend Enigma Digital to anyone seeking a top-notch digital
              partner!
            </p>
          </div>
        </div>
        <img
          src="/EnigmaAssets/testmonials.png"
          className="w-full h-[40%] object-contain object-bottom"
        />
      </div>
    </div>
  );
}

export default Testimonials2;
