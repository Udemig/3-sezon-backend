import { NextResponse } from "next/server";

// Her bir endpoint için bir route.js tanımlamalıyız
// Şuan api klasörü içerisnde route.js oluşturduğumuz için http://localhost:3000/api adresine yapılcak olan http isteklerinde bu dosya devreye girer

// Route Handler
// Yapılan http isteğini ele alan ve client'a cevap gönderen fonksiyonlar
// Bu fonksiyonları tanımlarken http methodlarının isimleriyle tnaımlarız ve her bir route.js de aynı isimden tek bir method olaiblir

export function GET() {
  return NextResponse.json({
    text: "Backendden selam",
  });
}
