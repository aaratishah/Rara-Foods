import { Avatar, Row } from "antd";
import api from "app/dashboard/api";
import routeURL from "config/routeURL";
import React, { useEffect, useState } from "react";
import "./index.css";
import {
    BoolColumn, DateColumn,
    ImageColumn, NumberColumn,
    StringColumn,
} from "app/dashboard/components/column/index";
import { handleError } from "../../../../../services/util";
import { Link } from "react-router-dom";
import ListTableRequest from "./ListTableRequest";
import RiderName from "../../../components/user/rider/RiderName";
import CustomerName from "../../../components/user/customer/CustomerName";
import ListTable from "../../../components/ListTable";

const rowStyle = {
    width: '100%',
};

const title = 'Ride History';
export default function RideHistory() {

    const columns = [
        StringColumn("Rider", "rider", (rider)=><RiderName rider={rider} />),
        StringColumn("Customer", "customer", (customer)=><CustomerName customer={customer} />),
        StringColumn('Vehicle', 'vehicleType',(vehicleType) => {
            return <span>
                {vehicleType?.name || 'N/A' }
            </span>
        }),
        StringColumn('Origin', 'origin',(origin) => {
            return <span>
                {origin?.address || 'N/A' }
            </span>
        }),StringColumn('Destination', 'destination',(destination) => {
            return <span>
                {destination?.address || 'N/A' }
            </span>
        }),
        NumberColumn('Fare', 'fareAmount',60),
        NumberColumn('Distance (m)', 'distance'),
        BoolColumn('Coupon', 'coupon', null, 65),
        DateColumn('Date', 'startTime')
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
                // addButton={{
                //     title: `Add Rider`,
                //     url: routeURL.cms.rider_request_add,
                // }}
                // edit={{
                //     url: routeURL.cms.commission_edit,
                // }}
                preview={{
                    url: routeURL.cms.commission_view,
                }}
                columnData={columns}
                apiURL={{
                    get: api.ride.history.readAll,
                }}
            />
        </Row>
    );
}
