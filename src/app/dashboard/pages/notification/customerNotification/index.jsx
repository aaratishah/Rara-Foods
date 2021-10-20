import { Row } from "antd";
import api from "app/dashboard/api";
import ListTable from "app/dashboard/components/ListTable";
import routeURL from "config/routeURL";
import React, { useState } from "react";
import "./index.css";
import {
  DateColumn,
  ImageColumn,
  StringColumn,
} from "app/dashboard/components/column/index";

const rowStyle = {
  width: "100%",
};

const title = "Customer Notification";
export default function CustomerNotification() {
  const columns = [
    ImageColumn("photo"),
    StringColumn("Campaign Name", "campaignName"),
    StringColumn("Title", "title"),
    // StringColumn("Body", "body"),
    DateColumn("Created At", "createdDateTime"),
    DateColumn("Expired At", "expiredAt"),
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
        actions={true}
        addButton={{
          title: `Add ${title}`,
          url: routeURL.cms.customer_notification_add,
        }}
        edit={{
          url: routeURL.cms.customer_notification_edit,
          title: 'Duplicate'
        }}
        preview={{
          url: routeURL.cms.customer_notification_view,
        }}
        columnData={columns}
        apiURL={{
          get: api.notification.customer.readAll,
          delete: api.notification.customer.delete,
          deleteMany: api.notification.customer.deleteMany,
          // toggle: api.notification.customer.toggle,
        }}
      />
    </Row>
  );
}
