import { products } from "../data";

// Bu route.js', oluşturarak products isminde bir endpoint oluşturmuş olduk

export function GET() {
  return Response.json({ data: products });
}
