export interface SolarPanelType {
  id: string;
  title: string;
  image: string;
  description: string;
  advantages: string[];
  applications?: string[];
  gradient: string;
}

export const solarPanelTypes: SolarPanelType[] = [
  {
    id: 'esnek',
    title: 'Esnek Güneş Panelleri',
    image: '/new-gunespaneli/esnek-gunes-paneli.jpg',
    description: 'Esnek güneş panelleri, bir ya da birden fazla ince film tabakasının plastik, metal, seramik ya da cam gibi yüzeylere entegre edilmesiyle üretilir. Bu yapıları sayesinde klasik panellere göre çok daha ince, hafif ve kıvrılabilir hale gelirler. Yüzeyleri cam yerine genellikle ETFE adlı özel bir polimerle kaplanır. Bu kaplama, hem koruma sağlar hem de panelin esnekliğini artırır.',
    advantages: [
      'Hafif ve Taşınabilir: Standart panellere göre yaklaşık %60 daha hafiftir. Taşıması ve kurulumu son derece pratiktir.',
      'Bükülebilir Yapı: 240 dereceye kadar esneyebilir, bu da eğimli veya kavisli yüzeylere kolayca uygulanmasını sağlar.',
      'Cam İçermez: Kırılma riski düşüktür, darbelere karşı daha dayanıklıdır.',
      'Kurulumu Kolay: Delme, vida veya ağır montaj elemanlarına ihtiyaç duymaz. Yapıştırarak bile uygulanabilir.'
    ],
    applications: [
      'Teknelerde ve Yatlarda: Tuzlu suya ve darbelere karşı dayanıklı yapısı sayesinde ideal çözümdür.',
      'Karavanlar ve Kamplar: Mobil yaşamda hafiflik ve taşınabilirlik ön planda olduğundan sıkça tercih edilir.',
      'Askeri ve Geçici Alanlar: Hızlı kurulum gerektiğinde, enerjiye ihtiyaç duyulan sahada kullanılır.',
      'Eğimli veya Kıvrımlı Yüzeyler: Çatısı düz olmayan yapılar için uygundur.'
    ],
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    id: 'halfcut',
    title: 'Yarım Kesim (Half-Cut) Güneş Panelleri',
    image: '/new-gunespaneli/half-cut solar panel.jpg',
    description: 'Yarım kesim güneş panelleri, standart güneş panellerinden farklı olarak her bir hücrenin ortadan ikiye kesilmesiyle oluşturulur. Yani bir paneldeki hücre sayısı iki katına çıkar, ancak bu hücreler daha küçüktür. Bu tasarım, panelin elektrik üretim şekli üzerinde önemli farklar yaratır.',
    advantages: [
      'Daha Az Enerji Kaybı: Küçük hücreler daha az elektrik akımı taşıdığı için ısı kaybı düşer. Bu da panelin verimini artırır.',
      'Gölgeye Karşı Daha Dayanıklı: Panelin sadece bir kısmı gölgede kaldığında, klasik panellere göre daha az performans kaybı yaşanır.',
      'Uzun Ömür ve Dayanıklılık: Düşük ısı üretimi sayesinde hücreler daha az zorlanır. Bu da panelin ömrünü uzatabilir.',
      'Daha Yüksek Verim: Aynı alanda, klasik panellere göre daha fazla enerji üretme potansiyeli vardır.'
    ],
    applications: [
      'Kısıtlı Çatı Alanları: Daha fazla verim istendiğinde ideal çözümdür.',
      'Gölgeleme Riski Olan Yerler: Ağaç, baca veya anten gibi engellerin olduğu çatılarda performans kaybını en aza indirir.',
      'Ticari ve Endüstriyel Projeler: Büyük alanlarda verimi maksimize etmek için kullanılır.',
      'Tarım Arazileri ve Seralar: Güneşten maksimum yararlanmak istenen yerlerde tercih edilir.'
    ],
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'monokristal',
    title: 'Monokristal Güneş Panelleri',
    image: '/new-gunespaneli/monokristal solar panel.jpg',
    description: 'Monokristal güneş panelleri, tek tip ve saf kristal yapıya sahip silikon hücrelerden üretilen panellerdir. Bu panellerin yüzeyi genellikle koyu siyah renkte olur ve hücreler arasındaki kenarlar net bir şekilde ayırt edilebilir. Uzun yıllardır güneş enerjisi alanında en yaygın ve verimli panel türlerinden biri olarak kullanılır.',
    advantages: [
      'Yüksek Verim: Aynı alan içinde diğer panel türlerine göre daha fazla enerji üretir. Bu da özellikle çatı alanı sınırlı olan yerlerde büyük avantaj sağlar.',
      'Uzun Ömürlü: Dayanıklı yapısı sayesinde 25 yıl ve üzeri performans sunabilir.',
      'Az Işıkta Bile Çalışabilir: Bulutlu havalarda ya da sabah-akşam saatlerinde bile enerji üretimini sürdürebilir.',
      'Estetik Görünüm: Düzgün ve siyah yüzeyi sayesinde çatılarda daha şık bir görünüm sağlar.'
    ],
    applications: [
      'Ev Çatılarında: Alan sınırlıysa ve maksimum verim isteniyorsa idealdir.',
      'Ticari Binalar ve İşletmeler: Yüksek enerji ihtiyacını karşılamak için uygundur.',
      'Tarım ve Sulama Sistemlerinde: Güneşten yüksek verim alınmak istenen tarımsal uygulamalarda kullanılır.',
      'Güneş Tarlalarında: Büyük ölçekli enerji üretim projelerinde tercih edilen panel türlerinden biridir.'
    ],
    gradient: 'from-gray-800 to-gray-600'
  },
  {
    id: 'polikristal',
    title: 'Polikristal Güneş Panelleri',
    image: '/new-gunespaneli/polikristal-gunes-paneli.jpg',
    description: 'Polikristal güneş panelleri, birden fazla silikon kristalinin bir araya gelmesiyle oluşturulan hücrelerden meydana gelir. Bu yapısı sayesinde üretimi daha kolay ve maliyeti daha düşüktür. Genellikle mavi tonlarda görünürler ve yüzeylerinde kristal parçacıkları belli belirsiz fark edilir.',
    advantages: [
      'Daha Ekonomik: Üretim süreci daha basit olduğu için, maliyet açısından monokristal panellere göre daha uygundur.',
      'Güvenilir Performans: Güneş ışığını verimli bir şekilde enerjiye çevirir ve uzun süreli kullanımda istikrarlı çalışır.',
      'Çevreye Duyarlı Üretim: Üretim aşamasında daha az atık malzeme oluşur.',
      'Geniş Kullanım Alanı: Farklı iklim koşullarında da sorunsuz çalışabilir.'
    ],
    applications: [
      'Müstakil Evlerde: Geniş çatıya sahip evlerde maliyet/verim dengesini sağlamak için uygundur.',
      'Çiftlikler ve Köy Evleri: Elektrik şebekesinin sınırlı olduğu kırsal alanlarda kullanışlıdır.',
      'Sanayi ve Tarım Alanlarında: Geniş alanlara kurulabilen projelerde ekonomik olması sayesinde öne çıkar.',
      'Küçük Ölçekli Projelerde: Sulama sistemleri, bahçe aydınlatmaları gibi yerlerde tercih edilir.'
    ],
    gradient: 'from-blue-600 to-indigo-600'
  },
  {
    id: 'solar-kiremit',
    title: 'Solar Kiremit',
    image: '/new-gunespaneli/kiremit-gunes-paneli.png',
    description: 'Solar kiremit, geleneksel çatı kiremitlerinin yerine geçebilen ve aynı zamanda güneş enerjisi üretebilen özel bir çatı kaplama malzemesidir. Görünüm olarak klasik kiremitlere benzese de içine yerleştirilen ince fotovoltaik hücreler sayesinde elektrik üretme özelliğine sahiptir. Böylece çatının hem estetik hem de işlevsel bir parçası haline gelir.',
    advantages: [
      'Estetik Görünüm: Dışarıdan bakıldığında geleneksel bir çatı gibi görünür. Güneş paneli görüntüsünü sevmeyenler için ideal bir çözümdür.',
      'İki İşlev Tek Malzemede: Hem çatı kaplaması işlevi görür hem de enerji üretir. Ayrı ayrı panel ve kiremit kullanmaya gerek kalmaz.',
      'Uzun Ömürlü ve Dayanıklı: Genellikle darbelere, UV ışınlarına ve hava koşullarına dayanıklı malzemelerden üretilir.',
      'Temiz Enerji Üretimi: Görünmez bir şekilde sürdürülebilir enerji sağlar, çevreye zarar vermez.'
    ],
    applications: [
      'Yeni Konut Projelerinde: Baştan çatı yapımı planlanan evlerde enerji üretimini çatıya entegre etmek isteyenler için uygundur.',
      'Tarihi Binalar ve Koruma Alanları: Görüntü bozulmadan enerji üretimi sağlanmak istenen yerlerde tercih edilir.',
      'Müstakil Evler: Görünümü bozmadan güneş enerjisinden faydalanmak isteyen ev sahipleri tarafından sıkça kullanılır.',
      'Tasarım Odaklı Yapılar: Modern mimaride estetik kaygıları olan yapılarda çözüm sunar.'
    ],
    gradient: 'from-orange-500 to-red-500'
  },
  {
    id: 'bifacial',
    title: 'Çift Yüzlü (Bifacial) Güneş Paneli',
    image: '/new-gunespaneli/cift-tarafli-gunes-paneli.png',
    description: 'Çift yüzlü (Bifacial) güneş panelleri, hem ön yüzeyinden hem de arka yüzeyinden güneş ışığını toplayarak elektrik üretebilen çift taraflı panellerdir. Geleneksel paneller sadece üst yüzeyden enerji üretirken, bifacial paneller yere yansıyan ışığı da kullanarak verimi artırır. Bu sayede aynı alanda daha fazla enerji elde etmek mümkündür.',
    advantages: [
      'İki Yüzeyden Enerji Üretimi: Arka yüzey, zeminden yansıyan ışığı da toplayarak ekstra üretim sağlar.',
      'Daha Yüksek Verim: Uygun kurulum koşullarında klasik panellere göre %10–30\'a kadar daha fazla enerji üretebilir.',
      'Uzun Ömür ve Dayanıklılık: Genellikle iki tarafı camla kaplı olarak üretilir, bu da yapıyı daha sağlam ve uzun ömürlü kılar.',
      'Düşük Bakım İhtiyacı: Cam kaplama kir tutmaz, kolay temizlenir ve daha az bakım gerektirir.'
    ],
    applications: [
      'Arazi Kurulumlarında: Yerden gelen yansımanın yüksek olduğu açık arazilerde daha verimli çalışır.',
      'Yükseltilmiş Sistemlerde: Panelin altının açık bırakıldığı zemin üstü sistemlerde verim artar.',
      'Karla Kaplı veya Açık Renkli Zeminlerde: Işık yansıması yüksek olduğu için çift taraflı üretim daha etkili olur.',
      'Ticari ve Endüstriyel Projelerde: Alanın daha verimli kullanılması gereken büyük ölçekli sistemlerde tercih edilir.'
    ],
    gradient: 'from-purple-500 to-pink-500'
  }
];
