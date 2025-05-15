import React, { useState } from "react";

function HoverEffect() {
  const [activeCells, setActiveCells] = useState([]);
  const duration = 300;

  const handleHover = (index) => {
    setActiveCells((prev) => [...prev, index]);

    setTimeout(() => {
      setActiveCells((prev) => prev.filter((i) => i !== index));
    }, duration);
  };

  return (
    <div
      className="h-[100vh] w-screen fixed z-[10] top-0 left-0 grid grid-cols-12 grid-rows-[repeat(6,1fr)]"
    >
      {Array.from({ length: 70 }).map((_, i) => (
        <div
          key={i}
          onMouseEnter={() => handleHover(i)}
          className={`mix-blend-difference  transition duration-100 ${
            activeCells.includes(i) ? "bg-[#FF6900]/30" : "bg-transparent"
          }`}
        ></div>
      ))}
    </div>
  );
}

export default HoverEffect;
