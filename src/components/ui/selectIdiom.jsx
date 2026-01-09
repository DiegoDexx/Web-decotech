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
      className="bg-black text-white px-2 py-1 rounded-full text-xs md:px-4 md:py-2 md:text-sm md:rounded-lg"
      value={currentLang}
      onChange={handleChange}
    >
      <option value="es">ES</option>
      <option value="en">EN</option>
      <option value="fr">FR</option>
      <option value="de">DE</option>
    </select>
  );
}
