import { Row } from 'antd';
import api from 'app/dashboard/api';
import React from 'react';
import { DateColumn, NumberColumn, StringColumn, } from 'app/dashboard/components/column';
import ListTable from 'app/dashboard/components/ListTable';

const rowStyle = {
    width: '100%',
};

const title = 'Withdraw Requests';
export default function WithdrawRequest({refreshAllData=true}) {
    const columns = [
        NumberColumn('Withdraw Amount', 'amount'),
        StringColumn('Transaction Status', 'transactionStatus'),
        DateColumn('Date', 'createdDateTime')
    ];
    return (
        <Row style={{...rowStyle, padding: '24px 40px'}}>
            <ListTable
              noAction
                refreshAllData={refreshAllData}
                title={title}
                columnData={columns}
                apiURL={{
                    get: api.restaurant_withdraw.user,
                }}
            />
        </Row>
    );
}
