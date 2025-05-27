import React from "react";

export default function Solutions() {
  return (
    <div className="h-screen w-screen py-20 px-20 bg-white text-black">
      <div className="flex items-center pb-20  border-b border-black justify-between">
        <h1 className="text-8xl ">Development</h1>
        <h1 className="text-8xl ">001</h1>
      </div>
      <div className="py-4 w-full">
        <p className="w-[60%]">
          A human-centred, design-led approach to product development that
          leverages cutting-edge technologies & agile methodology, committed to
          putting you on a path to success in the ever-changing technological
          landscape. We craft digital solutions that are not just functional,
          but also intuitive and engaging.
        </p>
        <div className="w-full flex">
          <div className="flex flex-row flex-wrap gap-22 gap-y-6 w-[60%] py-10">
            {[
              "User Interface Design",
              "User Experience Design",
              "User Research",
              "User Testing",
              "User Feedback",
              "User Support",
              "User Interface Design",
              "User Experience Design",
              "User Research",
              "User Testing",
              "User Feedback",
              "User Support",
            ].map((item, index) => {
              return (
                <div className="w-[25%] group">
                  <p className="pb-2 text-sm">{item}</p>
                  <div className="h-[.5px] w-full group-hover:w-0 bg-black transition-all duration-200"></div>
                </div>
              );
            })}
          </div>
          <div className="w-[40%] flex items-end justify-end">
            <div className="logo items-center flex">
              <div className="px-8 py-3 text-white border-black border-[1px] rounded-full flex items-center justify-center">
                <p className="text-sm text-black">Know More</p>
              </div>
              <div className="w-12 h-12 border-black border rounded-full flex items-center justify-center ">
                -
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
