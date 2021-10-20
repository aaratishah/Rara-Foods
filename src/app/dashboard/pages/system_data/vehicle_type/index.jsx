import { Row } from "antd";
import api from "app/dashboard/api";
import ListTable from "app/dashboard/components/ListTable";
import routeURL from "config/routeURL";
import React, { useEffect, useState } from "react";
import { handleError } from "../../../../../services/util";
import "./index.css";
import {
  StringColumn,
  ImageColumn,
  DateColumn,
  NumberColumn,
} from "app/dashboard/components/column/index";
import { Link } from "react-router-dom";

const rowStyle = {
  width: "100%",
};

const title = "Vehicle Type";
export default function VehicleType() {
  const [spinning, setSpinning] = useState(false);
  const [fares, setFares] = useState([]);
  const [commissions, setCommissions] = useState([]);

  useEffect(() => {
    setSpinning(true);
    api.systemData.fare
      .readAll()
      .then(({ data }) => setFares(data))
      .catch(handleError);

    api.systemData.commission
      .readAll()
      .then(({ data }) => setCommissions(data))
      .catch(handleError);
  }, []);

  const columns = [
    ImageColumn("icon"),
    StringColumn("Name", "name"),
    StringColumn("Commission", "commission", (value) => {
      const col = commissions.find(
        (e) => e._id.toString() === value.toString()
      );
      if (col)
        return <Link to={routeURL.cms.commission_view(value)}>{col.name}</Link>;
    }),
    StringColumn("Fare", "fare", (value) => {
      const col = fares.find((e) => e._id.toString() === value.toString());
      if (col)
        return <Link to={routeURL.cms.fare_view(value)}>{col.name}</Link>;
    }),
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
          url: routeURL.cms.vehicle_type_add,
        }}
        edit={{
          url: routeURL.cms.vehicle_type_edit,
        }}
        preview={{
          url: routeURL.cms.vehicle_type_view,
        }}
        columnData={columns}
        apiURL={{
          get: api.systemData.vehicle_type.readAll,
          delete: api.systemData.vehicle_type.delete,
          deleteMany: api.systemData.vehicle_type.deleteMany,
          toggle: api.systemData.vehicle_type.toggle,
        }}
      />
    </Row>
  );
}
