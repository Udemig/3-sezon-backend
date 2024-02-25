import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReactSelect from 'react-select/creatable';
import { toast } from 'react-toastify';

const CreatePage = () => {
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // bütün inputlardaki verileri alıp nesne haline getir
    const formData = new FormData(e.target);
    let newRecipe = Object.fromEntries(formData.entries());

    // select alanlarındaki verileri dataya ekle
    newRecipe = {
      ...newRecipe,
      ingredients,
      instructions,
      image: `https://picsum.photos/4${Math.floor(Math.random() * 89) + 10}`,
    };

    // api isteği at veriyi kaydet
    axios
      .post('http://127.0.0.1:4000/api/recipes', newRecipe)
      // veriyi başarıyla eklenirse
      .then(() => {
        // bildirim gönder
        toast.success('Tarif Başarıyla Oluşturuldu');
        // ansayfyafaya yönlendir
        navigate('/');
      })
      .catch(() => toast.error('Tarif Oluşturma Başarısız'));
  };

  return (
    <div className="flex-1 bg-gray-200 p-4 h-screen overflow-auto">
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl m-auto my-20 flex flex-col gap-10"
      >
        <h1 className="text-3xl font-bold text-red-400">Yeni Tarif Oluştur</h1>

        <div className="flex flex-col gap-3">
          <label className="font-semibold">Tarif Başlığı</label>
          <input
            className="rounded-md p-2 focus:outline-red-400"
            name="recipeName"
            type="text"
            required
          />
        </div>

        <div className="flex flex-col gap-3">
          <label className="font-semibold">Tarif Kategorisi</label>
          <input
            className="rounded-md p-2 focus:outline-red-400"
            name="category"
            type="text"
            required
          />
        </div>

        <div className="flex flex-col gap-3">
          <label className="font-semibold">Tarif Süresi</label>
          <input
            className="rounded-md p-2 focus:outline-red-400"
            name="recipeTime"
            type="number"
            min={3}
            max={500}
            required
          />
        </div>

        <div className="flex flex-col gap-3">
          <label className="font-semibold">Malzemeler</label>
          <ReactSelect
            onChange={(options) => {
              const refined = options.map((opt) => opt.label);
              setIngredients(refined);
            }}
            isMulti
            required
          />
        </div>

        <div className="flex flex-col gap-3">
          <label className="font-semibold">
            Tarif Adımları (sırasına dikkat edin)
          </label>
          <ReactSelect
            onChange={(options) => {
              const refined = options.map((opt) => opt.label);
              setInstructions(refined);
            }}
            isMulti
            required
          />
        </div>

        <div className="flex flex-col gap-3">
          <label className="font-semibold">Sunum Önerisi</label>
          <textarea
            name="servingSuggestion"
            className="p-2 rounded-md min-h-[150px] max-h-[250px]"
            required
          ></textarea>
        </div>

        <div className="flex justify-end gap-6">
          <Link
            to={'/'}
            className="bg-gray-400 py-2 px-4 rounded-md text-white font-semibold text-lg hover:bg-gray-500 transition"
          >
            İptal
          </Link>
          <button
            type="submit"
            className="bg-red-400 py-2 px-4 rounded-md text-white font-semibold text-lg hover:bg-red-500 transition"
          >
            Oluştur
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePage;
