import Link from "next/link";

const Comp4 = () => {
  return (
    <div className="h-screen grid place-items-center">
      <h1 className="font-bold text-3xl">4. Component</h1>
      
      <Link href="/comp1/comp3">3. Bileşene Yönlendir</Link>
    </div>
  );
};

export default Comp4;
