# Intercepting Routes (Önizlemeli Route)

- Bir sayaya yölendiren linke tıklandığında öncelikle bir modal açılır eğer modal açıkken sayfa yenilenirse bu sefer modal yerine sayfanın kendisine yönlendirilir.

- Bu özellik genelde ürün detay sayfalarında veya login/register sayfalarında kullanılır

# CSR vs SSR

- Client Side Rendering
- Server Side Rendering

- Client component kullanırsak render yöntemi CSR olur
- Server component kullanırsak render yöntemi SSR olur

- React uygularmalarında yani client componentlardan oluşturulan bir siteye girdiğimiz zaman `js kodu` ve `boş html dosyası` indiririz ve indirilen js kodu `kullanıcının cihazında` çalışır html dosyasını doldurur/oluşturur ekrana içerik gelir

- Next.js uygulamalarında yani server side rendering kullanılan sayfalarda, js kodu `sunucuda` çalışıp html'i oluştuturur client sadece html'i indirir ve içerik gelir.

- Bu noktada js'in bizim bilgisayaromızdan çok daha hızlı olan sunucuda çalışması say yüklenme süresini hızlandırır.

- SEO açısından dolu html indirmek önemlidir aksi takdirde google'ın robotları site içeriğini tanıyamaz ve sitenen daha üst sıralarda olmasının önüne geçer

## NOT

- Next.js biz aksini belirtmedikçe bütün bileşenleri server compnent olarak tanımlar. Next.js bizden her zman olabildiğince server component kullanmamızı ister (yaptıkları optimizsyon, cache mekanizması,seo)

# Data Fetching

- Next.js çekilen veriyi belirli bir süre cache'de tutuar ve veriyi çeken fonksiyonu os süre içersinde çağırdrığımızda api'da veriyi almak yerine önceki istek sonucunda elde edilen ve cache 'de tutulan veriyi biz getirir.

- Bu yüzden çektiğimiz veriyi bir kaç farklı sayfa veya bileşende kullanmak istiyorsak tek yapmamız gerken veri çeken fonksiyonu o bileşenlerde çapırmak gerisini next.js halleder.

- Varsayılan olarak bütün api isteklerinden gelene cevaplar cache'de tutulur. Ama çektiğimiz veriye göre bunu değiştirmek isteyebiliriz. Örn: Bir alışveriş sitesinin sepet sayfasına her geridğmizde güncel ürünleri almasnı sosyal medya uygulamasında sayfa her yenilendiğinde güncel gönderileri almasını veya bekleriz ama bir blog sitesinde blog detay sayfası her saniye değişmeyeceği için bursda her sayfa yenilendiğinde tekrar api isteği atılmasına gerek yoktur.

- Bu durumda "no-store" kullanırız

- Revalidataion: Nex.js bazı sayfları statik olarak build sırasında oluşturup kullanıcı bu sayfaya girdiğinde yeniden sayfayı oluşturmak yerine daha önceden oluşturlan sayfayı kullanıcya sunar. Sayfa statik bile olsa belirli aralıkla güncellenmesini isteyebiliriz.

# Image Component

- İçerisnde bir çok optimizasyon barındıran bir resim componentıdır.

- Sahip olduğu performasn artıları seo açısından da önemlidir

# Font

- Optimize edilmiş google fonts desteği sunuyor

# Script

- Prjoye js kodu çağırıken farklı stratejiler kullanmamıza olanak sağlar

# Next js Functions

## Redirect Function

- sadece server comp çalışır.
- kullanıcyı farklı bir sayfaya yönlendir
- yetkilendirme aşamasında kullanıcı o sayfya girip giremeyeceğini belirlerken kullanırız

## useRouter hook

- Sadece client comp. çalışır.
- fonksiyon içerisnde yönlendirmeyi sağlar

## useSearchParams hook

- sadece client comp. çalışır
- URL'deki arama parametrlerine erişmemizi sağlar

## usePathname Hook

- sadece client comp. çalışır
- kullanıcn bulunduğu yolu almaya yarar
- genelde aktif link oluşturulurken kullanılır

# Next.js ile API

- API oluşturmak için app içerisnde bir /api klasörü oluştururuz
- bu nun içerisne her bir endpoint için bir klasör açarız ve klasör içerisne route.js dosyası oluşturur
