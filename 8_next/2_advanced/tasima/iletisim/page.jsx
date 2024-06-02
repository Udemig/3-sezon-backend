import { redirect } from "next/navigation";
import Input from "../components/input";

const Iletisim = () => {
  // kullanıcyı koşula göre ynlendirme
  if (true) {
    redirect("/home");
  }

  console.log("İletişişm Sayfası Render Oldu");

  return (
    <h1 className="text-center my-10 text-4xl">
      Iletisim Sayfası
      <p>Bu sayfa üzerinden biszimle iletişime geçebilirsiniz</p>
      <Input />
    </h1>
  );
};

export default Iletisim;
