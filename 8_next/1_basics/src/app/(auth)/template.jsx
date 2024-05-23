"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

// Sadece auth grubundaki 3 sayfanın ortak layout bileşenini oluşturduk yani kullanıcı bu sayfları açtığı zman sayflar önce layputa prop olarak gelicek ardından layoutta tanımldağımız yer yerleşicek ardından ekrana gidicek

const Layout = ({ children }) => {
  const [name, setName] = useState("");

  // url'deki mevcut sayfayı alır
  const path = usePathname();

  return (
    <div className="w-full flex gap-10 p-5">
      <nav className="flex flex-col gap-6 text-xl bg-zinc-700 p-3 rounded-md">
        <label>İsim, {name}</label>
        <input
          onChange={(e) => setName(e.target.value)}
          className="text-black rounded-md px-2"
          type="text"
        />

        <Link className={path === "/login" ? "active" : ""} href="/login">
          Giriş Yap
        </Link>

        <Link className={path === "/signup" ? "active" : ""} href="/signup">
          Kaydol
        </Link>

        <Link
          className={path === "/forgotpass" ? "active" : ""}
          href="/forgotpass"
        >
          Şifremi Unuttum
        </Link>
      </nav>

      {children}
    </div>
  );
};

export default Layout;
