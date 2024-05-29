import { getData } from "../utils";

// bu sayfadaki bütün api istekleri 3600 saniye boyunca cache'lensin zaman dolduğunda tekrar sayfa yenilenirse cache'deki verinin alınması yerine api'dan güncel veriler alınır
export const revalidate = 3600;

// Veri çekerken genelde async server component'ları kullanırız
const Home = async () => {
  const res = await getData();

  return (
    <div className="flex flex-col gap-4 p-5">
      {res.map((user) => (
        <h1>{user.name}</h1>
      ))}
    </div>
  );
};

export default Home;
