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
import RiderName from "../../../components/user/rider/RiderName";
import RiderNotify from "../../../components/singleNotification/RiderNotify";
import {Link} from "react-router-dom";
import {EnterOutlined, EyeFilled} from "@ant-design/icons";

const rowStyle = {
  width: "100%",
};

const title = "Rider Query";
export default function RiderQuery() {
  const columns = [
    StringColumn("Rider", "rider", (rider)=><RiderName rider={rider} />),
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
        actions={(row) => <RiderNotify subject={`Reply to: "${row?.subject}"`} rider = {row?.rider}>
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
        </RiderNotify>}
        // addButton={{
        //   title: `Add ${title}`,
        //   url: routeURL.cms.rider_review_add,
        // }}
        // edit={{
        //   url: routeURL.cms.rider_review_edit,
        //   title: 'Duplicate'
        // }}
        preview={{
          url: routeURL.cms.rider_query_view,
        }}
        columnData={columns}
        apiURL={{
          get: api.query.rider.readAll,
          delete: api.query.rider.delete,
          deleteMany: api.query.rider.deleteMany,
          toggle: api.query.rider.toggle,
        }}
      />
    </Row>
  );
}
