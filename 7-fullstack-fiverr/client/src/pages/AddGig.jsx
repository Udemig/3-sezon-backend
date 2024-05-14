import Input from '../components/Input';
import { inputs } from '../utils/constants';
import upload from '../utils/upload';

const AddGig = () => {
  const handleSubmit = async (e) => {
    // sayfayı yenilemeyi engelle
    e.preventDefault();

    // bütün inputlardaki veirlere eriş
    const formData = new FormData(e.target);
    const gigData = Object.fromEntries(formData.entries());
    gigData.images = e.target.images.files;

    // fotoğrafları bulut depolama alanına yükle
    const coverUrl = await upload(gigData.cover);
    const imageUrls = await Promise.all(
      [...gigData.images].map(async (file) => {
        return await upload(file);
      })
    );

    // fotoğrafların url'ini nesneye kaydet
    gigData.cover = coverUrl;
    gigData.images = imageUrls;

    // özellikler alnındaki metni "," göre diziye çevir

    // api'a veriyi kaydet

    // hizmet detay sayfasına yöneldnir

    // bildirim ver
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-x-10">
        {inputs.map((data) => (
          <Input {...data} />
        ))}

        <div>
          <label className='className="block mb-2 text-sm font-medium text-gray-900"'>
            Özellikler
          </label>
          <p>Lütfen özellikleri "," ile ayırınız</p>
          <textarea
            name="features"
            className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5  placeholder-gray-400 text-dark disabled:bg-gray-200  focus:border-blue-500 min-h-[200px] max-h-[400px]"
          />
        </div>

        <button className="my-10 bg-blue-500 p-2 font-bold text-white rounded hover:bg-blue-600">
          Hizemeti Yayınla
        </button>
      </form>
    </div>
  );
};

export default AddGig;
