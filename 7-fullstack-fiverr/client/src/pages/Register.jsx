import Input from '../components/Input';
import { toggler } from '../utils/constants';

const Register = () => {
  return (
    <div>
      <form className="max-w-sm mx-auto">
        <Input label="İsim" isReq={true} />
        <Input label="Mail" isReq={true} />
        <Input label="Ülke" isReq={true} />
        <Input label="Şifre" type="password" isReq={true} />

        <div>
          <p>Satıcı Olmak İstiyorum</p>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className={toggler}></div>
          </label>
        </div>

        <Input label="Telefon" type={'number'} />
        <Input label="Açıklama" />

        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
