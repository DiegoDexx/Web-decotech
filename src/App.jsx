import React, { useState, useEffect } from "react";
import { BrowserRouter as BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import ServicePage from "./pages/servicePage";
import TermsAndConditions from "./pages/termsAndConditions";
import Privacy from "./pages/privacy";
import FAQ from "./pages/faq";
import LoadingScreen from "./components/layouts/LoadingScreen";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 3000); // 3 segundos
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

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
            <Route path="/:lang/faq" element={<FAQ />} />

            {/* PÁGINA DE SERVICIO INDIVIDUAL */}
            <Route path="/:lang/service/:category" element={<ServicePage />} />
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
}
export default App;
