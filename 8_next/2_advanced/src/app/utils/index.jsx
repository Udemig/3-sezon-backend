// Veri çeken fonksiyon
export const getData = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    cache: "default",
    next: { revalidate: 50 },
  });

  return res.json();
};
