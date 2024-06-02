"use client";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { Ticket } from "../types";

type Props = {
  updatedItem: Ticket | null;
};

const Form = ({ updatedItem }: Props) => {
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // formData örneği al
    const formData = new FormData(e.target as HTMLFormElement);

    // inputlardaki veirleri bir nesneye aktardık
    const ticketData = Object.fromEntries(formData.entries());

    if (updatedItem) {
      // api'a güncelleme isteği at
      const res = await fetch(`/api/tickets/${updatedItem._id}`, {
        method: "PUT",
        body: JSON.stringify(ticketData),
        headers: {
          "content-type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Ticket'ı güncellerken hata meydana geldi");
      }
    } else {
      // api'a ekleme isteği at
      const res = await fetch("/api/tickets", {
        method: "POST",
        body: JSON.stringify(ticketData),
        headers: {
          "content-type": "application/json",
        },
      });

      // istek başarısız olursa hata gönder
      if (!res.ok) {
        throw new Error("Ticket oluşturulurken hata meydana geldi");
      }
    }

    // başarılı olursa:

    // anasayfaya yönlendir
    router.push("/");

    // sayfayı yenile
    router.refresh();
  };

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 w-3/4 md:1/2 my-4"
      >
        <h3>{updatedItem ? "Ticket'ı Güncelle" : "Ticket Oluştur"}</h3>

        <label>Başlık</label>
        <input
          defaultValue={updatedItem?.title}
          type="text"
          name="title"
          required
        />

        <label>Açıklama</label>
        <textarea
          defaultValue={updatedItem?.description}
          name="description"
          required
        />

        <label>Kategori</label>
        <select defaultValue={updatedItem?.category} name="category" required>
          <option>Yazılım Sorunu</option>
          <option>Donanım Sorunu</option>
          <option>Bağlantı Sorunu</option>
        </select>

        <label>Öncelik</label>
        <div>
          <input
            id="1"
            value={1}
            type="radio"
            name="priority"
            defaultChecked={updatedItem?.priority === 1}
          />
          <label htmlFor="1">1</label>

          <input
            id="2"
            value={2}
            type="radio"
            name="priority"
            defaultChecked={updatedItem?.priority === 2}
          />
          <label htmlFor="2">2</label>

          <input
            id="3"
            value={3}
            type="radio"
            name="priority"
            defaultChecked={updatedItem?.priority === 3}
          />
          <label htmlFor="3">3</label>

          <input
            id="4"
            value={4}
            type="radio"
            name="priority"
            defaultChecked={updatedItem?.priority === 4}
          />
          <label htmlFor="4">4</label>

          <input
            id="5"
            value={5}
            type="radio"
            name="priority"
            defaultChecked={updatedItem?.priority === 5}
          />
          <label htmlFor="5">5</label>
        </div>

        <label>İlerleme</label>
        <input
          type="range"
          name="progress"
          min={0}
          max={100}
          defaultValue={updatedItem?.progress}
        />

        <label>Durum</label>
        <select defaultValue={updatedItem?.status} name="status" required>
          <option>Başlamadı</option>
          <option>Başladı</option>
          <option>Bitti</option>
        </select>

        <button className="btn mt-5">
          {updatedItem ? "Ticket güncelle" : "Ticket Oluştur"}
        </button>
      </form>
    </div>
  );
};

export default Form;
