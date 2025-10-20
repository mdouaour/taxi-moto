import { useTranslation } from 'react-i18next';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from 'react';
import L from 'leaflet';
import { supabase } from '../../services/supabaseClient';

// Fix for default marker icon not showing
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

export default function DriverDashboard() {
  const { t } = useTranslation();
  const defaultPosition = [51.505, -0.09]; // Default position, e.g., London
  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [pendingBookings, setPendingBookings] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    // Geolocation for driver's current location
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

    // Fetch pending bookings
    const fetchBookings = async () => {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('status', 'pending');

      if (error) {
        setFetchError(error.message);
      } else {
        setPendingBookings(data);
      }
    };

    fetchBookings();

    // Realtime subscription for new bookings
    const subscription = supabase
      .channel('public:bookings')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'bookings' }, payload => {
        if (payload.new.status === 'pending') {
          setPendingBookings((prev) => [...prev, payload.new]);
        }
      })
      .subscribe();

    return () => subscription.unsubscribe();
  }, []);

  const handleAcceptBooking = async (bookingId) => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      alert(t('notLoggedIn')); // Reuse translation key
      return;
    }

    const { error } = await supabase
      .from('bookings')
      .update({ status: 'accepted', driver_id: user.id })
      .eq('id', bookingId);

    if (error) {
      alert(`Error accepting booking: ${error.message}`);
    } else {
      setPendingBookings((prev) => prev.filter((booking) => booking.id !== bookingId));
      alert(t('bookingAccepted')); // New translation key
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
          <h2 className="text-lg font-bold mb-2">{t('pendingRides')}</h2>
          {fetchError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {fetchError}
            </div>
          )}
          {pendingBookings.length === 0 ? (
            <p>{t('noPendingRides')}</p>
          ) : (
            <ul>
              {pendingBookings.map((booking) => (
                <li key={booking.id} className="mb-2 p-2 border rounded flex justify-between items-center">
                  <span>{t('destination')}: {booking.destination}</span>
                  <button
                    onClick={() => handleAcceptBooking(booking.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                  >
                    {t('accept')}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
