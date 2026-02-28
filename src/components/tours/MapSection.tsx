"use client";

import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 34.5,
  lng: 76.5,
};

const locations = [
  { lat: 34.1526, lng: 77.5771 },
  { lat: 34.0837, lng: 74.7973 },
  { lat: 35.2971, lng: 75.6337 },
  { lat: 32.7266, lng: 74.8570 },
  { lat: 31.1048, lng: 77.1734 },
];

const MapSection = () => {
  // useJsApiLoader is much more reliable in Next.js / React 18
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    // It is highly recommended to use environment variables for API keys
    googleMapsApiKey: "AIzaSyCuiyYlvvy8DE2I5Fnd5_TYGb61U1CKlxU", 
  });

  // Prevent rendering until the Google Maps API is ready
  if (!isLoaded) {
    return (
      <div className="w-full h-[350px] flex items-center justify-center bg-gray-100 rounded-lg">
        Loading Map...
      </div>
    );
  }

  return (
    <div className="w-full h-[350px] rounded-lg overflow-hidden">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={7}
      >
        {locations.map((loc, index) => (
          <Marker
            key={index}
            position={loc}
            icon={{
              // Now that isLoaded is true, we can safely access the window.google object
              path: window.google.maps.SymbolPath.CIRCLE,
              fillColor: "#0f3d3e",
              fillOpacity: 1,
              strokeColor: "#ffffff",
              strokeWeight: 2,
              scale: 4,
            }}
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export default MapSection;