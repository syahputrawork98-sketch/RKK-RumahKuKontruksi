// src/modules/guest/components/home/HeroSlider.jsx
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const slides = [
  {
    id: 1,
    title: "Bangun Rumah Lebih Terencana, Transparan, dan Terpantau",
    description: "Dari konsultasi, RAB, progres proyek, dokumentasi lapangan, hingga pembayaran termin — semua proses pembangunan rumah dikelola lebih rapi dalam satu alur kerja.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop",
    primaryCTA: { text: "Lihat Layanan", link: "/layanan" },
    secondaryCTA: { text: "Cara Kerja", link: "/cara-kerja" },
  },
  {
    id: 2,
    title: "Perencanaan Jelas dari Desain hingga RAB",
    description: "Kami membantu Anda merancang dan mewujudkan rumah impian dengan sistem perencanaan yang efisien dan transparan.",
    image: "https://images.unsplash.com/photo-1503387762-592deb584e?q=80&w=1600&auto=format&fit=crop",
    primaryCTA: { text: "Konsultasi Gratis", link: "/contact" },
    secondaryCTA: { text: "Lihat Layanan", link: "/layanan" },
  },
  {
    id: 3,
    title: "Proyek Dipantau oleh Tim Lapangan yang Terkoordinasi",
    description: "Didukung oleh tenaga ahli konstruksi yang kompeten dan terpercaya untuk menjamin kualitas proyek Anda.",
    image: "https://images.unsplash.com/photo-1591588582259-e675bd2e6088?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1074",
    primaryCTA: { text: "Lihat Proyek", link: "/proyek" },
    secondaryCTA: { text: "Hubungi Kami", link: "/contact" },
  },
  {
    id: 4,
    title: "Semua Proses Lebih Terdokumentasi dan Terarah",
    description: "RumahKu Konstruksi memudahkan kerja sama semua pihak dalam satu platform modern untuk hasil yang maksimal.",
    image: "https://plus.unsplash.com/premium_photo-1681691757922-6d8b206abedc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    primaryCTA: { text: "Mulai Bangun Sekarang", link: "/contact" },
    secondaryCTA: { text: "Pelajari Cara Kerja", link: "/cara-kerja" },
  },
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 1.1,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.9,
    }),
  };

  return (
    <section className="relative w-full h-[85vh] md:h-[90vh] overflow-hidden bg-neutral-100">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.6 },
            scale: { duration: 0.8 }
          }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Background Image with optimized loading */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10000ms] ease-linear scale-105 hover:scale-100"
            style={{ backgroundImage: `url(${slides[currentIndex].image})` }}
          />
          
          {/* Premium Overlay Gradient */}
          <div className="absolute inset-0 bg-linear-to-b from-neutral-100/60 via-neutral-100/40 to-primary-pressed/80 backdrop-blur-[2px]" />
          
          {/* Content Container */}
          <div className="container mx-auto h-full flex flex-col justify-center items-center text-center px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="max-w-5xl"
            >
              <h1 className="text-display-s md:text-display font-extrabold mb-6 leading-tight text-white drop-shadow-2xl">
                {slides[currentIndex].title}
              </h1>
              <p className="text-l-regular md:text-heading-s-regular mb-10 max-w-3xl mx-auto text-white/90 leading-relaxed drop-shadow-lg">
                {slides[currentIndex].description}
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                <Link 
                  to={slides[currentIndex].primaryCTA.link} 
                  className="bg-primary-main text-white text-l-bold px-8 md:px-10 py-4 rounded-xl shadow-xl hover:bg-primary-hover hover:scale-105 transition-all duration-300 border border-primary-main/20"
                >
                  {slides[currentIndex].primaryCTA.text}
                </Link>
                <Link 
                  to={slides[currentIndex].secondaryCTA.link} 
                  className="bg-white/10 backdrop-blur-md border-2 border-white/40 px-8 md:px-10 py-4 rounded-xl text-l-bold text-white hover:bg-white hover:text-primary-main hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  {slides[currentIndex].secondaryCTA.text}
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 md:px-8 z-20 pointer-events-none">
        <button
          onClick={prevSlide}
          className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-white/10 border border-white/20 hover:bg-white/30 text-white transition-all duration-300 backdrop-blur-md pointer-events-auto group shadow-lg"
          aria-label="Previous slide"
        >
          <HiChevronLeft className="w-8 h-8 group-hover:-translate-x-1 transition-transform" />
        </button>
        <button
          onClick={nextSlide}
          className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-white/10 border border-white/20 hover:bg-white/30 text-white transition-all duration-300 backdrop-blur-md pointer-events-auto group shadow-lg"
          aria-label="Next slide"
        >
          <HiChevronRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`transition-all duration-500 rounded-full h-2.5 shadow-md ${
              index === currentIndex 
                ? "w-10 bg-primary-main" 
                : "w-2.5 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 hidden md:block"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
