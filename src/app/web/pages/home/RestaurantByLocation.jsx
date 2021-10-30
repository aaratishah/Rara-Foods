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
        defaultZoom={5}
        defaultCenter={{ lat: 27.5178453, lng: 85.31362179999999 }}
      >
            <Marker  position={{ lat: 27.5178453, lng: 85.31362179999999 }} />
        
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
          {/* <a href="#" className="view-all-link">
						View all {regions.length > 50 ? "50+" : regions.length} regions
					</a> */}
        </header>
        <div className="location-wrapper">
          <ul className="list-unstyled" style={{ columns: "4 auto" }}>
            {regions.slice(0,20).map((region) => (
              <li>
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
