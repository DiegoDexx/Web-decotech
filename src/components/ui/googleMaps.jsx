import React from "react";

export default function GoogleMapCard({
  embedUrl,
  title = "Google Map",
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <div className="w-full h-[220px] md:h-[260px] lg:h-[300px]">
        <iframe 
          title={title}
          src={embedUrl}
          className="w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </div>
  );

}
