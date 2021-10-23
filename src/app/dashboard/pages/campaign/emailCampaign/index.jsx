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

const title = "Email Campaign";
export default function CustomerReview() {
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
          title: `Send Email`,
          url: routeURL.cms.email_campaign_add,
        }}
        // edit={{
        //   url: routeURL.cms.customer_review_edit,
        //   title: 'Duplicate'
        // }}
        // preview={{
        //   url: routeURL.cms.customer_review_view,
        // }}
        columnData={columns}
        apiURL={{
          get: api.settings.readSMS,
        }}
      />
    </Row>
  );
}
