import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="p-5 shadow">
      <div className="max-w-[1440px] mx-auto flex justify-between">
        <Link to={'/'}>
          <img className="w-[100px]" src="/fiverr.png" alt="logo" />
        </Link>

        <div className="flex items-center gap-2">
          <Link className="transition hover:text-green-500" to={'/login'}>
            Giriş Yap
          </Link>
          <Link
            className="border border-green-500 p-1 rounded transition hover:bg-green-500 hover:text-white"
            to={'/register'}
          >
            Kaydol
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
