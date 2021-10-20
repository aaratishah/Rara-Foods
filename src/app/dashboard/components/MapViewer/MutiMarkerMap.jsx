import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";
// Import custom styles to customize the style of Google Map
import "./index.css";
import bikeIcon from "image/bike.png";
import carIcon from "image/car.png";

const MultiMarkerMap = React.memo(
  ({
    options,
    markers,
    activeMarker,
    baseMarkerId = null,
    bound = false,
    onMarkerClick,
    onMapClick,
    markerAppendable = false,
    viewType = "Tower",
     center = null,
      handleCenter,
     markerWindowUI,
  }) => {
    // const [markerPoints, setMarkerPoints] = useState([]);
    const { isLoaded } = useLoadScript({
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_KEY,
    });

    const [map, setMap] = useState(null);
    const [infoOpen, setInfoOpen] = useState(false);
    const [selectedMarker, setSelectedMarker] = useState(activeMarker);
    const [markerMap, setMarkerMap] = useState({});

    const loadHandler = (map) => {
      // Store a reference to the google map instance in state
      setMap(map);
      // fitBounds(map);
    };

    // We have to create a mapping of our places to actual Marker objects
    const markerLoadHandler = (marker, location) => {
      return setMarkerMap((prevState) => {
        return { ...prevState, [location?._id?.toString()]: marker };
      });
    };

    const markerClickHandler = (e, marker) => {
      if (onMarkerClick) onMarkerClick(marker);
      setSelectedMarker(marker);
      if (infoOpen) {
        setInfoOpen(false);
      }
      setInfoOpen(true);
    };

    const MapClickHandler = (e) => {
      if (!markerAppendable) return;
      if (infoOpen) {
        setInfoOpen(false);
      }
      if(typeof handleCenter === 'function') handleCenter(map.getCenter().lat(), map.getCenter().lng())
      if (onMapClick) onMapClick(e);
    };

    useEffect(() => {
      // setInfoOpen(false);
      if (map) {
        if (activeMarker) {
          map.panTo(
            new window.google.maps.LatLng(
              activeMarker.latitude,
              activeMarker.longitude
            )
          );

          // setTimeout(() => {
          setSelectedMarker(activeMarker);
          setInfoOpen(true);
          // }, 100);
        }
      }
    }, [activeMarker, markers, map]);

    useEffect(() => {
      if (bound && map && markers && markers.length) {
        const bounds = new window.google.maps.LatLngBounds();
        markers.map((marker, i) =>
          bounds.extend(
            new window.google.maps.LatLng(marker.latitude, marker.longitude)
          )
        );
        map.setZoom(6);
        map.fitBounds(bounds);
      }
    }, [markers, map, bound]);
    if(center == null) return 'Invalid Center';

    const renderMap = () => (
      <GoogleMap
        onLoad={loadHandler}
        onClick={MapClickHandler}
        zoom={options.zoom}
        center={center}
        disableDefaultUI={true}
        options={{
          // styles: styles,
          // streetViewControl: false,
          // fullscreenControl: false,
          mapTypeControl: false,
          // mapTypeControlOptions: {
          //   position: window.google.maps.ControlPosition.LEFT_BOTTOM
          // }
        }}
        mapContainerStyle={{
          height: "100%",
          width: "100%",
          boxShadow: "rgba(0, 0, 0, 0.15) 10px 10px 10px",
        }}
      >
        {markers &&
          markers.length > 0 &&
          markers.map((location, i) => {
            return (
              <Marker
                key={i}
                animation={2}
                position={{
                  lat: parseFloat(location.latitude),
                  lng: parseFloat(location.longitude),
                }}
                icon={{
                  url: location?.vehicleType === 'bicycling' ? bikeIcon : carIcon,
                  origin: new window.google.maps.Point(0, 0),
                }}
                onLoad={(marker) => markerLoadHandler(marker, location)}
                onClick={(e) => markerClickHandler(e, location)}
                // onMouseOver={e => markerOverHandler(e, location)}
                // onMouseOut={e => markerOutHandler(e, location)}
              />
            );
          })}
        {infoOpen && selectedMarker && typeof markerWindowUI === 'function' && (
          <InfoWindow
            anchor={markerMap[selectedMarker?._id?.toString()]}
            onCloseClick={() => setInfoOpen(false)}
            options={{ pixelOffset: new window.google.maps.Size(0, 8) }}
          >
            {markerWindowUI(selectedMarker)}
          </InfoWindow>
        )}
      </GoogleMap>
    );
    return isLoaded ? renderMap() : null;
}
);

export default MultiMarkerMap;
