import { Row } from "antd";
import api from "app/dashboard/api";
import ListTable from "app/dashboard/components/ListTable";
import routeURL from "config/routeURL";
import React, { useState } from "react";
import "./index.css";
import {
  DateColumn,
  ImageColumn, NumberColumn,
  StringColumn,
} from "app/dashboard/components/column/index";
import CustomerName from "app/dashboard/components/user/customer/CustomerName";
import RiderName from "app/dashboard/components/user/rider/RiderName";

const rowStyle = {
  width: "100%",
};

const title = "Rider Review";
export default function CustomerReview() {
  const columns = [
    StringColumn("Rider Name", "rider", (rider)=><RiderName rider={rider} />),
    StringColumn("Review By (Customer)", "customer", (customer)=><CustomerName customer={customer} />),
    NumberColumn("Rating", "rating"),
    StringColumn("Review", "review"),
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
            // addButton={{
            //   title: `Add ${title}`,
            //   url: routeURL.cms.customer_review_add,
            // }}
            // edit={{
            //   url: routeURL.cms.customer_review_edit,
            //   title: 'Duplicate'
            // }}
            // preview={{
            //   url: routeURL.cms.customer_review_view,
            // }}
            columnData={columns}
            apiURL={{
              get: api.review.rider.readAll,
              delete: api.review.rider.delete,
              deleteMany: api.review.rider.deleteMany,
              toggle: api.review.rider.toggle,
            }}
        />
      </Row>
  );
}
