"use client";
import React from "react";
import "../app/globals.css";
import Enigma from "./EnigmaWeb/Enigma";
import SecondPage from "./EnigmaWeb/SecondPage";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ThirdPage from "./EnigmaWeb/ThirdPage";

import Hero from "./EnigmaWeb/Hero";

import PortfolioSection from "./EnigmaWeb/PortfolioSection";
import OrangeBlurBackground from "./EnigmaWeb/FullScreenOrangeShader";
import Testimonials from "./EnigmaWeb/Testimonials";
import Testimonials2 from "./EnigmaWeb/Testimonials2";
import Solutions from "./EnigmaWeb/Solutions";
import Fog3D from "./EnigmaWeb/Fog3D";
import BackgroundPractice from "./EnigmaWeb/BackgroundPractice";
gsap.registerPlugin(ScrollTrigger);

function page() {
  return (
    <>
      <div className="relative ">
        {/* <div className="w-screen h-screen top-0 left-0 fixed">
          <Enigma />
        </div>

        <Hero />
        <div className="relative mainSection">
          <SecondPage />
          <ThirdPage />
          <PortfolioSection />
          <Testimonials />
          <Testimonials2 />
        </div> */}
        <BackgroundPractice />
      </div>
      {/* <Fog3D /> */}
    </>
  );
}

export default page;
