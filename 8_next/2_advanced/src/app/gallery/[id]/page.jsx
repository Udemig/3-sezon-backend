import Image from "next/image";
import { data } from "../constants";

const Detail = ({ params }) => {
  // urldeki id'ye karşılık gelen dizi elemanın al
  const item = data.find((i) => i.id === params.id);

  return (
    <div className="container mx-auto my-10">
      <div className="w-1/2 mx-auto">
        <div>
          <h1 className="text-center text-3xl font-bold my-4">{item.name}</h1>
        </div>

        <Image
          src={item.src}
          alt={item.name}
          className="w-full object-cover aspect-square rounded-md"
        />

        <div className="bg-white p-4 my-4 text-black rounded-md">
          <h3>
            Fotoğrafçı: <span className="font-bold">{item.photographer}</span>
          </h3>
          <h3>
            Lokasyon: <span className="font-bold">{item.location}</span>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Detail;
