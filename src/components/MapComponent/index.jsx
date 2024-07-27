// import React from 'react';

// import 'leaflet/dist/leaflet.css';
// import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

// const MapComponent = ({ locationUrl }) => {
//   const extractCoordinatesFromUrl = (url) => {
//     const match = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
//     if (match) {
//       const lat = parseFloat(match[1]);
//       const lng = parseFloat(match[2]);
//       return { lat, lng };
//     }
//     return null;
//   };

//   const coordinates = extractCoordinatesFromUrl(locationUrl);

//   if (!coordinates) {
//     console.error('Invalid coordinates in the URL');
//     return null;
//   }

//   const { lat, lng } = coordinates;

//   return (
//     <MapContainer
//       center={[lat, lng]}
//       zoom={15}
//       style={{ height: '200px', width: '100%' }}
//     >
//       <TileLayer
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       <Marker position={[lat, lng]}>
//         <Popup>Localização</Popup>
//       </Marker>
//     </MapContainer>
//   );
// };

// export default MapComponent;


import React from 'react';

import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

const MapComponent = ({ locationUrl }) => {
  const extractCoordinatesFromUrl = (url) => {
    const match = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (match) {
      const lat = parseFloat(match[1]);
      const lng = parseFloat(match[2]);
      return { lat, lng };
    }
    return null;
  };

  const coordinates = extractCoordinatesFromUrl(locationUrl);

  if (!coordinates) {
    console.error('Invalid coordinates in the URL');
    return null;
  }

  const { lat, lng } = coordinates;

  return (
    <MapContainer
      center={[lat, lng]}
      zoom={15}
      style={{ height: '200px', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lng]}>
        <Popup>Localização</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
