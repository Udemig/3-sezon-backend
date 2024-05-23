import { delay } from "@/app/(auth)/signup/page";

const Users = async () => {
  await delay(6000);
  
  return <div>Kullanıcılar</div>;
};

export default Users;
