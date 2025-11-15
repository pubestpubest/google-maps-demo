import React, { useEffect, useRef, useState } from 'react';
import { MapPin, AlertCircle } from 'lucide-react';

export default function MapModal({ isOpen, onClose, initialLocation, onConfirm, apiKey }) {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load Google Maps
  useEffect(() => {
    if (!isOpen) return;

    if (!apiKey) {
      setError('Missing Google Maps API key. Set VITE_GOOGLE_MAPS_API_KEY in your .env.local');
      setIsLoading(false);
      return;
    }

    const onMapsReady = () => {
      setIsLoading(false);
    };

    if (window.google && window.google.maps) {
      setIsLoading(false);
      return;
    }

    const existingScript = document.querySelector('script[data-source="google-maps-js"]');
    if (existingScript) {
      window.__onGoogleMapsReady = onMapsReady;
      return;
    }

    const callbackName = '__onGoogleMapsReady';
    window[callbackName] = onMapsReady;

    const script = document.createElement('script');
    script.setAttribute('data-source', 'google-maps-js');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&loading=async&callback=${callbackName}`;
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      setError('Failed to load Google Maps. Check your API key and internet connection.');
      setIsLoading(false);
    };
    document.head.appendChild(script);

    return () => {
      try { delete window[callbackName]; } catch {}
    };
  }, [isOpen, apiKey]);

  // Init map when ready
  useEffect(() => {
    if (!isOpen) return;
    if (isLoading || error || map) return;
    if (!window.google || !window.google.maps || !mapRef.current) return;

    const mapInstance = new window.google.maps.Map(mapRef.current, {
      center: initialLocation || { lat: 16.469546, lng: 99.51592 },
      zoom: initialLocation ? 15 : 12,
      mapTypeControl: true,
      streetViewControl: true,
      fullscreenControl: true,
    });

    setMap(mapInstance);

    // Pre-place marker if initialLocation provided
    if (initialLocation) {
      placeMarker(initialLocation, mapInstance);
    }

    mapInstance.addListener('click', (e) => {
      placeMarker({ lat: e.latLng.lat(), lng: e.latLng.lng() }, mapInstance);
    });
  }, [isOpen, isLoading, error, map, initialLocation]);

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      if (markerRef.current) {
        markerRef.current.setMap(null);
        markerRef.current = null;
      }
      setMarkerPosition(null);
      setMap(null);
      setError(null);
      setIsLoading(!(window.google && window.google.maps));
    }
  }, [isOpen]);

  const placeMarker = (location, mapInstance) => {
    if (markerRef.current) {
      markerRef.current.setMap(null);
      markerRef.current = null;
    }
    const newMarker = new window.google.maps.Marker({
      position: location,
      map: mapInstance,
      animation: window.google.maps.Animation.DROP,
    });
    markerRef.current = newMarker;
    setMarkerPosition(location);
  };

  const handleConfirm = () => {
    if (!markerPosition) return;
    onConfirm(markerPosition);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full h-full max-w-7xl max-h-[90vh] m-4 bg-white rounded-lg shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white hover:bg-gray-100 rounded-full p-2 shadow-lg transition-colors"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {isLoading && (
          <div className="flex items-center justify-center w-full h-full bg-gray-100">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading Google Maps...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center w-full h-full bg-gray-100">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
              <div className="flex items-center gap-3 text-red-600 mb-4">
                <AlertCircle size={32} />
                <h2 className="text-xl font-semibold">Error Loading Map</h2>
              </div>
              <p className="text-gray-700 mb-4">{error}</p>
            </div>
          </div>
        )}

        {!isLoading && !error && (
          <div className="relative w-full h-full" style={{ width: '100%', height: '100%' }}>
            {/* Map Container */}
            <div ref={mapRef} className="w-full h-full" style={{ width: '100%', height: '100%' }}></div>

            {/* Control Panel */}
            <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-sm">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="text-blue-600" size={24} />
                <h2 className="text-lg font-semibold text-gray-800">Place a Marker</h2>
              </div>
              <p className="text-sm text-gray-600 mb-4">Click anywhere on the map to place a marker</p>
              <button
                onClick={handleConfirm}
                disabled={!markerPosition}
                className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                  markerPosition
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Show Coordinates
              </button>
              {markerPosition && (
                <div className="mt-3 p-2 bg-gray-50 rounded text-xs text-gray-600">
                  <div>Lat: {markerPosition.lat.toFixed(6)}</div>
                  <div>Lng: {markerPosition.lng.toFixed(6)}</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
