import { Row } from 'antd';
import api from 'app/dashboard/api';
import ListTable from 'app/dashboard/components/ListTable';
import routeURL from 'config/routeURL';
import './index.css';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { DateColumn, StringColumn } from 'app/dashboard/components/column';

const rowStyle = {
  width: '100%',
};

export default function Restaurant() {
  const columns = [
    StringColumn('Name','name'),
    StringColumn('Phone Number','phoneNumber'),
    StringColumn('Address','address',(address)=>`${address?.street}, ${address?.city}`),
    StringColumn('Email','email'),
    StringColumn('Website','website',(url) => <div
      style={{
        whiteSpace: 'pre-line',
      }}
    >
      <Link
        target="_blank"
        to={url}
        style={{
          color: '#40a9ff',
          textDecoration: 'none',
        }}
      >
        {url}
      </Link>
    </div>),
    DateColumn('Created At','createdDateTime'),
  ];
  return (
    <Row style={{
      ...rowStyle,
      padding: '24px 40px'
    }}>
      <ListTable
        title="Restaurant"
        breadCrumb={[
          {
            title: 'Home',
            url: routeURL.cms.home(),
          },
          {
            title: 'Restaurant',
            url: false,
          },
        ]}
        // addButton={{
        //   title: 'Add Restaurant',
        //   url: routeURL.cms.restaurant_add(),
        // }}
        edit={{
          url: routeURL.cms.restaurant_edit,
        }}
        columnData={columns}
        apiURL={{
          get: api.restaurant.readAll,
          delete: api.restaurant.delete,
          deleteMany: api.restaurant.deleteMany,
          toggle: api.restaurant.toggle,
        }}
      />
    </Row>
  );
}
