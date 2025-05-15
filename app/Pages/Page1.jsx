import React from "react";

function Page1() {
  return (
    <div 
      id="section1"
      className="h-screen bg-black w-screen  font-thin flex-col text-white p-6 flex px-20 "
    >
      <div className="flex items-center justify-between">
        <p className="text-xl font-medium uppercase">Enigma.</p>
        <p className="text-xl font-medium cursor-pointer">Go ⟶	</p>
      </div>
      <div className="h-screen w-full flex-col flex items-center justify-center">
        <h1 className="text-[10vw] capatilize uppercase font-bold leading-none">We'are Enigma.</h1>
      </div>
    </div>
  );
}

export default Page1;
