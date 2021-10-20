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

const title = 'Suspended Riders';
export default function RiderRequest() {
    const columns = [
        ImageColumn('photo'),
        StringColumn("Name", "rider", (_, rider) => (
            <RiderName rider={rider} />
        )),
        StringColumn('Gender', 'gender'),
        StringColumn('Phone', 'phone'),
        DateColumn('Suspend end', 'suspendEndDate'),
        StringColumn('Vehicle', 'vehicle',),
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
                edit={{
                    url: routeURL.cms.rider_request_edit(),
                }}
                columnData={columns}
                apiURL={{
                    get: api.rider.read_suspend,
                    delete: api.rider.delete,
                    deleteMany: api.rider.deleteMany,
                    toggle: api.rider.toggle,
                }}
            />
        </Row>
    );
}
