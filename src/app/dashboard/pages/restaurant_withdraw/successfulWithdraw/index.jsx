import { Row } from 'antd';
import api from 'app/dashboard/api';
import routeURL from 'config/routeURL';
import React from 'react';
import './index.css';
import { DateColumn, NumberColumn, StringColumn, } from 'app/dashboard/components/column';
import ListTable from '../../../components/ListTable';

const rowStyle = {
  width: "100%",
};

const title = 'Restaurant Successful Withdraw';
export default function SuccessfulWithdraw() {
  const columns = [
    StringColumn("Name", "restaurant", (restaurant) => restaurant?.name),
    NumberColumn('Withdraw Amount', 'amount'),
    DateColumn('Date', 'createdDateTime')
  ];
    return (
        <Row style={{...rowStyle, padding: '24px 40px'}}>
            <ListTable
              noAction
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
                columnData={columns}
                apiURL={{
                    get: api.restaurant_withdraw.successful
                }}
            />
        </Row>
    );
}
