import { Col, Pagination, Row, Spin } from 'antd';
import api from 'app/web/api';
import { notificationError } from 'app/web/components/notification';
import { UserContext } from 'context';
import { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Restaurant from '../home/FoodProduct';
const pageSize = 20;

export default function Wishlist() {
  const { clientStore } = useContext(UserContext);
  const isAuth = clientStore.isAuthenticated;

  const [wishlists, setWishlist] = useState([]);
  const [wishlistSpinning, setWishlistSpinning] = useState(false);
  const [page, setPage] = useState(0);

  useEffect(() => {
    // fetch New Arrival;
    if (isAuth) {
      setWishlistSpinning(true);
      api.config
        .wishlist()
        .then(({ data }) => setWishlist(data))
        .catch((error) => {
          if (error && error.response && error.response.data) {
            if (typeof error.response.data.message === 'string')
              return notificationError(error.response.data.message);
            let errors = error.response.data;
            if (errors && errors.errors) errors = errors.errors;
            Object.keys(errors).map((key) => notificationError(errors[key]));
          }
        })
        .finally(() => setWishlistSpinning(false));
    }
  }, [isAuth]);

  return (
    <div>
      <div
        className="my-account-address account-wrapper"
        style={{
          width: '100%',
        }}
      >
        <h4 className="account-title">Wishlist</h4>

        <Row justify="end">
          {wishlistSpinning ? (
            <Spin
              style={{
                width: 400,
              }}
            />
          ) : (
            <Row
              style={{
                width: '100%',
              }}
              gutter={[0, 16]}
            >
              {wishlists
                .slice(page * pageSize, page * pageSize + pageSize)
                .map((wishlist, idx) => (
                  <Col xs={24} md={10} lg={8}>
                    <Restaurant item={wishlist.restaurant} key={idx} />
                  </Col>
                ))}
            </Row>
          )}
          <Pagination
            showTotal={(showTotal) => `Total ${showTotal} products`}
            onChange={setPage}
            total={wishlists.length || 0}
            defaultPageSize={pageSize}
          />
        </Row>
      </div>
    </div>
  );
}
