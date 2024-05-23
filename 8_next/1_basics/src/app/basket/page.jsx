"use client";

import { useRouter } from "next/navigation";

const Basket = () => {
  // useRouter bir hook olduğu içi,n sadece client comp'larda çalışırı. import edildikten kurulumu gerekir.
  const router = useRouter();

  const handleClick = () => {
    alert("sepet onaylandı");

    // fonksiyon içersinde yönlendirme yapmak için router.push kullanırız
    router.push("/products");

    // bir sayfa geri
    router.back();

    // bir sayfa ileri
    router.forward();

    // sayfayı yenile
    router.refresh();
  };

  return (
    <div className="flex flex-col gap-10">
      Basket
      <button onClick={handleClick}>Sepeti Onayla</button>
    </div>
  );
};

export default Basket;
