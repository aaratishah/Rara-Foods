import { Button, Card, Col, Popconfirm, Row } from 'antd';
import api from 'app/web/api';
import { notificationError } from 'app/web/components/notification';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { handleError } from 'services/util';
import AddEditAddress from './AddEditAddress';

export default function ShippingAddress() {
  const [preview, setPreview] = useState(false);
  const [item, setItem] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [spinning, setSpinning] = useState(false);

  const fetchAddress = () => {
    setItem(null);
    setSpinning(true);
    api.deliveryAddress
      .get()
      .then(({ data }) => setAddresses(data))
      .catch(handleError)
      .finally(() => setSpinning(false));
  };
  useEffect(() => {
    setSpinning(true);
    api.deliveryAddress
      .get()
      .then(({ data }) => setAddresses(data))
      .catch(handleError)
      .finally(() => setSpinning(false));
  }, []);

  const onDelete = (itemId) => {
    // validate here
    if (true) {
      setSpinning(true);
      api.deliveryAddress
        .delete(itemId)
        .then(({ message }) => {
          fetchAddress();
        })
        .catch(handleError)
        .finally(() => setSpinning(false));
    }
  };
  return (
    <div>
      <div
        className="my-account-address account-wrapper"
        style={{
          width: '100%',
        }}
      >
        <Row
          justify="space-between"
          style={{
            marginBottom: 16,
          }}
        >
          {/* <Col>
            <h4 className="account-title">Address</h4>
          </Col> */}
          <Col>
            <Button
              onClick={() => {
                setItem(null);
                setPreview(true);
              }}
            >
              Add Address
            </Button>
          </Col>
        </Row>
        <AddEditAddress
          fetchAddress={fetchAddress}
          preview={preview}
          onCancel={() => {
            setItem(null);
            setPreview(false);
          }}
          item={item}
        />
        <Row gutter={[16, 16]}>
          {addresses.map((address) => {
            return (
              <Col xs={24} md={12} lg={8}>
                <Card style={{
                  height: "100%"
                }}>
                  {/* <h4 className="account-title">Billing address</h4> */}
                  <div className="account-address">
                    <h6 className="name">{address.label}</h6>
                    <p>
                      {address.address && address.address.street} <br />{' '}
                      {address.address && address.address.city},{' '}
                      {address.address && address.address.state}
                    </p>
                    <p>{address.nearbyLocation}</p>
                    <Popconfirm
                      title="Are you sure you want to delete Address?"
                      onConfirm={() => onDelete(address._id)}
                    >
                      <a className="main-btn main-btn-1 ml-1">
                        <i className="far fa-delete" /> Delete
                      </a>
                    </Popconfirm>
                    <a
                      className="main-btn main-btn-2 ml-1"
                      onClick={() => {
                        setItem(address);
                        setPreview(true);
                      }}
                    >
                      <i className="far fa-edit" /> Edit
                    </a>
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}
