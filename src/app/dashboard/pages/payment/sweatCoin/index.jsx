import { Avatar, Row } from "antd";
import api from "app/dashboard/api";
import routeURL from "config/routeURL";
import React, { useEffect, useState } from "react";
import "./index.css";
import {
    DateColumn,
    ImageColumn, NumberColumn,
    StringColumn,
} from "app/dashboard/components/column/index";
import { handleError } from "../../../../../services/util";
import ListTableRequest from "./ListTableRequest";
import RiderName from "../../../components/user/rider/RiderName";

const rowStyle = {
    width: '100%',
};

const title = 'Rider Wallet Load';
export default function SweatCoin() {
    const columns = [
        DateColumn("Loaded on", "createdDateTime"),
        StringColumn('Rider', 'rider', (rider) => <RiderName rider={rider} /> ),
        NumberColumn('Balance Loaded', 'amount', ),
        StringColumn('Source', 'source'),
        StringColumn('Transaction Status', 'transactionStatus'),
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

            />
        </Row>
    );
}
