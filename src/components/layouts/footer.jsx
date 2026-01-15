import { useLocation, Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import logo from "../../assets/img/renovy.png";;

import es from "../../locales/es.json";
import en from "../../locales/en.json";
import fr from "../../locales/fr.json";
import de from "../../locales/de.json";

const translationsByLang = { es, en, fr, de };

export default function Footer() {
  const location = useLocation();
  const lang = location.pathname.split("/")[1] || "es";
  const t = translationsByLang[lang] || translationsByLang.es;

  const footer = t.footer;

  return (
    <footer className="w-full  bg-brand text-black">
      <div className="container-main  py-12" >
        {/* TOP GRID */}
        <div className="grid grid-cols-1 mx-auto sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1 - Brand */}
          <div>
            <div className="flex items-center gap-2">
              {/* Si quieres logo aquí, reemplaza por <img src="/..." /> */}
              <img src={logo} alt="Decotech Logo" className="h-28 w-auto p-0" />
            
            </div>

            <p className="mt-4 text-sm leading-relaxed max-w-sm">
              {footer.brand.description}
            </p>

            {/* Social */}
            <div className="mt-5 flex items-center gap-3">
              {footer.social?.facebook && (
                <a
                  href={footer.social.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-black text-white  flex items-center justify-center hover:opacity-90 transition"
                  aria-label="Facebook"
                >
                  <FaFacebookF />
                </a>
              )}

              {footer.social?.instagram && (
                <a
                  href={footer.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:opacity-90 transition"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
              )}

              {footer.social?.tiktok && (
                <a
                  href={footer.social.tiktok}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:opacity-90 transition"
                  aria-label="TikTok"
                >
                  <FaTiktok />
                </a>
              )}
            </div>
          </div>

          {/* Col 2 - Quick links */}
          <div>
            <h4 className="font-semibold">{footer.quick_links.title}</h4>
            <ul className="mt-4 space-y-2 text-sm list-none p-0 m-0">
              {footer.quick_links.items.map((item) => (
                <li key={item.href}>
                  {/* Si usas anclas en Home, puedes usar <a href> */}
                  <Link
                    to={item.href}
                    className="no-underline text-inherit hover:underline underline-offset-4"
                  >
                    {item.label}
                  </Link>
                </li>
              ),)}
            </ul>
          </div>

          {/* Col 3 - Services */}
          <div>
            <h4 className="font-semibold">{footer.services.title}</h4>
            <ul className="mt-4 space-y-2 text-sm list-none p-0 m-0">
              {footer.services.items.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="no-underline text-inherit hover:underline underline-offset-4"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 - Contact */}
      {/* Col 4 - Contact */}
          <div>
            <h4 className="font-semibold">{footer.contact.title}</h4>

            <div className="mt-4 space-y-4 text-sm">
              
              <div className="flex items-center gap-3">
                <FiPhone className="text-xl shrink-0" />
                <a
                  href={`tel:${footer.contact.phone}`}
                  className="no-underline text-inherit hover:underline underline-offset-4"
                >
                  {footer.contact.phone_display}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <FiMail className="text-xl shrink-0" />
                <a
                  href={`mailto:${footer.contact.email}`}
                  className="no-underline text-inherit hover:underline underline-offset-4 break-all"
                >
                  {footer.contact.email}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <FiMapPin className="text-xl shrink-0" />
                <p className="leading-relaxed">
                  {footer.contact.address}
                </p>
              </div>

            </div>
          </div>
        </div>


        {/* Divider */}
        <div className="mt-10 border-t border-black/30" />

        {/* Bottom */}
        <div className="mt-6 flex flex-col md:flex-row items-start max-w-[1400px] mx-auto md:items-center justify-between gap-4 text-sm">
          <p className="opacity-90">{footer.bottom.copyright}</p>

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {footer.bottom.legal_links.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                className="no-underline text-inherit hover:underline underline-offset-4"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
