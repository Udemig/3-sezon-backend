import React from "react";

// cevap vemesi 3 san,iye süren bir fonksiyon yazdık
export async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// bileşen içerisnde bu fonksiyonu çağırdık
const Signup = async () => {
  await delay();

  return <div>Signup</div>;
};

export default Signup;
