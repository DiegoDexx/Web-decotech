import { useState } from "react"-;
import { useNavigate, useLocation } from "react-router-dom";


export default function SelectIdiom() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = location.pathname.split("/")[1] || "es";

  const languages = [
    { code: "es", flag: "🇪🇸", label: "ES" },
    { code: "en", flag: "🇺🇸", label: "EN" },
    { code: "fr", flag: "🇫🇷", label: "FR" },
    { code: "de", flag: "🇩🇪", label: "DE" }
  ];

  const handleSelect = (langCode) => {
    navigate(`/${langCode}`);
    setIsOpen(false);
  };

  const currentLangObj = languages.find(lang => lang.code === currentLang) || languages[0];

  return (
    <div className="relative">
      {/* Botón principal */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-black text-white px-3 py-2 rounded-full text-xs md:px-4 md:py-2 md:text-sm flex items-center gap-1.5 hover:bg-gray-800 transition-all w-full text-left"
      >
        <span>{currentLangObj.flag}</span>
        <span>{currentLangObj.label}</span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              className="w-full text-left px-3 py-2 text-sm flex items-center gap-2 hover:bg-brand hover:text-black rounded-lg transition-all first:rounded-t-lg last:rounded-b-lg"
            >
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}