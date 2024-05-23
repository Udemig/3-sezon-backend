import React from "react";
import { delay } from "../signup/page";

const Login = async () => {
  // api isteğinden sonra meydana gelebilecek bir hatayı simüle edelim

  // 3 saniye bekle
  await delay();

  // hata fırlat
  // throw new Error("Verileri alırken bir hata oluştu");

  return <div>Login</div>;
};

export default Login;
