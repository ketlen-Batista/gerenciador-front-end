import React from 'react';

import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

const MapComponentCoordinates = ({ latitude, longitude }) => {
  const lat = latitude;
  const lng = longitude;

  if (!lat || !lng) {
    console.error('Invalid coordinates in the URL');
    return null;
  }

  return (
    <MapContainer
      center={[lat, lng]}
      zoom={17}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lng]}>
        <Popup>Localização</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponentCoordinates;
