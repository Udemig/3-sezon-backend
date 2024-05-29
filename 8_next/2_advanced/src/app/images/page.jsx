import Image from "next/image";

// Kaynağı local olan yani indirip projeye dahil ettiğimiz resim
import localImage from "../gallery/photos/1.jpg";

// Kaynağı projenin dışarında olan url yardımıyla erişitiğimiz resim
const remoteImage =
  "https://media.licdn.com/dms/image/D4D12AQGwUIl2kXzFtw/article-cover_image-shrink_720_1280/0/1683948235908?e=2147483647&v=beta&t=l1jQ1MmZ1s8G5byZBrY5_UKA5vnrgKgy6efgCyupSD4";

const Images = () => {
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Resim Bileşeni</h1>

      <h2 className="font-bold mt-5 mb-2">Local Resim</h2>
      <Image
        src={localImage}
        height={300}
        alt="çin seddi"
        quality={50}
        unoptimized // bütün optimizassyonları devre dışı bırakır
      />

      <h2 className="font-bold mt-5 mb-2">Remote Resim</h2>
      <p>Genişlik | Yükseklik | next.config ayarı</p>
      <Image
        src={remoteImage}
        width={400}
        height={200}
        alt="nextjs vs react"
        priority
      />

      <h2 className="font-bold mt-5 mb-2">Bütün Alanı Kaplayan</h2>
      <div className="relative h-32">
        <Image src={localImage} fill placeholder="blur" />
      </div>
    </div>
  );
};

export default Images;
