import React from 'react';
import logo from "../../assets/img/LogoDECOTECH_Transparente.png";

/**
 * LoadingScreen
 * Full-screen loading component with two small loading-effect options.
 *
 * Props:
 * - className: extra classes for the outer container
 * - logoAlt: alt text for the logo image
 * - width: width of the logo image (px)
 * - height: height of the logo image (px) — note: smaller than previous default as requested
 * - variant: 'spinner' (spinning circle around logo) | 'dots' (3 bouncing dots below logo)
 *
 * Usage examples:
 * <LoadingScreen variant="spinner" width={120} height={80} />
 * <LoadingScreen variant="dots" width={100} height={70} />
 */
const LoadingScreen = ({
  className = '',
  logoAlt = 'Logo',
  width = 120,
  height = 90,
  variant = 'dotsr', // 'spinner' or 'dots'
}) => {
  // ringSize used for the spinning circle size (a bit larger than the logo)
  const ringSize = Math.round(width + 28);

  return (
    <div className={`bg-white-50 fixed inset-0 flex items-center justify-center ${className}`}>
      <div className="relative flex flex-col items-center">
        {variant === 'spinner' && (
          <div
            aria-hidden="true"
            style={{ width: ringSize, height: ringSize }}
            className="absolute rounded-full border-4 border-gray-200 border-t-blue-500 animate-spin"
          />
        )}

        <img
          src={logo}
          alt={logoAlt}
          width={width}
          height={height}
          className="animate-pulse block"
          style={{ display: 'block' }}
        />

        {variant === 'dots' && (
          <div className="flex items-center mt-3 space-x-2" aria-hidden="true">
            <span
              className="w-2.5 h-2.5 bg-gray-500 rounded-full animate-bounce"
              style={{ animationDuration: '0.9s', animationDelay: '0s' }}
            />
            <span
              className="w-2.5 h-2.5 bg-gray-500 rounded-full animate-bounce"
              style={{ animationDuration: '0.9s', animationDelay: '0.15s' }}
            />
            <span
              className="w-2.5 h-2.5 bg-gray-500 rounded-full animate-bounce"
              style={{ animationDuration: '0.9s', animationDelay: '0.3s' }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadingScreen;
