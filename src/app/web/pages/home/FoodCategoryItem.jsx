import ProductImage from "image/demo/p-001.jpg";
import { Link } from "react-router-dom";
import config from "config";
import routeURL from "config/routeURL";

export default function FoodCategoryItem({ item }) {
	return (
		<div
			className="product circle"
			style={{
				width: 201.5,
				marginRight: 30,
			}}
		>
			<Link
				className="product-image"
				to={routeURL.web.restaurant_list(`category=${item._id}`)}
			>
				<img
					src={
						Array.isArray(item.images) && item.images.length > 0
							? config.getImageHost(item.images[0])
							: ProductImage
					}
					alt
				/>
			</Link>
			<div className="product-container text-center">
				<h2 className="product-title">
					<Link to={routeURL.web.restaurant_list(`category=${item._id}`)}>
						{item.name}
					</Link>
				</h2>
			</div>
		</div>
	);
}
