import {Avatar, Row} from "antd";
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

const title = "Coupon Code";
export default function CouponCode() {
  const [vehicleType, setVehicleType] = useState([]);
  useEffect(() => {
    api.systemData.vehicle_type
        .readAll()
        .then(({ data }) => setVehicleType(data))
        .catch(handleError);
  }, []);

  const columns = [
    StringColumn("Title", "name"),
    StringColumn("Coupon Code", "couponCode"),
    StringColumn('Vehicle', 'vehicleType',(value) => {
      const col = vehicleType.find(each => each._id.toString() === value.toString());
      if(col) return <Link to={routeURL.cms.vehicle_type_view(col._id)} >{col.name}</Link>;
    }),
    NumberColumn("Max Usage", "usage"),
    NumberColumn("Per customer", "perCustomer"),
    NumberColumn("Used", "couponUsed"),
    DateColumn("Created At", "createdDateTime"),
    DateColumn("Expire At", "expiredAt"),
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
          url: routeURL.cms.coupon_code_add,
        }}
        edit={{
          url: routeURL.cms.coupon_code_edit,
        }}
        preview={{
          url: routeURL.cms.coupon_code_view,
        }}
        columnData={columns}
        apiURL={{
          get: api.coupon.coupon_code.readAll,
          delete: api.coupon.coupon_code.delete,
          deleteMany: api.coupon.coupon_code.deleteMany,
          toggle: api.coupon.coupon_code.toggle,
        }}
      />
    </Row>
  );
}
