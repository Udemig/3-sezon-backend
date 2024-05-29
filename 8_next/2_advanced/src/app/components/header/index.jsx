import { getData } from "@/app/utils";

// Next.js yapılan api isteğinden sonra biz aksini belirtmedikçe aldığı cevabı cache'ler ver yapılacak ilerik isteklerde api'a gitmek yerine daha önceden aldığı cevabı bize iletir. Bundan dolayı örneğin kullanıcı verilerini çeken bu fonksiyonu kullancı verisini istediğimiz her bileşenden çağırabiliriz. 100 bileşende bile çağırsak nextjs arkaplanda tek bir api isteği atıcak
const Header = async () => {
  const res = await getData();

  return (
    <header className="flex justify-between p-5">
      <h1>Next.js</h1>
      <p>Aktif Kullanıcı: {res.length}</p>
    </header>
  );
};

export default Header;
