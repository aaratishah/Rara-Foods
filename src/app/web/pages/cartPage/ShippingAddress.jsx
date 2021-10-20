import { Button, Card, Col, Radio, Row, Spin } from 'antd';
import api from 'app/web/api';
import { useEffect, useState } from 'react';
import { handleError } from 'services/util';
import './index.css';
import AddEditAddress from 'app/web/pages/account/AddEditAddress';
import MapViewer from 'app/dashboard/components/MapViewer';

export default function ShippingAddress({ setShippingAddress, isDisabled }) {
  const [preview, setPreview] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [spinning, setSpinning] = useState(false);
  const [item, setItem] = useState([]);

  const fetchAddress = () => {
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

  const onLocationChanged = (e) => {
    setShippingAddress(e.target.value);
  };

  const shipAddress = <>
    <AddEditAddress
      fetchAddress={fetchAddress}
      preview={preview}
      onCancel={() => {
        setItem(null);
        setPreview(false);
      }}
      item={item}
    />
    <div className="cart-title">
      <h4 className="title">Calculate Shipping</h4>
      <p>Estimate your shipping fee *</p>
    </div>
    <div className="cart-form mt-25">
      <form>
        <Radio.Group
          style={{
            width: '100%',
          }}
          onChange={onLocationChanged}
        >
          {addresses.map((address) => {
            return (
              <Radio
                style={{
                  display: 'block',
                }}
                value={address._id}
              >
                <Row align="middle">
                  <Col xs={24}>
                    <Card
                      style={{
                        width: '100%',
                      }}
                    >
                      {/* <h4 className="account-title">Billing address</h4> */}
                      <div className="account-address mt-30">
                        <h6 className="name">{address.label}</h6>
                        <p>
                          {address.address && address.address.street} <br />{' '}
                          {address.address && address.address.city},{' '}
                          {address.address && address.address.state}
                        </p>
                        <p>{address.nearbyLocation}</p>
                      </div>
                    </Card>
                  </Col>
                </Row>
              </Radio>
            );
          })}
        </Radio.Group>
      </form>
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
    </div>
  </>;

  return (
    <div className="cart-shipping mt-50">
      {isDisabled ? <Spin
        spinning={isDisabled}
        indicator={null}
        style={{
          width: '100%',
          maxHeight: '100%',
          height: 400,
          marginBottom: 20,
        }}
      >
        {shipAddress}
      </Spin> : shipAddress}
    </div>
  );
}
