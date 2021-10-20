import { Row, Typography } from 'antd';
import MapViewer from 'app/dashboard/components/MapViewer';
import { mapCenterDefault } from 'config';

export default function ShippingAddress({ location, deliveryType }) {
  if(!location) return null;
  return (
    <>
      <Row style={{ minWidth: '100%' }}>
        <Typography.Title style={{ width: '100%' }} level={5}>
          Shipping Address
        </Typography.Title>
      </Row>
      {location.geo && location.geo.latitude && location.geo.longitude && (
        <Row
          style={{
            width: '100%',
            height: 300,
          }}
        >
          <MapViewer
            activeMarker={{
              ...location.geo,
              name: 'Shipping address',
            }}
            height={400}
            options={{
              zoom: 13,
              disableDefaultUI: true,
            }}
          />
        </Row>
      )}
      <Row>
        {deliveryType === 'pickup' && (
          <span
            style={{
              fontWeight: 600,
              fontSize: 16,
            }}
          >
            User choosed to Pick up the product
          </span>
        )}
        {location.address && location.address.street && (
          <span
            style={{
              fontWeight: 600,
              fontSize: 16,
            }}
          >
            Street: {location.address && location.address.street}
          </span>
        )}
        {location.address && location.address.city && (
          <span
            style={{
              width: '100%',
              fontWeight: 600,
              fontSize: 16,
            }}
          >
            City: {location.address.city}
          </span>
        )}
        {location.address && location.address.state && (
          <span
            style={{
              display: 'block',
              fontWeight: 400,
              color: '#aaa',
              fontSize: 16,
            }}
          >
            State: {location.address.state}
          </span>
        )}
        {location.address && location.address.zipCode && (
          <span
            style={{
              display: 'block',
              fontWeight: 400,
              color: '#aaa',
              fontSize: 16,
            }}
          >
            Zip: {location.address.zipCode}
          </span>
        )}
      </Row>
    </>
  );
}
