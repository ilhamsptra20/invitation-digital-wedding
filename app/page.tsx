"use client";

import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";

export default function Page() {
  const [countdown, setCountdown] = useState<string>("");

  useEffect(() => {
    const targetDate = new Date("Dec 25, 2025 09:00:00").getTime();
    const timer = setInterval(() => {
      const now = Date.now();
      const diff = targetDate - now;
      if (diff <= 0) {
        setCountdown("Hari ini adalah hari bahagia!");
        clearInterval(timer);
      } else {
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);
        setCountdown(`${d}h ${h}j ${m}m ${s}d`);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Variants animasi reusable
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.9,
        ease: [0.25, 1, 0.5, 1],
      },
    },
  };

  return (
    <main className="text-[#333] bg-[#f0f9ff] overflow-x-hidden font-sans">
      {/* HERO */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={fadeInUp}
        className="relative h-screen text-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80')",
        }}
      >
        <div className="bg-gradient-to-b from-[rgba(0,0,40,0.35)] to-[rgba(0,0,80,0.6)] absolute inset-0"></div>
        <div className="relative z-10 flex flex-col justify-center items-center h-full px-4">
          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl text-white font-serif mb-4 tracking-wide"
          >
            Ilham & Aisyah
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="text-white text-lg md:text-2xl"
          >
            Dengan penuh cinta, kami akan melangsungkan pernikahan pada
          </motion.p>
          <motion.p
            variants={fadeInUp}
            transition={{ delay: 0.4 }}
            className="text-sky-100 text-xl md:text-3xl mt-3 italic"
          >
            25 Desember 2025
          </motion.p>
        </div>
      </motion.section>

      {/* COUPLE */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={fadeInUp}
        className="relative text-center py-24 bg-[#f9fafb] overflow-hidden"
      >
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] bg-repeat"></div>

        <img
          src="https://png.pngtree.com/png-clipart/20230512/original/pngtree-watercolor-flower-border-png-image_9146636.png"
          className="absolute top-0 left-0 w-52 opacity-25 rotate-[-8deg]"
          alt="flower-left"
        />
        <img
          src="https://png.pngtree.com/png-clipart/20230512/original/pngtree-watercolor-flower-border-png-image_9146636.png"
          className="absolute bottom-0 right-0 w-52 opacity-25 rotate-[8deg] scale-x-[-1]"
          alt="flower-right"
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-serif text-sky-900 mb-10 tracking-wide"
          >
            Pasangan Bahagia
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="text-gray-700 text-lg italic mb-14"
          >
            “Atas rahmat Allah SWT, kami mempersembahkan hari bersatunya dua
            hati.”
          </motion.p>

          <motion.div
            variants={fadeInUp}
            transition={{ delay: 0.4 }}
            className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-20"
          >
            <div className="text-center space-y-2">
              <h3 className="text-3xl md:text-4xl font-serif text-sky-900 tracking-wide">
                Muhamad Ilham Saputra
              </h3>
              <p className="text-gray-600 text-sm italic">
                Putra dari Bapak Saputra & Ibu Mariam
              </p>
            </div>

            <div className="relative flex flex-col items-center">
              <div className="w-px h-12 bg-sky-200"></div>
              <span className="text-5xl md:text-6xl text-sky-400 font-serif">
                &amp;
              </span>
              <div className="w-px h-12 bg-sky-200"></div>
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-3xl md:text-4xl font-serif text-sky-900 tracking-wide">
                Aisyah Zahra
              </h3>
              <p className="text-gray-600 text-sm italic">
                Putri dari Bapak Hidayat & Ibu Nuraini
              </p>
            </div>
          </motion.div>

          <motion.p
            variants={fadeInUp}
            transition={{ delay: 0.6 }}
            className="mt-16 text-gray-500 italic text-base md:text-lg"
          >
            “Bukan kebetulan, tapi jawaban dari doa yang lama dipanjatkan.”
          </motion.p>
        </div>
      </motion.section>

      {/* EVENT */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        variants={fadeInUp}
        className="bg-sky-50 text-center py-20 px-6"
      >
        <h2 className="text-3xl font-serif mb-8 text-sky-700">Detail & Acara</h2>
        <p className="text-gray-700 text-lg mb-2">
          Akad Nikah: <strong>09.00 WIB</strong>
        </p>
        <p className="text-gray-700 text-lg mb-2">
          Resepsi: <strong>11.00 WIB - Selesai</strong>
        </p>
        <p className="text-gray-700 mt-4 leading-relaxed">
          Bertempat di <br />
          <strong>Gedung Serbaguna Cendrawasih, Jakarta</strong>
        </p>
        <motion.a
          href="https://maps.google.com"
          target="_blank"
          rel="noopener noreferrer"
          variants={fadeInUp}
          transition={{ delay: 0.2 }}
          className="inline-block mt-8 bg-sky-600 text-white py-3 px-8 rounded-full shadow-lg hover:bg-sky-700 transition"
        >
          Lihat Lokasi
        </motion.a>
      </motion.section>

      {/* COUNTDOWN */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        variants={fadeInUp}
        className="text-center bg-[#e0f2fe] py-20"
      >
        <h2 className="text-3xl font-serif mb-8 text-sky-700">
          Menuju Hari Bahagia
        </h2>
        <div className="text-4xl font-semibold text-sky-800">{countdown}</div>
      </motion.section>

      {/* GIFT */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        variants={fadeInUp}
        className="bg-[#f0f9ff] text-center py-20"
      >
        <h2 className="text-3xl font-serif mb-8 text-sky-700">Hadiah Cinta</h2>
        <p className="text-gray-700 mb-6 max-w-md mx-auto">
          Bagi yang ingin berbagi kebahagiaan melalui tanda kasih, dapat
          mengirimkan ke rekening berikut:
        </p>
        <motion.div
          variants={fadeInUp}
          transition={{ delay: 0.3 }}
          className="bg-white shadow-md rounded-lg p-8 inline-block border border-sky-200"
        >
          <p className="font-semibold text-lg text-sky-900">
            Bank BCA - 1234567890
          </p>
          <p className="text-gray-600 mt-1">a.n Muhamad Ilham Saputra</p>
        </motion.div>
      </motion.section>

      {/* FOOTER */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        variants={fadeInUp}
        className="bg-gradient-to-b from-sky-600 to-sky-800 text-white text-center py-16"
      >
        <h2 className="text-2xl md:text-3xl font-serif mb-3">Terima Kasih</h2>
        <p className="text-lg font-light">Atas doa dan restu yang tulus 💙</p>
        <p className="text-sm mt-4 opacity-80">
          © 2025 Ilham & Aisyah Wedding
        </p>
      </motion.section>
    </main>
  );
}
