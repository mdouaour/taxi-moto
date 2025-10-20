import { useTranslation } from 'react-i18next';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from 'react';
import L from 'leaflet';
import { supabase } from '../../services/supabaseClient';

// Fix for default marker icon not showing
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

export default function RiderDashboard() {
  const { t } = useTranslation();
  const defaultPosition = [51.505, -0.09]; // Default position, e.g., London
  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [destination, setDestination] = useState('');
  const [bookingStatus, setBookingStatus] = useState(null);
  const [bookingError, setBookingError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          setLocationError(error.message);
          console.error("Geolocation error:", error);
        }
      );
    } else {
      setLocationError('Geolocation is not supported by this browser.');
    }
  }, []);

  const handleBooking = async (e) => {
    e.preventDefault();
    setBookingStatus(null);
    setBookingError(null);

    if (!destination) {
      setBookingError(t('enterDestination'));
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setBookingError(t('notLoggedIn'));
      return;
    }

    const { data, error } = await supabase
      .from('bookings')
      .insert([
        {
          rider_id: user.id,
          destination: destination,
          status: 'pending',
        },
      ]);

    if (error) {
      setBookingError(error.message);
    } else {
      setBookingStatus(t('bookingSuccess'));
      setDestination('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="relative h-[calc(100vh)]">
        {locationError && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-[1001]">
            {t('locationError')}: {locationError}
          </div>
        )}
        <MapContainer center={currentLocation || defaultPosition} zoom={13} scrollWheelZoom={false} className="h-full">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {currentLocation && (
            <Marker position={currentLocation}>
              <Popup>
                {t('yourCurrentLocation')}
              </Popup>
            </Marker>
          )}
        </MapContainer>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 sm:top-4 sm:left-4 sm:translate-x-0 bg-white p-4 rounded-lg shadow-md z-[1000] w-full max-w-sm">
          <h2 className="text-lg font-bold mb-2">{t('bookARide')}</h2>
          <form onSubmit={handleBooking}>
            {bookingStatus && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                {bookingStatus}
              </div>
            )}
            {bookingError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {bookingError}
              </div>
            )}
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
