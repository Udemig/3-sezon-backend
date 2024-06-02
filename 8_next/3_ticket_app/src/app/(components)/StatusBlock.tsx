type Props = {
  status: string;
};

const StatusBlock = ({ status }: Props) => {
  const getColor = () => {
    switch (status.toLowerCase()) {
      case "bitti":
        return "green";

      case "başladı":
        return "orange";

      case "başlamadı":
        return "red";

      default:
        return "gray";
    }
  };

  return (
    <span
      style={{ background: getColor() }}
      className="inline-block rounded-full px-2 py-1 font-semibold text-xs"
    >
      {status}
    </span>
  );
};

export default StatusBlock;
