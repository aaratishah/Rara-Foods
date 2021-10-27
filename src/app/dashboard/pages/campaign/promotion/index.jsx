import { Row } from 'antd';
import api from 'app/dashboard/api';
import ListTable from 'app/dashboard/components/ListTable';
import routeURL from 'config/routeURL';
import React from 'react';
import './index.css';
import { DateColumn, NumberColumn, StringColumn, } from 'app/dashboard/components/column/index';

const rowStyle = {
  width: "100%",
};

const title = "Promotion";
export default function Promotion() {
  const columns = [
    NumberColumn("Campaign", "campaignName"),
    StringColumn("Message", "message"),
    DateColumn("Created At", "createdDateTime"),
  ];
  return (
    <Row style={{ ...rowStyle, padding: "24px 40px" }}>
      <ListTable
        title={title}
        breadCrumb={[
          {
            title: "Home",
            url: routeURL.cms.home(),
          },
          {
            title: title,
            url: false,
          },
        ]}
        // actions={true}
        addButton={{
          title: `Add Promotion`,
          url: routeURL.cms.promotion_add,
        }}
        columnData={columns}
        apiURL={{
          get: api.settings.readPromotion,
        }}
      />
    </Row>
  );
}