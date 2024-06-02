import { NextResponse } from "next/server";

// next.js varsayılan olarak oluşturduğumuz route'larda cache devreye sokar
// belirli bir süre içerisnde attığımız bütün isteklerde yeni cevap oluşturmak yeine ilk isteğe gönderilen cevabı hafızada tutar ve gönderir

// bu durum bir çok yerde bizim için avantaj olsada bazen örn mesajalaşma veya verinni sıkça değiştiği uygulamalarda bu özelliği kullanmak istemeyiz
export const dynamic = "force-dynamic";

export async function GET(req, res) {
  return NextResponse.json({
    message: "Backennde gelen cevap",
    time: new Date().toLocaleTimeString(),
  });
}
