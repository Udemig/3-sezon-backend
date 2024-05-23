"use client";

const Error = ({ error, reset }) => {
  return (
    <div className="bg-red-500 p-4 rounded-md  text-base h-fit flex flex-col gap-5">
      <h1>Üzgünüz bir hata oluştu</h1>
      <hr />

      <p>{error.message}</p>
      <hr />

      <button onClick={reset}>Tekrar Dene</button>
    </div>
  );
};

export default Error;
