import { delay } from "@/app/(auth)/signup/page";

const Notifications = async () => {
  await delay(4000);

  return <div>Bildirimler</div>;
};

export default Notifications;
