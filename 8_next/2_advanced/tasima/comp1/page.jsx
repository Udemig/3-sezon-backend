import Link from "next/link";

const Comp1 = () => {
  return (
    <div className="h-screen grid place-items-center">
      <h1 className="font-bold text-3xl">1. Component</h1>

      <Link href="/comp1/comp2">2. Componenta git</Link>
    </div>
  );
};

export default Comp1;
