import {Button, Col, Form, Row} from "antd";
import api from "app/dashboard/api";
import ListTable from "app/dashboard/components/ListTable";
import routeURL from "config/routeURL";
import React from "react";
import "./index.css";
import {
  DateColumn,
  NumberColumn,
  StringColumn,
} from "app/dashboard/components/column/index";
import CustomerName from "../../../components/user/customer/CustomerName";
import CustomerNotify from "../../../components/singleNotification/CustomerNotify";
import {Link} from "react-router-dom";
import {EnterOutlined, EyeFilled} from "@ant-design/icons";

const rowStyle = {
  width: "100%",
};

const title = "Customer Query";
export default function CustomerQuery() {
  const columns = [
    StringColumn("Customer", "customer", (customer)=><CustomerName customer={customer} />),
    NumberColumn("subject", "subject"),
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
        actions={(row) => <CustomerNotify subject={`Reply to: "${row?.subject}"`} customer = {row?.customer}>
          {(loading)=>
              <Col>
                  <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        cursor: "pointer",
                        color: "#40a9ff",
                      }}
                  >
                    <EnterOutlined style={{ marginRight: 5 }} />
                    Reply
                  </div>
              </Col>
          }
        </CustomerNotify>}
        // addButton={{
        //   title: `Add ${title}`,
        //   url: routeURL.cms.customer_review_add,
        // }}
        // edit={{
        //   url: routeURL.cms.customer_review_edit,
        //   title: 'Duplicate'
        // }}
        preview={{
          url: routeURL.cms.customer_query_view,
        }}
        columnData={columns}
        apiURL={{
          get: api.query.customer.readAll,
          delete: api.query.customer.delete,
          deleteMany: api.query.customer.deleteMany,
          toggle: api.query.customer.toggle,
        }}
      />
    </Row>
  );
}
