import { Link, useNavigate } from 'react-router-dom';
import api from './../utils/api';

const Header = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  const navigate = useNavigate();

  const logout = () => {
    api.post('/auth/logout').then(() => {
      localStorage.removeItem('user');
      navigate('/');
    });
  };

  return (
    <header className="p-5 shadow">
      <div className="max-w-[1440px] mx-auto flex justify-between">
        <Link to={'/'}>
          <img className="w-[100px]" src="/fiverr.png" alt="logo" />
        </Link>

        <div className="flex items-center gap-2 group relative">
          {user ? (
            <>
              <img
                className="h-[40px] w-[40px] rounded-full object-cover"
                src={user.photo}
              />
              <span className="font-semibold">{user.username}</span>

              <div className="w-[110px] text-[13px] hidden group-hover:flex  flex-col absolute top-[40px] left-[0px] transition bg-gray-200 rounded-md">
                {user.isSeller && (
                  <>
                    <Link className="px-5 py-2 hover:bg-gray-100">
                      Hizmetler
                    </Link>
                    <Link className="px-5 py-2 hover:bg-gray-100">
                      Hizmet Ekle
                    </Link>
                  </>
                )}
                <Link className="px-5 py-2 hover:bg-gray-100">Siparişler</Link>
                <Link className="px-5 py-2 hover:bg-gray-100">Mesajlar</Link>
                <button
                  onClick={logout}
                  className="px-5 py-2 hover:bg-gray-100"
                >
                  Çıkış Yap
                </button>
              </div>
            </>
          ) : (
            <>
              <Link className="transition hover:text-green-500" to={'/login'}>
                Giriş Yap
              </Link>
              <Link
                className="border border-green-500 p-1 rounded transition hover:bg-green-500 hover:text-white"
                to={'/register'}
              >
                Kaydol
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
