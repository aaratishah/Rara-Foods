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
import RiderName from "../../../components/user/rider/RiderName";
import CustomerName from "../../../components/user/customer/CustomerName";

const rowStyle = {
  width: "100%",
};

const title = "Customer Review";
export default function CustomerReview() {
  const columns = [
    StringColumn("Customer Name", "customer", (customer)=><CustomerName customer={customer} />),
    StringColumn("Review By (Rider)", "rider", (rider)=><RiderName rider={rider} />),
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
          get: api.review.customer.readAll,
          delete: api.review.customer.delete,
          deleteMany: api.review.customer.deleteMany,
          toggle: api.review.customer.toggle,
        }}
      />
    </Row>
  );
}
