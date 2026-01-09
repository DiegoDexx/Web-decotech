
import { useVTNavigate } from "../../hooks/useVTNavigate";

import {
    FaShower,
    FaToolbox,
    FaHome,
    FaSatelliteDish,
    FaTint,
    FaUtensils,
    FaPaintBrush,
    FaBolt,
    FaBroom,
    FaArrowRight
} from "react-icons/fa";


const icons = {
    service_1: FaShower,
    service_2: FaToolbox,
    service_3: FaHome,
    service_4: FaSatelliteDish,
    service_5: FaTint,
    service_6: FaUtensils,
    service_7: FaPaintBrush,
    service_8: FaBolt,
    service_9: FaBroom,
};



// Asignación de iconos según el número del servicio

export default function Card({ service, lang }) {
    const Icon = icons[service.key];

    const navigate = useVTNavigate();
    
    const handleClick = (lang, serviceSlug) => {
      navigate(`/${lang}/service/${serviceSlug}`);
    };

    return (
                       <div className="card card-hover flex gap-4 items-start cursor-pointer" 
                       key={service.key} onClick={() => handleClick(lang, service.slug)} >
                          {/* Ícono */}
                        <div className="icon-box bg-brand transition-transform duration-300 group-hover:translate-x-1">
                            <Icon className="text-2xl text-black" />
                        </div>

                        {/* Contenido */}
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold group-hover:text-black transition-colors duration-300">
                                {service.title}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1 group-hover:opacity-90 transition-opacity duration-300">
                                {service.description}
                            </p>
                        </div>

                        {/* FLECHA */}
                        <FaArrowRight
                            className="
                                text-gray-400 text-xl
                                    transition-transform transition-colors duration-300
                                    hover:bg-black
                                    hover: rounded-full p-1
                                    hover:text-white
                                    hover:scale-125"
                        />
                    </div>
    );
}