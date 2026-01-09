import { BrowserRouter as BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import ServicePage from "./pages/servicePage";
import TermsAndConditions from "./pages/termsAndConditions";
import Privacy from "./pages/privacy";

function App() {
  return (
    <div className="grid grid-cols-12 w-full gap-0">
      <main className="col-span-12">
        <BrowserRouter>
          <Routes>
            <Route path="/es" element={<Home language="es" />} />
            <Route path="/en" element={<Home language="en" />} />
            <Route path="/fr" element={<Home language="fr" />} />
            <Route path="/de" element={<Home language="de" />} />
            <Route path="*" element={<Home language="es" />} />
            <Route path="/:lang/legal" element={<TermsAndConditions />} />
            <Route path="/:lang/privacy" element={<Privacy />} />


            {/* PÁGINA DE SERVICIO INDIVIDUAL */}
            <Route path="/:lang/service/:category" element={<ServicePage />} />
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
}
export default App;
