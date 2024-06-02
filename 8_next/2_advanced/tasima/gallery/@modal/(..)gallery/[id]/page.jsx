"use client";

import { data } from "../../../constants";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";

const Detail = ({ params }) => {
  const item = data.find((i) => params.id === i.id);

  const overlay = useRef(null);
  const router = useRouter();

  const handleClose = (e) => {
    if (e.target === overlay.current) {
      router.back();
    }
  };

  return (
    <div
      ref={overlay}
      onClick={handleClose}
      className="fixed inset-0 bg-black/60 z-10 mx-auto p-10"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:w-10/12 md:9/12 lg:2/5  md:p-6">
        <Image
          src={item.src}
          alt={item.name}
          className="w-full max-h-[400px] object-cover aspect-square rounded-md"
        />

        <div className="bg-white text-black p-4">
          <h2 className="text-xl font-semibold">{item.name}</h2>
        </div>
      </div>
    </div>
  );
};

export default Detail;
