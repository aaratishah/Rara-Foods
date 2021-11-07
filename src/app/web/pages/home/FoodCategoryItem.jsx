import ProductImage from "image/demo/p-001.jpg";
import { Link } from "react-router-dom";
import config from "config";
import routeURL from "config/routeURL";
import {Row, Col} from 'antd'

export default function FoodCategoryItem({ item }) {
  return (
    <div
      className="product circle"
      style={{
        width: item.availableFoodCategory ? 120 :140,
        // marginRight: 30,
        // transition: 'none'
      }}
    >
      <Link
        className="product-image"
        to={item.availableFoodCategory ? routeURL.web.restaurant_list(`category=${item.geo._id}`) : routeURL.params(routeURL.web.search(), `q=${item.name}`)}
        // to={routeURL.params(routeURL.web.search(), `q=${item.name}`)}
        // style = {{width: "100%", height: '100%'}}
      >
        <img
          // width = {120}
          // style = {{borderRadius: item.availableFoodCategory && '50%'}}
          src={
            Array.isArray(item.images) && item.images.length > 0
              ? config.getImageHost(item.images[0])
              : ProductImage
          }
          alt
        />
      </Link>
      <div className="product-container text-center" style = {{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
        <h2 className="product-title">
          <Link to={routeURL.web.restaurant_list(`category=${item._id}`)}>
            {item.availableFoodCategory ? item.category : item.name}
          </Link>
        </h2>
      </div>
    </div>
  );
}
