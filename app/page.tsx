import PageWraper from "./PageWraper";

const couple = {
  man: {
    name: "dwi restu pamungkas",
    alias: "restu",
    father: "Mohamad Yunus",
    mother: "Uun Sumyati",
    order: 2,
  },
  woman: {
    name: "rina meiliana",
    alias: "rina",
    father: "marsin",
    mother: "nengsiah",
    order: 1,
  },
};

const detailWedding = {
  akad: {
    date: "11/02/2025",
    time: "09:00",
    place: "Aula Pak Topik RT02/08 Sindangrasa",
    location:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d247.69289339195632!2d106.83671514140538!3d-6.6362049456498555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c9007edede53%3A0xd1498cdfd198c7d9!2sAula%20Serbaguna%20Bapak%20Topik!5e0!3m2!1sen!2sid!4v1761575985870!5m2!1sen!2sid",
  },
  resepsi: {
    date: "11/02/2025",
    time: "11:00",
    place: "Aula Pak Topik RT02/08 Sindangrasa",
    location:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d247.69289339195632!2d106.83671514140538!3d-6.6362049456498555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c9007edede53%3A0xd1498cdfd198c7d9!2sAula%20Serbaguna%20Bapak%20Topik!5e0!3m2!1sen!2sid!4v1761575985870!5m2!1sen!2sid",
  },
};

// 🧠 Generate dynamic metadata
export const metadata = {
  title: `${couple.man.alias} & ${couple.woman.alias} Wedding`,
  description: `Undangan pernikahan ${couple.man.name} dan ${couple.woman.name}, akan dilangsungkan pada ${detailWedding.akad.date} pukul ${detailWedding.akad.time} di ${detailWedding.akad.place}. Kami menantikan kehadiran Anda.`,
  openGraph: {
    title: `${couple.man.alias} & ${couple.woman.alias} Wedding 💍`,
    description: `Dengan penuh cinta, kami akan melangsungkan pernikahan pada ${detailWedding.akad.date}.`,
    url: "https://restudanrina.vercel.app",
    siteName: `${couple.man.alias} & ${couple.woman.alias} Wedding`,
    images: [
      {
        url: "/assets/images/RR.png",
        width: 1200,
        height: 630,
        alt: `${couple.man.alias} & ${couple.woman.alias}`,
      },
    ],
    locale: "id_ID",
    type: "website",
  },
};

export default function Page() {
  return <PageWraper />;
}
