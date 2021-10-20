import { Avatar, Row } from "antd";
import api from "app/dashboard/api";
import routeURL from "config/routeURL";
import React, { useEffect, useState } from "react";
import "./index.css";
import {
  ImageColumn,
  StringColumn,
} from "app/dashboard/components/column/index";
import { handleError } from "services/util";
import { Link } from "react-router-dom";
import ListTableRequest from "./ListTableRequest";
import RiderName from "app/dashboard/components/user/rider/RiderName";

const rowStyle = {
    width: '100%',
};

const title = 'Active Riders';
export default function RiderRequest() {
    const columns = [
        ImageColumn('photo'),
        StringColumn("Name", "rider", (_, rider) => (
            <RiderName rider={rider} />
        )),
        StringColumn('Gender', 'gender'),
        StringColumn('Phone', 'phone'),
        // StringColumn('Vehicle', 'vehicle'),
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
                columnData={columns}
                apiURL={{
                    get: api.rider.readAll,
                    delete: api.rider.delete,
                    deleteMany: api.rider.deleteMany,
                    toggle: api.rider.toggle,
                }}
            />
        </Row>
    );
}
