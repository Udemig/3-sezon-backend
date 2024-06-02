import { FaFire } from "react-icons/fa";

type Props = {
  priority: number;
};

const PriorityBlock = ({ priority }: Props) => {
  return (
    <div className="flex justify-start align-baseline">
      <FaFire
        className="pr-1"
        style={{ color: priority > 0 ? "#FF5C5C" : "#C5C5C5" }}
      />
      <FaFire
        className="pr-1"
        style={{ color: priority > 1 ? "#FF5C5C" : "#C5C5C5" }}
      />
      <FaFire
        className="pr-1"
        style={{ color: priority > 2 ? "#FF5C5C" : "#C5C5C5" }}
      />
      <FaFire
        className="pr-1"
        style={{ color: priority > 3 ? "#FF5C5C" : "#C5C5C5" }}
      />
      <FaFire
        className="pßr-1"
        style={{ color: priority > 4 ? "#FF5C5C" : "#C5C5C5" }}
      />
    </div>
  );
};

export default PriorityBlock;
