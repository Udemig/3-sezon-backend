export const toggler =
  "group peer ring-0 text-xs bg-rose-400  rounded-full outline-none duration-300 after:duration-300 w-16 h-6  shadow-md peer-checked:bg-emerald-500  peer-focus:outline-none  after:content-['✖️']  after:rounded-full after:absolute after:bg-gray-50 after:outline-none after:h-4 after:w-6 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-8 peer-checked:after:content-['✔️'] peer-hover:after:scale-95";

export const inputs = [
  {
    label: 'Başlık',
    name: 'title',
    isReq: true,
  },
  {
    label: 'Açıklama',
    name: 'desc',
    isReq: true,
  },
  {
    label: 'Kategori',
    name: 'category',
    isReq: true,
  },
  {
    label: 'Kapak Fotoğrafı',
    name: 'cover',
    type: 'file',
    isReq: true,
  },
  {
    label: 'Fotoğraflar',
    name: 'images',
    type: 'file',
    isMulti: true,
  },
  {
    label: 'Kısa Başlık',
    name: 'shortTitle',
    isReq: true,
  },
  {
    label: 'Kısa Açıklama',
    name: 'shortDesc',
    isReq: true,
  },
  {
    label: 'Revizyon hakkı',
    name: 'revisionNumber',
    type: 'number',
    isReq: true,
  },
  {
    label: 'Teslimat Süresi',
    name: 'deliveryTime',
    type: 'number',
    isReq: true,
  },
  {
    label: 'Fiyat',
    name: 'price',
    type: 'number',
    isReq: true,
  },
];
