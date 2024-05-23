import Link from "next/link";

export const metadata = {
  title: "Ürünler",
};
const Products = () => {
  const products = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="flex flex-col gap-3">
      <h1>ÜRÜNLER SAYFASI</h1>

      <br />
      {products.map((id) => (
        <Link key={id} href={`/products/${id}`}>
          Ürün {id}
        </Link>
      ))}
    </div>
  );
};

export default Products;
