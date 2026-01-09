import { useNavigate, useLocation } from "react-router-dom";

export default function SelectIdiom() {
  const navigate = useNavigate();
  const location = useLocation();

  const currentLang = location.pathname.split("/")[1] || "es";

  const handleChange = (e) => {
    navigate(`/${e.target.value}`);
  };

  return (
    <select
      className="bg-black text-white px-3 py-2 rounded-full text-xs md:px-4 md:py-2 md:text-sm md:rounded-lg flex items-center gap-1.5"
      value={currentLang}
      onChange={handleChange}
    >
      <option className="flex items-center gap-1.5 p-1" value="es">
        🇪🇸 ES
      </option>
      <option className="flex items-center gap-1.5 p-1" value="en">
        🇺🇸 EN
      </option>
      <option className="flex items-center gap-1.5 p-1" value="fr">
        🇫🇷 FR
      </option>
      <option className="flex items-center gap-1.5 p-1" value="de">
        🇩🇪 DE
      </option>
    </select>
  );
}