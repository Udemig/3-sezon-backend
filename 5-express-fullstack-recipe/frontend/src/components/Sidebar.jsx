import { NavLink } from 'react-router-dom';
import { IoHomeOutline } from 'react-icons/io5';
import { FaRegCompass } from 'react-icons/fa';
import { CiHeart } from 'react-icons/ci';
import { CiSettings } from 'react-icons/ci';
import { IoCreateOutline } from 'react-icons/io5';

const Sidebar = () => {
  return (
    <div className="flex flex-col h-screen justify-between items-center p-3 max-md:p-2 max-md:justify-normal max-md:gap-20 lg:p-10">
      <img className="w-[150px] max-md:w-[90px]" src="/recipe_logo.jpg" />

      <div className="flex flex-col gap-20">
        <NavLink
          to={'/'}
          className="flex gap-4 items-center text-lg text-gray-400"
        >
          <IoHomeOutline className="max-md:text-2xl" />
          <span className="max-md:hidden">Anasayfa</span>
        </NavLink>

        <NavLink
          to={'/ekle'}
          className="flex gap-4 items-center text-lg text-gray-400"
        >
          <IoCreateOutline className="max-md:text-2xl" />
          <span className="max-md:hidden">Oluştur</span>
        </NavLink>

        <NavLink
          to={'/discover'}
          className="flex gap-4 items-center text-lg text-gray-400"
        >
          <FaRegCompass className="max-md:text-2xl" />
          <span className="max-md:hidden">Keşfet</span>
        </NavLink>

        <NavLink
          to={'/likes'}
          className="flex gap-4 items-center text-lg text-gray-400"
        >
          <CiHeart className="max-md:text-2xl" />
          <span className="max-md:hidden">Favoriler</span>
        </NavLink>

        <NavLink
          to={'/settings'}
          className="flex gap-4 items-center text-lg text-gray-400"
        >
          <CiSettings className="max-md:text-2xl" />
          <span className="max-md:hidden">Yardım</span>
        </NavLink>
      </div>

      <div className="flex flex-col gap-2 max-md:hidden">
        <p className="font-semibold">Günlük haberleri al</p>
        <button className="bg-red-500 p-2 rounded-lg text-white hover:bg-red-400">
          Abone Ol
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
