import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useLocation } from "react-router-dom";

import es from "../../locales/es.json";
import en from "../../locales/en.json";
import fr from "../../locales/fr.json";
import de from "../../locales/de.json";

const locales = { es, en, fr, de };

const AutoSlider = ({ interval = 10000 }) => { // 5 min = 300000 ms

    const location = useLocation();
    const lang = location.pathname.split("/")[1] || "es";
    const slider = locales[lang].slider;

    const slides = [
        slider.slide_1,
        slider.slide_2,
        slider.slide_3
    ];

    const [index, setIndex] = useState(0);

    // Autoplay
    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % slides.length);
        }, interval);

        return () => clearInterval(timer);
    }, [slides.length, interval]);

    const next = () => setIndex((prev) => (prev + 1) % slides.length);
    const prev = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);

    return (
        <div className="relative w-full h-[80vh] md:h-[70vh] overflow-hidden">

            {/* SLIDES */}
            {slides.map((slide, i) => (
                <div
                    key={i}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out
                    ${i === index ? "opacity-100" : "opacity-0"}
                    flex items-center`}
                >
                    {/* Background Image — tú puedes personalizar el src */}
                    <img
                        src={`/slider/${i + 1}.jpg`}
                        className="w-full h-full object-cover"
                        alt=""
                    />

                    {/* Overlay oscuro */}
                    <div className="absolute inset-0 bg-black/50"></div>

                    {/* Textos */}
                    <div className="absolute left-6 md:left-40 top-1/2 -translate-y-1/2 max-w-xl text-white">
                        <h1 className="text-3xl md:text-5xl font-bold leading-tight drop-shadow">
                            {slide.title}
                        </h1>

                        <p className="mt-4 text-sm md:text-lg  px-1 py-2 rounded-md inline-block">
                            {slide.description}
                        </p>

                        {/* Botones */}
                        <div className="mt-6 flex gap-4">
                            <button className="bg-brand text-black font-medium px-5 py-2 rounded-lg border-0  cursor-pointer">
                                {slider.button}
                            </button>

                            <button className="bg-transparent text-white border border-white px-5 py-2 rounded-lg hover:bg-black hover:text-white transition cursor-pointer">
                                {slider.button_2}
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            {/* Controles */}
            <button
                onClick={prev}
                className="absolute bottom-6 left-1/2 -translate-x-16 bg-black/60 text-white p-3 rounded-full md:-translate-x-24"
            >
                <FaArrowLeft />
            </button>

            <button
                onClick={next}
                className="absolute bottom-6 left-1/2 translate-x-16 bg-black/60 text-white p-3 rounded-full md:translate-x-24"
            >
                <FaArrowRight />
            </button>
        </div>
    );
};

export default AutoSlider;
