import api from "app/web/api";
import { notificationError } from "app/web/components/notification";
import routeURL from "config/routeURL";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { handleError } from "services/util";
import Geocode from "react-geocode";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
} from "react-google-maps";
import { default as useBreakpoint } from "services/Breakpoint";

const styles = {
  li: {
    fontSize: 18,
  },
};
Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAP_KEY);
export default function RestaurantByLocation() {
  const [spinning, setSpinning] = useState(false);
  const [regions, setRegions] = useState([]);
  const [position, setPosition] = useState([]);
  const [loading, setLoading] = useState(true);

  const point = useBreakpoint();
  const isMobileDevice = () => ["xs", "sm"].includes(point);

  useEffect(() => {
    setSpinning(true);
    api.region
      .readAll()
      .then(({data}) => {return setRegions(data)})
      .then(({data}) => console.log('places',data))
      .catch(handleError)
      .finally(() => setSpinning(false));
  }, []);

  useEffect(() => {
    regions.forEach((place, index) => {
      // console.log("places", regions);
      Geocode.fromAddress(place.name).then(
        (response) => {
          const lat = response.results[0].geometry.location.lat;
          const lng = response.results[0].geometry.location.lng;
          position.push({ lat: lat, lng: lng, id: place._id });
        },
        (error) => {
          console.error(error);
        }
      );
    });
    setLoading(false);
  }, [regions]);

  const WrappedMap = withScriptjs(withGoogleMap(Map));

  function Map() {
    console.log('positions', position);
    return (
      <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: -33.865143, lng: 151.209900 }}
      >
            <Marker  position={{ lat: -33.865143, lng: 151.209900 }} />
        
        {/* {position.map((pos) => {
          
          return (
            <Marker key={pos.id} position={{ lat: pos.lat, lng: pos.lng }} />
          );
        })} */}
      </GoogleMap>
    );
  }

  return (
    <section className="location-section section">
      <div className="container-fluid">
        <header className="section-header">
          <h2 className="section-title" onClick={() => console.log(regions)}>
            Cities Near Me
          </h2>
        </header>
        <div className="location-wrapper">
          <ul className="list-unstyled" style={{ columns: isMobileDevice() ? 2 : 4 }}>
            {regions.slice(0,20).map((region) => (
              <li onClick = {() => window.localStorage.setItem('user_selected_region', region._id)}>
                <Link
                  className="link-blue"
                  style={styles.li}
                  to={routeURL.web.restaurant_list(`region=${region._id}`)}
                >
                  {region.name}
                </Link>
              </li>
            ))}
          </ul>
          {regions.length > 20 && <div style = {{justifyContent: 'flex-end', display: 'flex', marginBottom: '20px'}}><Link to = {{pathname: routeURL.web.cities_list()}} >View all Cities</Link></div>}
        </div>
        <div style={{ width: "100%", height: "500px" }}>
          {!loading && regions.length !== 0 && (
            <WrappedMap
              googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_MAP_KEY}`}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          )}
        </div>
      </div>
    </section>
  );
}
