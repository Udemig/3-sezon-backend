import Link from "next/link";
import { FaHome, FaTicketAlt } from "react-icons/fa";

const Header = () => {
  return (
    <div className="bg-nav flex justify-between p-4">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <FaHome className="icon" />
        </Link>
        <Link href="/ticket-page/new">
          <FaTicketAlt className="icon" />
        </Link>
      </div>

      <div>
        <p className="text-default-text">Furkan</p>
      </div>
    </div>
  );
};

export default Header;
