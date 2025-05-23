"use client";
import React, { useEffect, useRef, useState } from "react";
import "../app/globals.css";
import Enigma from "./EnigmaWeb/Enigma";
import SecondPage from "./EnigmaWeb/SecondPage";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ThirdPage from "./EnigmaWeb/ThirdPage";
import Lenis from "lenis";
import Reflection from "./3DTextReflection/Reflection";
import Gridd from "./Pages/grid";
import HoverEffect from "./Pages/HoverEffect";

import DREI from "./EnigmaWeb/DREI";
import Hero from "./EnigmaWeb/Hero";
import BackgroundPractice from "./EnigmaWeb/BackgroundPractice";
import WavyBlurGradient from "./EnigmaWeb/blurshader";
import CenteredWavyBlurShader from "./EnigmaWeb/BlurShader2";
gsap.registerPlugin(ScrollTrigger);

function page() {
  const [onHold, setOnHold] = useState(false);
  const [isholding, setIsholding] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0) ;
  const cursorRef = useRef(null);

  // useEffect(() => {
  //   const lenis = new Lenis();

  //   function raf(time) {
  //     lenis.raf(time);
  //     requestAnimationFrame(raf);
  //   }
  //   requestAnimationFrame(raf);

  //   return () => {
  //     lenis.destroy();
  //     ScrollTrigger.kill();
  //   };
  // }, []);

  // useEffect(() => {
  //   if (!cursorRef.current) return;

  //   const onMouseMove = (e) => {
  //     gsap.to(cursorRef.current, {
  //       x: e.clientX,
  //       y: e.clientY,
  //       duration: 0.1,
  //       ease: "power1.out",
  //     });
  //   };

  //   const onMouseEnter = () => {
  //     if (!cursorRef.current) return;
  //     gsap.to(cursorRef.current, {
  //       scale: 2,
  //       backgroundColor: "#FF6B00",
  //       duration: 0.2,
  //     });
  //   };

  //   const onMouseLeave = () => {
  //     if (!cursorRef.current) return;
  //     gsap.to(cursorRef.current, {
  //       scale: 1,
  //       backgroundColor: "#ffffff",
  //       duration: 0.2,
  //     });
  //   };

  //   window.addEventListener("mousemove", onMouseMove);

  //   return () => {
  //     window.removeEventListener("mousemove", onMouseMove);
  //     interactiveElements.forEach((element) => {
  //       element.removeEventListener("mouseenter", onMouseEnter);
  //       element.removeEventListener("mouseleave", onMouseLeave);
  //     });
  //   };
  // }, []);

  return (
    <>
      {/* <div
        ref={cursorRef}
        className="cursor pointer-events-none flex items-center select-none -translate-x-1/2 -translate-y-1/2 justify-center w-3 h-3 bg-white rounded-full fixed z-[9999]"
      >
        {onHold && (
          <div className="relative">
            <p className="text-white transition-all duration-200 text-sm uppercase font-bold">
              {holdProgress === 100
                ? "Success!!"
                : isholding
                ? "Holding..."
                : "HOLD"}
            </p>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-40 h-[2px] bg-white rounded-full">
              <div
                className="h-full bg-zinc-400 rounded-full transition-all duration-200"
                style={{ width: `${holdProgress}%` }}
              />
            </div>
          </div>
        )}
      </div> */}
      <div className="relative ">
        {/* <div className="w-screen h-screen sectionMain top-0 left-0 fixed z-10">
          <Enigma />
        </div>

        <Hero />
        <SecondPage />
        <div className="relative w-screen h-screen ">
          <ThirdPage />
        </div> */}
        <BackgroundPractice />
       {/* <WavyBlurGradient /> */}
       {/* <CenteredWavyBlurShader /> */}
      </div>
    </>
  );
}

export default page;
