import { Avatar, Row } from "antd";
import api from "app/dashboard/api";
import routeURL from "config/routeURL";
import React, { useEffect, useState } from "react";
import "./index.css";
import {
    DateColumn,
    ImageColumn,
    StringColumn,
} from "app/dashboard/components/column/index";
import { handleError } from "../../../../../services/util";
import { Link } from "react-router-dom";
import ListTableRequest from "./ListTableRequest";
import RiderName from "../../../components/user/rider/RiderName";

const rowStyle = {
    width: '100%',
};

const title = 'Earning';
export default function Earning() {
    useEffect(() => {
        api.systemData.vehicle_type
            .readAll()
            .then(({ data }) => {
            //
            })
            .catch(handleError);
    }, []);

    const columns = [
        DateColumn("Ride on", "createdDateTime"),
        StringColumn('Fare Received', 'fare', (fare) => {
            return fare?.fareAmount
        }),
        StringColumn('Rider Fee', 'commission', (commission) => {
            return <span>{commission?.charge} % <br/>
            (H. {commission?.fee})
            </span>;
        }),
        StringColumn('Company Profit', 'commission', (commission) => {
            return <span>{(100-commission?.charge)} % <br/>
            (H. {commission?.companyCommission})
            </span>;
        }),
        // StringColumn('Profit', 'fare', (fare, row) => {
        //     return (fare?.fareAmount || 0) - (row?.commission?.fee);
        // }),
    ];
    return (
        <Row style={{...rowStyle, padding: '24px 40px'}}>
            <ListTableRequest
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
                // edit={{
                //     url: routeURL.cms.commission_edit,
                // }}
                // preview={{
                //     url: routeURL.cms.commission_view,
                // }}
                columnData={columns}
                apiURL={{
                    get: api.rider.readAll,
                    // delete: api.systemData.commission.delete,
                    // deleteMany: api.systemData.commission.deleteMany,
                    // toggle: api.systemData.commission.toggle,
                }}
            />
        </Row>
    );
}
