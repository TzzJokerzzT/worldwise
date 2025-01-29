import { useContext, useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { CitiesContext } from "../context/CitiesProvider";
import styles from "./Map.module.css";
import { useGeolocation } from "../hooks/useGeolocation";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Button from "../components/Button";

const Map = () => {
  //Constext
  const { cities } = useContext(CitiesContext);
  //States
  const [mapPosition, setMapPosition] = useState([40, 0]);
  //Custon Hooks
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();
  const [lat, lng] = useUrlPosition();
  //UseEffect
  useEffect(() => {
    if (lat && lng) setMapPosition([lat || 40, lng || 0]);
  }, [lat, lng]);

  useEffect(() => {
    if (geolocationPosition)
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
  }, []);

  return (
    <div className={styles.mapContainer}>
      {/* {!geolocationPosition && ( */}
      <Button type="position" onClick={() => getPosition()}>
        {isLoadingPosition ? "Loading..." : "Use my position"}
      </Button>
      {/* )} */}
      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
};

const ChangeCenter = ({ position }) => {
  const map = useMap();
  map.setView(position);
  return null;
};

const DetectClick = () => {
  const { navigate } = useContext(CitiesContext);
  useMapEvent({
    click: (e) => navigate(`app/form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
};

export default Map;
