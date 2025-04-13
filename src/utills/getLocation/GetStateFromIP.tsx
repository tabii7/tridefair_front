import React, { useEffect, useState } from "react";

const useLocationFetcher = () => {
  const [location, setLocation] = useState("Fetching location...");
  const [coords, setCoords] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLocation("Unavailable");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ latitude, longitude });

        // Use OpenStreetMap Nominatim to reverse geocode
        fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        )
          .then((response) => response.json())
          .then((data) => {
            if (data.address && data.address.state) {
              setLocation(data.address.state); // Extracting the province/state
            } else {
              setLocation("Unable to retrieve province");
            }
          })
          .catch((err) => {
            console.error("Error fetching address:", err);
            setLocation("Error fetching address");
          });
      },
      (err) => {
        setError("Permission denied or unavailable.");
        setLocation("Unable to fetch location.");
      }
    );
  }, []);

  return {
    location,
    coords,
    error,
  };
};

export default useLocationFetcher;
