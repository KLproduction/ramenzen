"use client";

import { Library, Loader } from "@googlemaps/js-api-loader";
import { useJsApiLoader } from "@react-google-maps/api";
import { useRef, useEffect } from "react";

export type googleLat = {
  location?: {
    coordinates: [number, number];
  };
};

const containerStyle = {
  width: "100%",
  height: "100%", // Ensure the map container has height
};

const MyGoogleMapSimple = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  const libs: Library[] = ["places", "maps", "marker"];

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: libs,
  });

  useEffect(() => {
    if (isLoaded && mapRef.current) {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
        version: "weekly",
      });

      const initMap = async () => {
        const { Map } = await loader.importLibrary("maps");
        const { Marker } = (await loader.importLibrary(
          "marker",
        )) as google.maps.MarkerLibrary;

        // Map options
        const mapOptions: google.maps.MapOptions = {
          center: {
            lat: 51.495137499405764,
            lng: -2.5738063960200077,
          },
          zoom: 18,
          mapId: "MAP_ID", // Replace "MAP_ID" with your actual mapId or remove it if unused
        };

        // Initialize the map
        const map = new Map(mapRef.current as HTMLDivElement, mapOptions);

        // Add a marker
        new Marker({
          map: map,
          position: {
            lat: 51.495137499405764 - 0.00002,
            lng: -2.5738063960200077 + 0.00005,
          },
        });
      };

      initMap();
    }
  }, [isLoaded, location]);

  return (
    <>
      {isLoaded ? (
        <div ref={mapRef} style={containerStyle} />
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default MyGoogleMapSimple;
