import { Row } from "antd";
import api from "app/dashboard/api";
import ListTable from "app/dashboard/components/ListTable";
import routeURL from "config/routeURL";
import React from "react";
import "./index.css";
import moment from "moment";
import {
  StringColumn,
  DateColumn,
  NumberColumn,
  BoolColumn,
} from "app/dashboard/components/column/index";

const rowStyle = {
  width: "100%",
};

const title = "Fare";
export default function Fare() {
  const columns = [
    // ImageColumn('image'),
    StringColumn("Name", "name"),
    NumberColumn(`Base (in ${process.env.REACT_APP_CURRENCY_SYMBOL})`, "base"),
    NumberColumn("Charge (in %)", "charge"),
    BoolColumn("Time Slab", "hasTimeSlab"),
    NumberColumn("Slab", "slab"),
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
        addButton={{
          title: `Add ${title}`,
          url: routeURL.cms.fare_add,
        }}
        edit={{
          url: routeURL.cms.fare_edit,
        }}
        preview={{
          url: routeURL.cms.fare_view,
        }}
        columnData={columns}
        apiURL={{
          get: api.systemData.fare.readAll,
          delete: api.systemData.fare.delete,
          deleteMany: api.systemData.fare.deleteMany,
          toggle: api.systemData.fare.toggle,
        }}
      />
    </Row>
  );
}
