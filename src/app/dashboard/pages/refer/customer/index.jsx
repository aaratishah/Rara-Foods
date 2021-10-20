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
import CustomerName from "app/dashboard/components/user/customer/CustomerName";
import RiderName from "app/dashboard/components/user/rider/RiderName";

const rowStyle = {
    width: '100%',
};

const title = 'Refer & Earn for Customer';
export default function Commission() {

    const columns = [
        StringColumn('Refer Code', 'referCode'),
        StringColumn('Customer Name', 'customer', (customer)=><CustomerName customer={customer} />),
        StringColumn('Referred By', 'usedReferer', (rider)=><RiderName rider={rider} />),
        NumberColumn('Benefited Amount', 'benefitedAmount'),
        DateColumn('Joined at', 'createdDateTime')
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
                    get: api.refer.customer_refer,
                    // delete: api.systemData.commission.delete,
                    // deleteMany: api.systemData.commission.deleteMany,
                    // toggle: api.systemData.commission.toggle,
                }}
            />
        </Row>
    );
}
