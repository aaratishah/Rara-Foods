import React, { useEffect, useState } from 'react';
import { Button, Col, Collapse, Menu, Modal, Row, Tabs, Typography } from 'antd';
import Container from 'app/web/components/Container';
import FoodDetailModal from './FoodDetailModal';
import { notificationError } from 'app/web/components/notification';
import config from 'config';
import moment from 'moment';
import MapViewer from 'app/dashboard/components/MapViewer';
import Icon from '@ant-design/icons';
import { EmailOpenIcon, MarkerAlt } from 'image/icon-svg';
import api from 'app/dashboard/api';
import { handleError } from 'services/util';

const getPrice = (food) => {
  let { price, discountType, discountAmount, discountPercent } = food;
  switch (discountType) {
    case 'percent':
      if (discountPercent > 0 && discountPercent <= 100) {
        price = price - (price * discountPercent) / 100;
      }
      break;
    case 'amount':
      if (discountAmount > 0 && discountAmount <= price) {
        price = price - discountAmount;
      }
      break;

    default:
      break;
  }
  return price;
};

const days = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];
var headerPosition = null;
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const Food = ({ data, restaurantDetail, isOpen, orderId, isGuest, fetchOrder }) => {
  const [foodDetail, setFoodDetail] = useState(false);
  return (
    <li className="col-md-4 col-sm-6">
      <FoodDetailModal
        orderId={orderId}
        isGuest={isGuest}
        restaurantDetail={restaurantDetail}
        data={data}
        preview={foodDetail}
        setPreview={setFoodDetail}
        fetchOrder={fetchOrder}

      />
      <div className="product">
        <div className="product-image">
          <img
            style={{
              cursor: isOpen && 'pointer',
              // filter: isOpen || 'grayscale(50%)',
            }}
            onClick={() =>
              isOpen
                ? setFoodDetail(true)
                : notificationError(
                'Restaurant is currently closed. Please visit later.',
                'Closed',
                'bottomRight'
                )
            }
            src={config.getImageHost(data.activeImage)}
            alt
          />
        </div>
        <div className="product-container">
          <h3
            onClick={() =>
              isOpen
                ? setFoodDetail(true)
                : notificationError(
                'Restaurant is currently closed. Please visit later.',
                'Closed',
                'bottomRight'
                )
            }
            style={{
              cursor: isOpen && 'pointer',
            }}
            className="product-title"
          >
            {data.name}
          </h3>
          <div
            className="product-meta"
            style={{
              transform: 'unset',
            }}
          >
            <span className="shipping">
              <span className="currency">$</span>
              {getPrice(data)}
            </span>
          </div>
        </div>
      </div>
    </li>
  );
};

const FoodGroup = ({ data, restaurantDetail, isOpen, isGuest, orderId, fetchOrder}) => {
  return (
    <div name={data._id} id={data._id}>
      <header
        className="section-header"
        style={{
          paddingTop: 48,
        }}
      >
        <h2 className="section-title">{data.name}</h2>
      </header>
      <ul className="product-list">
        {data.foods.length > 0 ? (
          data.foods.map((food) => (
            <Food
              orderId={orderId}
              isGuest={isGuest}
              isOpen={isOpen}
              restaurantDetail={restaurantDetail}
              data={food}
              fetchOrder={fetchOrder}
            />
          ))
        ) : (
          <div
            style={{
              backgroundColor: 'teal',
              height: 600,
            }}
          >
            <Typography.Text>Coming soon..</Typography.Text>
          </div>
        )}
      </ul>
    </div>
  );
};

const AddOrder = ({restaurant, setAddOrder, orderId, isGuest, fetchOrder}) => {
  const [spinning, setSpinning] = useState(false);
  const [restaurantDetail, setRestaurantDetail] = useState(null);
  const [foodGroups, setFoodGroups] = useState(null);

  useEffect(() => {
    if (restaurant) {
      setSpinning(true);
      api.restaurant
        .read(restaurant)
        .then(({ data }) => setRestaurantDetail(data))
        .catch(handleError)
        .finally(() => setSpinning(false));
      api.restaurant
        .foodWithGroup(restaurant)
        .then(({ data }) => setFoodGroups(data))
        .catch(handleError)
        .finally(() => setSpinning(false));
    }
  }, [restaurant]);

  return (
    <section className="product-list-section section">
      <Container>
        <Row justify='end'>
          <Button type='primary' onClick={()=>setAddOrder(false)}>
            View Order
          </Button>
        </Row>
        <div className="product-sections" id="food-group-container">
          {foodGroups?.map((foodGroup) => (
            <FoodGroup
              orderId={orderId}
              isGuest={isGuest}
              fetchOrder={fetchOrder}
              isOpen={true}
              restaurantDetail={restaurantDetail}
              data={foodGroup}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default AddOrder;
