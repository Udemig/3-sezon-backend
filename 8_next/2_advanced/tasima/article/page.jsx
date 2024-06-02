"use client";
import { Poppins, Playfair_Display } from "next/font/google";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Script from "next/script";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });
const play = Playfair_Display({ weight: "800", subsets: ["latin"] });

const Article = () => {
  // 1) yönlendirme
  const router = useRouter();

  // 2) aramam parametrelerine erişim
  const params = useSearchParams();

  const sort = params.get("sort");

  // 3) yolu almak için
  const path = usePathname();

  const handleReady = () => {
    $("h4").append(" (j query tarafından eklendi)");
  };

  const navigate = () => {
    router.push("/asd"); // farklı sayfaya
    router.back(); // önceki sayfa
    router.forward(); // sonraki sayfa
    router.reload(); // sayfayı yenile
  };

  return (
    <div className="p-5">
      <p className="text-2xl font-bold">{path} yolundasınınız</p>
      <p>{params.size} parametre var</p>
      <p>{sort} sırlama mevcut</p>

      <h1 className="text-3xl font-bold mt-5 mb-10">Makaleler</h1>

      <h4 style={play.style} className="text-lg font-semibold">
        Makale 1
      </h4>

      <p className={poppins.className}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt nihil
        ad architecto perferendis, id itaque consequuntur
      </p>

      <h4 className={`${play.className} mt-10 text-lg font-semibold`}>
        Makale 2
      </h4>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt nihil
        ad architecto perferendis, id itaque consequuntur
      </p>

      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"
        onReady={handleReady}
      />
    </div>
  );
};

export default Article;
