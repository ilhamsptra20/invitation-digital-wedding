"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function WelcomeSection({ onOpen }: { onOpen: () => void }) {
  const [guestName, setGuestName] = useState<string>("");
  const [place, setPlace] = useState<string>("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const to = params.get("to");
    const place = params.get("location");
    if (to) {
      setGuestName(decodeURIComponent(to));
    }
    if (place) {
      setPlace(decodeURIComponent(place));
    }
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="relative flex flex-col items-center justify-center h-screen bg-gradient-to-b from-sky-100 to-sky-300 text-center px-6 overflow-hidden"
    >
      {/* Dekorasi bunga */}
      <img
        src="/assets/images/tengah.png"
        alt="dekorasi"
        className="absolute top-1/2 left-1/2 w-[800px] -translate-x-1/2 -translate-y-1/2 opacity-25"
      />

      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="z-10"
      >
        <h2 className="text-xl md:text-2xl text-sky-800 font-light mb-2">
          Kepada Yth.
        </h2>
        <h1 className="text-3xl md:text-5xl font-serif text-sky-900 capitalize">
          {guestName || "Bapak/Ibu/Saudara/i"}
        </h1>
        <h2 className="text-xl md:text-3xl font-serif text-sky-900">
            {place ? `di ${place}` : ""}
        </h2>
        <p className="mt-3 text-gray-700 text-base italic">
          Kami mengundang Anda untuk hadir di hari bahagia kami
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpen}
          className="mt-8 bg-sky-700 text-white px-8 py-3 rounded-full shadow-md hover:bg-sky-800 transition-all duration-300"
        >
          Buka Undangan
        </motion.button>
      </motion.div>
    </motion.section>
  );
}
