import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import ServicePage from "./pages/servicePage";
import TermsAndConditions from "./pages/termsAndConditions";
import Privacy from "./pages/privacy";
import FAQ from "./pages/faq";
import LoadingScreen from "./components/layouts/LoadingScreen";
import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <div className="grid grid-cols-12 w-full gap-0">
        <main className="col-span-12">
          <Routes>
            <Route path="/es" element={<Home language="es" />} />
            <Route path="/en" element={<Home language="en" />} />
            <Route path="/fr" element={<Home language="fr" />} />
            <Route path="/de" element={<Home language="de" />} />
            <Route path="*" element={<Home language="es" />} />

            <Route path="/:lang/legal" element={<TermsAndConditions />} />
            <Route path="/:lang/privacy" element={<Privacy />} />
            <Route path="/:lang/faq" element={<FAQ />} />

            <Route
              path="/:lang/service/:category"
              element={<ServicePage />}
            />
          </Routes>
        </main>
      </div>

      {loading && (
        <div className="fixed inset-0 z-[9999] bg-white grid place-items-center pointer-events-none">
          <LoadingScreen />
        </div>
      )}
    </>
  );
}

export default App;
