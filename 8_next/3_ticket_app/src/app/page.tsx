import Card from "./(components)/Card";
import { Ticket } from "./types";

type ResType = {
  tickets: Ticket[];
};

const getTickets = async (): Promise<ResType> => {
  const res = await fetch("http://localhost:3001/api/tickets", {
    cache: "no-store",
  });

  return res.json();
};

const Home = async () => {
  const { tickets } = await getTickets();

  const uniqueCategories = [
    ...new Set(tickets?.map(({ category }) => category)),
  ];

  return (
    <div className="p-5">
      {tickets &&
        uniqueCategories.map((category, key) => (
          <div className="mb-4" key={key}>
            <h2>{category}</h2>

            <div className="lg:grid grid-cols-2 xl:grid-cols-4">
              {tickets
                ?.filter((ticket) => ticket.category === category)
                ?.map((ticket, i) => (
                  <Card ticket={ticket} key={i} />
                ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Home;
