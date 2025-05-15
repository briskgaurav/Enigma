import React, { useState } from "react";

function Gridd() {
  return (
    <div className="h-[300vh] w-screen -z-10 grid grid-cols-8 grid-rows-[repeat(10,1fr)]">
      {Array.from({ length: 80 }).map((_, i) => (
        <div
          key={i}
          className={`border border-gray-100`}
        ></div>
      ))}
    </div>
  );
}

export default Gridd;
