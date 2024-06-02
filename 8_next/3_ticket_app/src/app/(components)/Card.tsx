import Link from "next/link";
import { Ticket } from "../types";
import DeleteBlock from "./DeleteBlock";
import PriorityBlock from "./PriorityBlock";
import ProgressBlock from "./ProgressBlock";
import StatusBlock from "./StatusBlock";

type CardProps = {
  ticket: Ticket;
};

const Card = ({ ticket }: CardProps) => {
  return (
    <div className="flex flex-col bg-card hover:bg-card-hover rounded-md shadow-lg p-3 m-2">
      <div className="flex mb-3">
        <PriorityBlock priority={ticket.priority} />

        <div className="ml-auto">
          <DeleteBlock id={ticket._id} />
        </div>
      </div>

      <Link href={`/ticket-page/${ticket._id}`}>
        <h4>{ticket.title}</h4>
        <hr className="h-px border-0 bg-page mb-2" />
        <p className="whitespace-pre-wrap">{ticket.description}</p>

        <div className="flex-grow"></div>

        <div className="flex mt-2">
          <div className="flex flex-col">
            <p className="text-sm my-1">{ticket.createdAt}</p>
            <ProgressBlock progress={ticket.progress} />
          </div>

          <div className="flex items-end ml-auto">
            <StatusBlock status={ticket.status} />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
