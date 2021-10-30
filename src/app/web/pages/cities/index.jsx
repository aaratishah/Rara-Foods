import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Layout } from "antd";
import api from "app/web/api";
import { handleError } from "services/util";
import { Link } from "react-router-dom";
import routeURL from "config/routeURL";

const styles = {
  li: {
    fontSize: 18,
  },
};

export default function Cities() {
  const location = useLocation();
  const [cities, setCities] = useState([]);
  const [spinning, setSpinning] = useState(false);
  console.log(cities);
  useEffect(() => {
    setSpinning(true);
    api.region
      .readAll()
      .then(({ data }) => {
        return setCities(data);
      })
      .then(({ data }) => console.log("places", data))
      .catch(handleError)
      .finally(() => setSpinning(false));
  }, []);

  return (
    <section className="location-section section" style={{ marginTop: 80 }}>
      <div className="container-fluid">
        <header className="section-header">
          <h2 className="section-title">Cities Near Me</h2>
        </header>
        <div className="location-wrapper">
          <ul className="list-unstyled" style={{ columns: "4 auto" }}>
            {cities.map((region, idx) => (
              <li key={idx}>
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
        </div>
      </div>
    </section>
  );
}
