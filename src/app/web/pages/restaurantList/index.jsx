import { Col, Row, Typography } from 'antd';
import api from 'app/web/api';
import Container from 'app/web/components/Container';
import { notificationError } from 'app/web/components/notification';
import routeURL from 'config/routeURL';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { geolocated } from 'react-geolocated';
import { Link } from 'react-router-dom';
import { handleError } from 'services/util';
import FoodProduct from '../home/FoodProduct';
import Spinner from 'app/dashboard/components/Spinner';

function RestaurantList(props) {
  const {
    isGeolocationAvailable,
      isGeolocationEnabled,
      coords
  } = props;
  const [restaurants, setRestaurants] = useState([]);
  let stringQuery = queryString.parse(props.location.search);
  const [error, setError] = useState('');
  const [spinning, setSpinning] = useState(false);
  const [title, setTitle] = useState('');
  useEffect(() => {
    setSpinning(true);
    if (stringQuery.category) {
      setTitle();
      api.restaurant
        .readRestaurantByCategory(stringQuery.category)
        .then(({ data, title }) => {
          setRestaurants(data);
          setTitle(title);
        })
        .catch(handleError)
        .finally(() => setSpinning(false));
    } else if (stringQuery.region) {
      setTitle();
      api.restaurant
        .readRestaurantByRegion(stringQuery.region)
        .then(({ data, title }) => {
          setRestaurants(data);
          setTitle(title);
        })
        .catch(handleError)
        .finally(() => setSpinning(false));
    } else if (stringQuery['near-me']) {
      console.log('isGeolocationEnabled inside',isGeolocationEnabled, coords);
    } else {
      setError('not-matching-query');
    }
  }, []);

  const [toFetch, setToFetch] = useState(true);
  useEffect(() => {
    console.log('isGeolocationEnabled',isGeolocationEnabled, coords?.latitude);
    if(toFetch && stringQuery['near-me'] && coords && isGeolocationEnabled && coords.latitude) {
      console.log('isGeolocationEnabled outside inside',isGeolocationEnabled, coords?.latitude);
      setToFetch(false)
      setTitle("Restaurant Near me");
      api.restaurant
        .readRestaurantNearMe(coords?.latitude, coords?.longitude)
        .then(({ data, title }) => {
          setRestaurants(data);
        })
        .catch(handleError)
        .finally(() => setSpinning(false));
    }
  }, [stringQuery,isGeolocationEnabled, coords?.latitude, toFetch]);

  const getError = () => {
    switch (error) {
      case 'not-matching-query':
        return (
          <Typography.Title>
            We couldnot find what you are looking for.{' '}
            <Link to={routeURL.web.home()}>Go to H</Link>
          </Typography.Title>
        );
        break;

      default:
        break;
    }
  };

  return <Row style={{
	  width: '100%',
	  paddingTop: 100
  }}>
	  {spinning ? (
   <Spinner />
  ) : error ? (
    <Container>{getError()}</Container>
  ) : (
    <Container>
      <Row
        style={{
          width: '100%',
        }}
      >
        <Col xs={24}>
          <Typography.Title
            style={{
              fontSize: 25,
              fontWeight: 700,
              marginBottom: 0,
            }}
          >
            "{title}"
          </Typography.Title>
        </Col>
        <Col xs={24}>
          <Typography.Text
            style={{
              marginLeft: 8,
            }}
          >
            {restaurants.length > 50 ? '50+' : restaurants.length} restaurants
          </Typography.Text>
        </Col>
      </Row>
      <Row
        style={{
          marginTop: 16,
        }}
      >
        {restaurants.map((restaurant) => (
          <Col xs={24} md={8}>
            <FoodProduct
              location={props.isGeolocationAvailable && props.coords}
              item={restaurant}
              key={restaurant._id}
            />
          </Col>
        ))}
      </Row>
    </Container>
  )}
  </Row>;
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true,
  },
  isOptimisticGeolocationEnabled: true,
  watchPosition: false,
  userDecisionTimeout: 10000,
})(RestaurantList);
