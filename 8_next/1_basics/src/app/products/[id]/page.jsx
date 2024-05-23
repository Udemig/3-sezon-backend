import Link from "next/link";
import { notFound } from "next/navigation";

// 1) statik metadata tanımı
// export const metadata = {
//   title: "Ürün Detay",
// };

// 2) dinamik metadata tanımız
export const generateMetadata = ({ params }) => ({
  title: `Ürün ${params.id}`,
});

// bileşen
const Product = ({ params }) => {
  // Diyelimki api'da 99 ürün var eğerki ürünün id'si 99'dan büyükse 404 sayfasında yönlendirelim
  if (params.id > 99) {
    notFound();
  }

  return (
    <div>
      <h1>ÜRÜN DETAY SAYFASI - TEST</h1>

      <h2 className="mt-20">
        <span className="text-red-500 ">{params.id}</span> idli ürün
        görüntüleniyor
      </h2>

      <Link href={`/products/${params.id}/reviews`} className="mt-20">
        Yorumları Görüntüle
      </Link>
    </div>
  );
};

export default Product;
