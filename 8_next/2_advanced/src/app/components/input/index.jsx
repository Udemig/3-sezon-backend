"use client";
import { useState } from "react";

// directive

const Input = () => {
  const [name, setName] = useState("");
  console.log("Input Bileşeni Render edildi");

  return (
    <>
      <input
        onChange={(e) => setName(e.target.value)}
        className="my-10 rounded-md text-black p-1"
      />

      <p>{name}</p>
    </>
  );
};

export default Input;
