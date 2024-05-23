import { delay } from "../(auth)/signup/page";

export const metadata = {
  title: "Profilinizi Görünteleyin",
};

const Profile = async () => {
  await delay();

  return (
    <div>
      <h1 className="text-4xl">Profil</h1>
    </div>
  );
};

export default Profile;
