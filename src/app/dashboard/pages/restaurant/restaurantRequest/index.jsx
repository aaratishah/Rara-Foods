import { Row } from 'antd';
import api from 'app/dashboard/api';
import routeURL from 'config/routeURL';
import React from 'react';
import './index.css';
import { DateColumn, ImageColumn, StringColumn, } from 'app/dashboard/components/column';
import ListTableRequest from './ListTableRequest';
import { Link } from 'react-router-dom';
import ListTable from 'app/dashboard/components/ListTable';

const rowStyle = {
    width: '100%',
};

const title = 'Restaurant Request';
export default function RestaurantRequest() {
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
        <Row style={{...rowStyle, padding: '24px 40px'}}>
            <ListTableRequest
                title={title}
                breadCrumb={[
                    {
                        title: 'Home',
                        url: routeURL.cms.home(),
                    },
                    {
                        title: title,
                        url: false,
                    },
                ]}
                addButton={{
                  title: 'Add Restaurant',
                  url: routeURL.cms.restaurant_add(),
                }}
                edit={{
                  url: routeURL.cms.restaurant_edit,
                }}
                columnData={columns}
                apiURL={{
                    get: api.restaurant.read_pending,
                    delete: api.restaurant.delete,
                    deleteMany: api.restaurant.deleteMany,
                    toggle: api.restaurant.toggle,
                }}
            />
        </Row>
    );
}
