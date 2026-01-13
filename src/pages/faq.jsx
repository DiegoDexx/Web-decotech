import { useParams } from 'react-router-dom';
import Navbar from '../components/layouts/navbar';
import { FAQLayout } from '../components/layouts/faq/faqLayout';
import Footer from '../components/layouts/footer';




export default function FAQ() {
  const { lang } = useParams();   // lang = es | en | fr | de
  const language = lang || "es";            // idioma por defecto


  return (
    <> 

    <Navbar lang={language} />
    <FAQLayout lang={language} />
    <Footer lang={language} />
    </>
  );
}