import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Map = ({ zip, country = 'US' }) => {
  const [location, setLocation] = useState({
    lat: 0,
    lng: 0,
  });

  const apiKey = 'AIzaSyAjKMLxZ06rw6e-nGWXefbuZq5g_xOowok';

  useEffect(() => {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?key=${apiKey}&components=country:${country}|postal_code:${zip}`)
      .then((response) => response.json())
      .then((data) => {
        setLocation({
          lat: data.results[0].geometry.location.lat,
          lng: data.results[0].geometry.location.lng,
        });
      })
      .catch((error) => console.error(error));
  }, [zip]);

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap mapContainerStyle={{ width: '100%', height: '450px' }} center={location} zoom={16}>
        <Marker position={location} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
