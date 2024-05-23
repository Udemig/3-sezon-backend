// Parallel route'un layput bileşenine prop olarak hem page.js ghemde @ işareti tanımladığımız slot bileşenleri tek tek gelir

import Link from "next/link";

const Layout = ({ children, users, revenue, notifications }) => {
  return (
    <div className="flex flex-col gap-10">
      <div className="bg-zinc-700 rounded-md p-4 flex gap-6">
        <Link href="/dashboard">Göstergeler</Link>
        <Link href="/dashboard/settings">Ayarlar</Link>
      </div>

      <div>{children}</div>

      <div className="flex">
        <div className="flex flex-col">
          <div className="border border-zinc-700 p-6">{users}</div>

          <div className="border border-zinc-700 p-6">{revenue}</div>
        </div>

        <div className="border border-zinc-700 p-6"> {notifications}</div>
      </div>
    </div>
  );
};

export default Layout;
