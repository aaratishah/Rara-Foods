import {Row} from 'antd';
import api from 'app/dashboard/api';
import ListTable from 'app/dashboard/components/ListTable';
import routeURL from 'config/routeURL';
import React from 'react';
import './index.css';
import { StringColumn, DateColumn, NumberColumn } from "app/dashboard/components/column/index";

const rowStyle = {
    width: '100%',
};

const title = 'Commission';
export default function Commission() {

    const columns = [
        StringColumn('Name', 'name'),
        NumberColumn('Charge (in %)', 'charge'),
        DateColumn('Created At', 'createdDateTime')
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
                addButton={{
                    title: `Add ${title}`,
                    url: routeURL.cms.commission_add,
                }}
                edit={{
                    url: routeURL.cms.commission_edit,
                }}
                preview={{
                    url: routeURL.cms.commission_view,
                }}
                columnData={columns}
                apiURL={{
                    get: api.systemData.commission.readAll,
                    delete: api.systemData.commission.delete,
                    deleteMany: api.systemData.commission.deleteMany,
                    toggle: api.systemData.commission.toggle,
                }}
            />
        </Row>
    );
}
