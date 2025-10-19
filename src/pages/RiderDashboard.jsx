import { useTranslation } from 'react-i18next';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';

export default function RiderDashboard() {
  const { t } = useTranslation();
  const position = [51.505, -0.09]; // Default position, e.g., London
  const [destination, setDestination] = useState('');

  const handleBooking = (e) => {
    e.preventDefault();
    if (destination) {
      alert(`Booking ride to: ${destination}`);
      // Here you would typically call an API to create the booking
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">{t('welcome')} - {t('rider')}</h1>
      </nav>
      <div className="relative h-[calc(100vh-4rem)]">
        <MapContainer center={position} zoom={13} scrollWheelZoom={false} className="h-full">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              You are here.
            </Popup>
          </Marker>
        </MapContainer>
        <div className="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-md z-[1000] w-full max-w-sm">
          <h2 className="text-lg font-bold mb-2">{t('bookARide')}</h2>
          <form onSubmit={handleBooking}>
            <div className="mb-2">
              <label htmlFor="destination" className="block text-sm font-medium text-gray-700">{t('destination')}</label>
              <input
                type="text"
                id="destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder={t('enterDestination')}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              {t('requestRide')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
