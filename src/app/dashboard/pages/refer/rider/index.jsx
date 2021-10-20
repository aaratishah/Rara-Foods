import { Row } from "antd";
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
import RiderName from "app/dashboard/components/user/rider/RiderName";
import CustomerName from "app/dashboard/components/user/customer/CustomerName";

const rowStyle = {
    width: '100%',
};

const title = 'Refer & Earn for Rider';
export default function Commission() {

    const columns = [
      StringColumn("Refer Code", "referCode"),
      StringColumn("Rider Name", "rider", (rider) => (
        <RiderName rider={rider} />
      )),
      StringColumn("Referred By", "usedReferer", (customer) => (
        <CustomerName customer={customer} />
      )),
      NumberColumn("Benefited Amount", "benefitedAmount"),
      DateColumn("Joined at", "createdDateTime"),
    ];
    return (
        <Row style={{...rowStyle, padding: '24px 40px'}}>
            <ListTable
                title={title}
                breadCrumb={[
                    {
                        title: 'Home',
                        url: routeURL.cms.home(),
                    },
                    {
                        title: title,
                        url: false,
                    },
                ]}
                columnData={columns}
                apiURL={{
                    get: api.refer.rider_refer,
                    // delete: api.systemData.commission.delete,
                    // deleteMany: api.systemData.commission.deleteMany,
                    // toggle: api.systemData.commission.toggle,
                }}
            />
        </Row>
    );
}
