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

export function POST(req, res) {
  return Response.json({ status: "POST Başarılı" });
}

export function PUT(req, res) {
  return Response.json({ status: "PUT Başarılı" });
}

export function PATCH(req, res) {
  return Response.json({ status: "PATCH Başarılı" });
}

export function DELETE(req, res) {
  return Response.json({ status: "DELETE Başarılı" });
}
