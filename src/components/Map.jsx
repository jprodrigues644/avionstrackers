import React from 'react';
import { useEffect, useRef } from 'react';


const Map = ({ apiKey }) => {
  const mapRef = useRef(null);
  
  useEffect(() => {
    // Initialize the map
    const initMap = () => {
      const mapOptions = {
        center: { lat: 50, lng: 0 },
        zoom: 3,
      };
      const map = new window.google.maps.Map(mapRef.current, mapOptions);

      // Add markers to the map
      // You can customize this part based on your flight data and markers
     const markerOptions = {
        position: { lat: 40.7128, lng: -74.0060 },
        map: map,
        title: 'New York City',
      };
      // eslint-disable-next-line
      const marker = new window.google.maps.Marker(markerOptions);
    };

    // Load the Google Maps script
    const loadMapScript = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.body.appendChild(script);
    };

    loadMapScript();
  }, [apiKey]);

  return <div ref={mapRef} style={{ width: '100%', height: '500px' }} />;
};

export default Map;