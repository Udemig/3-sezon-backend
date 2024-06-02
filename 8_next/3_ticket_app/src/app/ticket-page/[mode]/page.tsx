import Form from "@/app/(components)/Form";
import { Ticket } from "@/app/types";

type TicketPageProps = {
  params: {
    mode: string;
  };
};

type ResType = {
  ticket: Ticket;
};

const getTicketById = async (id: string): Promise<ResType> => {
  const res = await fetch(`http://localhost:3001/api/tickets/${id}`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Verileri alırken sorun oluştu");
  }

  return res.json();
};

const TicketPage = async ({ params }: TicketPageProps) => {
  // parametreye göre hangi modda olucağına karar ver
  const editMode = params.mode === "new" ? false : true;
  let updatedItem = null;

  if (editMode) {
    // url'deki id'ye göre ticket verilerinial
    const data = await getTicketById(params.mode);
    updatedItem = data.ticket;
  }

  return (
    <div>
      <Form updatedItem={updatedItem} />
    </div>
  );
};

export default TicketPage;
