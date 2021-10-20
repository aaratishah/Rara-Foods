import {Avatar, Col, Row} from "antd";
import api from "app/dashboard/api";
import routeURL from "config/routeURL";
import React, { useEffect, useState } from "react";
import "./index.css";
import {
    ImageColumn,
    StringColumn,
} from "app/dashboard/components/column/index";
import { handleError } from "../../../../../services/util";
import { Link } from "react-router-dom";
import ListTable from "../../../components/ListTable";
import RiderName from "../../../components/user/rider/RiderName";
import RiderNotify from "../../../components/singleNotification/RiderNotify";
import {EnterOutlined} from "@ant-design/icons";
import moment from "moment";

const rowStyle = {
    width: "100%",
};

const title = 'Expiring Documents';
export default function RejectedRiders() {
    const columns = [
        ImageColumn('photo'),
        StringColumn("Name", "rider", (rider) => (
            <RiderName rider={rider} />
        )),
        StringColumn("License", "license", (license) => {
            if(!license) return 'N/A';
            else  return moment(license.expireDate).fromNow();
        }),
        StringColumn("BlueBook", "blueBook", (blueBook) => {
            if(!blueBook) return null;
            else  return moment(blueBook.expireDate).fromNow();
        }),
        StringColumn("Insurance", "insurance", (insurance) => {
            if(!insurance) return null;
            else  return moment(insurance.expireDate).fromNow();
        }),
        StringColumn('Phone', 'phone'),

    ];
    return (
        <Row style={{...rowStyle, padding: '24px 40px'}}>
            <ListTable
                actions={(row) => <RiderNotify subject={`Your Document is Expiring soon`} rider = {row?.rider}>
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
                                Notify the Rider
                            </div>
                        </Col>
                    }
                </RiderNotify>}
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
                    get: api.rider.expiring_document,
                }}
            />
        </Row>
    );
}
