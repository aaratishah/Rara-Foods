import api from "app/web/api";
import { notificationError } from "app/web/components/notification";
import routeURL from "config/routeURL";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { handleError } from "services/util";
const styles = {
	li: {
		fontSize: 18,
	},
};
export default function RestaurantByLocation() {
	const [spinning, setSpinning] = useState(false);
	const [regions, setRegions] = useState([]);

	useEffect(() => {
		setSpinning(true);
		api.region
			.readAll()
			.then(({ data }) => setRegions(data))
			.catch(handleError)
			.finally(() => setSpinning(false));
	}, []);

	return (
		<section className="location-section section">
			<div className="container-fluid">
				<header className="section-header">
					<h2 className="section-title">Cities Near Me</h2>
					{/* <a href="#" className="view-all-link">
						View all {regions.length > 50 ? "50+" : regions.length} regions
					</a> */}
				</header>
				<div className="location-wrapper">
					<ul className="list-unstyled column-4">
						{regions.map((region) => (
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
				</div>
			</div>
		</section>
	);
}
