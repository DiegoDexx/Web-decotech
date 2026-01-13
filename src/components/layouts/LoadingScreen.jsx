import React from 'react';
import logo from "../../assets/img/LogoDECOTECH_Transparente.png";

/**
 * LoadingScreen
 * Simple full-screen loading component with a semi-transparent white background.
 * - Uses the `bg-white-50` class for background (project-specific).
 * - Expects a logo image at src/assets/img/logo.png. Change the import if the filename differs.
 */
const LoadingScreen = ({ className = '', logoAlt = 'Logo', size = 120 }) => {
  return (
    <div className={`bg-white-50 fixed inset-0 flex items-center justify-center ${className}`}>
      <img
        src={logo}
        alt={logoAlt}
        width={size}
        height={size}
        className="animate-pulse"
        style={{ display: 'block' }}
      />
    </div>
  );
};

export default LoadingScreen;
