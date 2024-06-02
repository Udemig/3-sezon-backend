import { NextResponse } from "next/server";
import Ticket from "../../(models)/Ticket";

type Params = {
  params: {
    id: string;
  };
};

export async function DELETE(req: Request, { params }: Params) {
  try {
    await Ticket.findByIdAndDelete(params.id);

    return NextResponse.json(
      {
        message: "Başarıyla Silindi",
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: "Silerken hata oluştu",
        err,
      },
      { status: 500 }
    );
  }
}

export async function GET(req: Request, { params }: Params) {
  try {
    const ticket = await Ticket.findById(params.id);

    return NextResponse.json({ ticket });
  } catch (err) {
    return NextResponse.json(
      {
        message: "Ticket verisi alınırken hata oldu",
        err,
      },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request, { params }: Params) {
  try {
    // isteğin body verisinde eriş
    const body = await req.json();

    // veritabanındaki ticket'ı güncelle
    const updated = await Ticket.findByIdAndUpdate(params.id, body);

    // client'a cevap gönder
    return NextResponse.json({ updated });
  } catch (err) {
    return NextResponse.json(
      { message: "Ticket güncellendirken bir hata oluştu", err },
      { status: 500 }
    );
  }
}
