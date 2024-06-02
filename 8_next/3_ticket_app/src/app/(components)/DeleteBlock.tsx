"use client";

import { useRouter } from "next/navigation";
import { FaTrash } from "react-icons/fa";

type Props = {
  id: string;
};

const DeleteBlock = ({ id }: Props) => {
  const router = useRouter();

  const handleDelete = async () => {
    const res = await fetch(`/api/tickets/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.refresh();
    }
  };

  return (
    <FaTrash
      onClick={handleDelete}
      className="cursor-pointer hover:text-red-500"
    />
  );
};

export default DeleteBlock;
