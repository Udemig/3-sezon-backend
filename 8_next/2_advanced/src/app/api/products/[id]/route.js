import { products } from "../../data";

export function GET(req, { params }) {
  const found = products.find((i) => i.id == params.id);

  if (found) {
    return Response.json({
      item: found,
    });
  }

  return Response.json("Aradığınız ürün bulunamadı");
}

export function DELETE(req, { params }) {
  const filtred = products.filter((i) => i.id != params.id);

  return Response.json({
    message: "Başarıyla silindi",
    data: filtred,
  });
}

export async function PATCH(req, { params }) {
  // isteğin body ksımındaki veriye eriş
  const body = await req.json();

  // id'sinde güncellenicek elemanın bütün diziki sırasını bul
  const index = products.findIndex((i) => i.id == params.id);

  // dizikdei elemanı günelle
  products[index].price = body.price;

  return Response.json({
    status: "Veri güncellendi",
    data: products,
  });
}
