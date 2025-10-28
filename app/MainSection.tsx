"use client";

import { useEffect, useRef, useState} from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

interface Message {
  id: number;
  name: string;
  message: string;
  created_at: string;
}

export default function MainSection ({ isOpen }: { isOpen: boolean })  {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    useEffect(() => {
        // siapkan audio
        if (!audioRef.current) {
        audioRef.current = new Audio("/assets/audio/music.mp3");
        audioRef.current.loop = true;
        audioRef.current.volume = 0; // start dari 0 biar halus
        }

        if (isOpen) {
        const audio = audioRef.current;
        const playMusic = async () => {
            try {
            await audio!.play();

            // fade in suaranya biar smooth
            let vol = 0;
            const fade = setInterval(() => {
                if (vol < 1) {
                vol += 0.05;
                audio!.volume = Math.min(vol, 1);
                } else {
                clearInterval(fade);
                }
            }, 200);
            } catch (err) {
            console.log("Autoplay gagal (browser block), nunggu interaksi user.");
            }
        };

        playMusic();
        } else {
        // kalo ditutup, fade out + pause
        const audio = audioRef.current;
        if (audio) {
            let vol = audio.volume;
            const fadeOut = setInterval(() => {
            if (vol > 0) {
                vol -= 0.05;
                audio.volume = Math.max(vol, 0);
            } else {
                clearInterval(fadeOut);
                audio.pause();
            }
            }, 100);
        }
        }
    }, [isOpen]);

    const [countdown, setCountdown] = useState<string>("");
    const [images, setImages] = useState<string[]>([]);

    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");

    const imageCouple = [
        "IMG_20251025_145040.jpg",
        "IMG_20251025_150315.jpg",
        "IMG_20251025_152053.jpg",
        "IMG_20251025_152419.jpg",
        "IMG_20251025_155210.jpg",
        "IMG_20251025_155236.jpg",
        "IMG_20251025_161237.jpg",
        "IMG_20251025_161411_1.jpg",
        "IMG_20251025_161411.jpg",
        "IMG_20251025_161412.jpg",
    ]

    const [randomImage, setRandomImage] = useState<string | null>(null);

    // Generate random image hanya di client
    useEffect(() => {
        const index = Math.floor(Math.random() * imageCouple.length);
        setRandomImage(`/assets/images/couple/${imageCouple[index]}`);
    }, []);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
        const res = await fetch("/api/messages");
        const data = await res.json();
        setMessages(data);
        } catch (err) {
        console.error("Fetch error:", err);
        }
    };

    // 🔹 Kirim ucapan baru
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !message) {
        setStatus("Nama & pesan wajib diisi!");
        return;
        }

        setLoading(true);
        setStatus("");

        const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message }),
        });

        const data = await res.json();
        if (data.success) {
        setStatus("✅ Ucapan tersimpan!");
        setName("");
        setMessage("");
        fetchMessages(); // refresh list
        } else {
        setStatus("❌ Gagal menyimpan ucapan. " + data.message);
        }

        setLoading(false);
    };

    const couple = {
        man : {
        name: "dwi restu pamungkas",
        alias: "restu",
        father: "Muhamad Yunus",
        mother: "Uun Sumyati",
        order: 2,
        },
        woman : {
        name: "rina meiliana",
        alias: "rina",
        father: "marsin",
        mother: "nengsiah",
        order: 1
        }
    }

    const detailWedding = {
        akad : {
        date: "11/02/2025",
        time: "09:00",
        place: "Aula Pak Topik RT02/08 Sindangrasa",
        location: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d247.69289339195632!2d106.83671514140538!3d-6.6362049456498555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c9007edede53%3A0xd1498cdfd198c7d9!2sAula%20Serbaguna%20Bapak%20Topik!5e0!3m2!1sen!2sid!4v1761575985870!5m2!1sen!2sid" 
        },
        resepsi : {
        date: "11/02/2025",
        time: "11:00",
        place: "Aula Pak Topik RT02/08 Sindangrasa",
        location: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d247.69289339195632!2d106.83671514140538!3d-6.6362049456498555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c9007edede53%3A0xd1498cdfd198c7d9!2sAula%20Serbaguna%20Bapak%20Topik!5e0!3m2!1sen!2sid!4v1761575985870!5m2!1sen!2sid" 
        }
    }

    const rekening = [
        {
        bank: "BCA",
        noRek: "4270429802",
        aN: "Dwi Restu Pamungkas"
        },
        {
        bank: "BCA",
        noRek: "6820994548",
        aN: "Rina Meiliana"
        }
    ]

    useEffect(() => {
        const targetDate = new Date(detailWedding.akad.date).getTime();
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
        <main className="text-[#333] bg-[#f0f9ff] overflow-hidden font-sans">
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
                {couple.man.alias} & {couple.woman.alias}
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
                {new Date(detailWedding.akad.date).toLocaleDateString("id-ID", {weekday: "long",day: "numeric",month: "long",year: "numeric",})}
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

            <Image
            src="/assets/images/kiri_atas.png"
            width={200}
            height={200}
            className="absolute top-0 left-0 w-52 opacity-25 rotate-[-8deg]"
            alt="flower-left"
            />
            <Image
            src="/assets/images/kanan.png"
            width={200}
            height={200}
            className="absolute bottom-0 right-0 w-52 opacity-25 rotate-[-90deg] scale-x-[-1]"
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
                <h3 className="text-3xl md:text-4xl font-serif text-sky-900 tracking-wide capitalize">
                    {couple.man.name}
                </h3>
                <p className="text-gray-600 text-sm italic">
                    Putra ke <span className="capitalize">{couple.man.order}</span> dari Bapak <span className="capitalize">{couple.man.father}</span> & Ibu <span className="capitalize">{couple.man.mother}</span>
                </p>
                </div>

                <div className="relative flex flex-col items-center">
                <div className="w-px h-8 bg-sky-200"></div>
                <span className="text-5xl md:text-6xl text-sky-400 font-serif">
                    &amp;
                </span>
                <div className="w-px h-8 bg-sky-200"></div>
                </div>

                <div className="text-center space-y-2">
                <h3 className="text-3xl md:text-4xl font-serif text-sky-900 tracking-wide capitalize">
                    {couple.woman.name}
                </h3>
                <p className="text-gray-600 text-sm italic">
                    Putri ke <span className="capitalize">{couple.woman.order}</span> dari Bapak <span className="capitalize">{couple.woman.father}</span> & Ibu <span className="capitalize">{couple.woman.mother}</span>
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
            viewport={{ once: true }}
            variants={fadeInUp}
            className="bg-sky-50 text-center py-20 px-6"
        >
            <Image
            src="/assets/images/tengah_panjang.png"
            width={200}
            height={400}
            className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10"
            alt="flower-left"
            />
            <h2 className="text-3xl font-serif mb-8 text-sky-700">Detail & Acara</h2>
            <p className="text-gray-700 text-lg mb-2">
                Akad Nikah: {new Date(detailWedding.akad.date).toLocaleDateString("id-ID", {weekday: "long",day: "numeric",month: "long",year: "numeric",})}
                <strong> {detailWedding.akad.time} WIB</strong>
            </p>
            <p className="text-gray-700 text-lg mb-2">
            Resepsi: <strong>{detailWedding.resepsi.time} WIB - Selesai</strong>
            </p>
            <p className="text-gray-700 mt-4 leading-relaxed">
            Bertempat di <br />
            <strong>{detailWedding.akad.place}</strong>
            </p>

            <div className="relative w-full pb-[56.25%] mt-8 overflow-hidden rounded-xl shadow-md">
            <iframe
                src={detailWedding.akad.location}
                className="absolute top-0 left-0 w-full h-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            </div>
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
            <Image
            src="/assets/images/tengah.png"
            width={1200}
            height={600}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-25"
            alt="flower-left"
            />
            <div className="text-4xl font-semibold text-sky-800">{countdown}</div>
        </motion.section>

        {/* GALLERY */}
        <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            variants={fadeInUp}
            className="relative bg-[#f0f9ff] text-center py-20 px-6 overflow-hidden"
        >
            {/* Dekor bunga di sisi kiri */}
            <img
            src="/assets/images/kiri_bawah.png"
            alt="Bunga dekor kiri"
            className="absolute bottom-[-110] right-0 -translate-y-1/2 w-52 opacity-65 rotate-[-10deg] z-10"
            />

            {/* Konten utama */}
            <div className="relative">
            <div className="w-60 h-84 bg-gray-300 rounded-t-full rounded-b-lg overflow-hidden border border-8 border-sky-200 mx-auto">
                <img
                src={randomImage ?? "/assets/images/couple/IMG_20251025_145040.jpg"}
                alt="Gallery"
                className="w-full h-full object-cover"
                />
            </div>
            </div>
        </motion.section>

        {/* GIFT SECTION — versi elegan */}
        <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            variants={fadeInUp}
            className="relative bg-[#e0f2fe] text-center py-24 overflow-hidden"
        >
            <div className="relative">
            {/* Heading */}
            <h2 className="text-3xl md:text-4xl font-serif mb-6 text-sky-800 tracking-wide">
                Kasih Sayang Tak Terucap
            </h2>
            <p className="text-gray-700 mb-10 px-6 max-w-lg mx-auto leading-relaxed">
                Bagi yang ingin berbagi kebahagiaan melalui tanda kasih, dapat
                mengirimkan ke rekening berikut:
            </p>
            <Image
                src="/assets/images/tengah.png"
                width={1200}
                height={600}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-25"
                alt="flower-left"
            />
            </div>

            {/* Card rekening */}
            {rekening.map((rekening, index) => (
            <motion.div
                key={index}
                variants={fadeInUp}
                transition={{ delay: 0.3 }}
                className="relative mb-2 bg-white/80 backdrop-blur-sm shadow-lg border border-sky-100 rounded-2xl p-8 inline-block mx-auto hover:shadow-xl transition-all duration-500"
            >
                {/* Frame gold tipis */}
                <div className="absolute inset-0 rounded-2xl border-[1.5px] border-[#d4af37] pointer-events-none"></div>

                <p className="font-semibold text-xl text-sky-900">
                Bank {rekening.bank} — <span className="tracking-widest">{rekening.noRek}</span>
                </p>
                <p className="text-gray-600 mt-1 italic">a.n {rekening.aN}</p>
            </motion.div>
            ))}
            

            {/* Footer note */}
            <p className="mt-10 text-sm text-gray-500 italic">
            “Doa dan kehadiran Anda sudah merupakan hadiah terindah bagi kami.”
            </p>
        </motion.section>

        {/* UCAPAN SECTION */}
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start py-10 px-4">
            <h2 className="text-3xl md:text-4xl font-serif mb-10 text-sky-800 tracking-wide text-center">
                💌 Ucapan dari Teman & Keluarga
            </h2>

            {/* 🎞️ Marquee Infinite Scroll */}
            <div className="w-full max-w-6xl overflow-hidden mb-10 relative">
                <div className="flex gap-4 animate-marquee">
                    {[...messages, ...messages, ...messages].map((msg, i) => (
                    <div
                        key={i}
                        className="min-w-[280px] bg-white/90 border border-sky-100 rounded-2xl shadow-sm p-4 flex-shrink-0 hover:shadow-md transition-all"
                    >
                        <p className="font-semibold text-sky-700 mb-1">{msg.name}</p>
                        <p className="text-gray-700 whitespace-pre-line leading-relaxed mb-2">
                        {msg.message}
                        </p>
                        <p className="text-xs text-gray-400">
                        {new Date(msg.created_at).toLocaleString("id-ID", {
                            dateStyle: "medium",
                            timeStyle: "short",
                        })}
                        </p>
                    </div>
                    ))}
                </div>
            </div>
        <style jsx>{`
                @keyframes marquee {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-100%);
                    }
                }
                .animate-marquee {
                    display: flex;
                    width: calc(280px * ${messages.length * 3}); /* Total width dinamis */
                    animation: marquee 60s linear infinite;
                }
            `}</style>
            
            {/* ✍️ Form Ucapan */}
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md flex flex-col items-stretch space-y-3"
            >
                <h2 className="text-lg font-semibold text-sky-800 mb-1 text-center">
                Tulis Ucapan Kamu ✍️
                </h2>
                <input
                type="text"
                placeholder="Nama kamu"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-b border-gray-300 bg-transparent p-2 focus:outline-none focus:border-sky-500 transition"
                />
                <textarea
                placeholder="Tulis ucapan di sini..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="border-b border-gray-300 bg-transparent p-2 h-24 resize-none focus:outline-none focus:border-sky-500 transition"
                />
                <button
                type="submit"
                disabled={loading}
                className="bg-sky-700 text-white py-2 rounded-md hover:bg-sky-800 transition disabled:opacity-50"
                >
                {loading ? "Mengirim..." : "Kirim Ucapan"}
                </button>
                {status && (
                <p className="text-sm text-gray-600 mt-1 text-center">{status}</p>
                )}
            </form>
            </div>




        {/* FOOTER */}
        <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            variants={fadeInUp}
            className="bg-gradient-to-b from-sky-600 to-sky-800 text-white text-center py-5"
        >
            <h2 className="text-2xl md:text-3xl font-serif mb-3">Terima Kasih</h2>
            <p className="text-lg font-light">Atas doa dan restu yang tulus 💙</p>
            <p className="text-sm opacity-80">
            © 2025 {couple.man.alias} & {couple.woman.alias} Wedding
            </p>
        </motion.section>
        </main>
    )
}