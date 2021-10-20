import { Row } from 'antd';
import api from 'app/dashboard/api';
import routeURL from 'config/routeURL';
import React from 'react';
import './index.css';
import { DateColumn, NumberColumn, StringColumn, } from 'app/dashboard/components/column';
import ListTableRequest from './ListTableRequest';
import RiderName from '../../../components/user/rider/RiderName';

const rowStyle = {
    width: '100%',
};

const title = 'Rider Withdraw Requests';
export default function WithdrawRequest() {

    const getBankDetail = (bank) => {
        return <div>
            <span>Bank: {bank?.name}</span>
        </div>
    }

    const columns = [
        StringColumn("Name", "rider", (rider) => (
            <RiderName rider={rider} />
        )),
        StringColumn("Payment", "paymentDetail", (paymentDetail) => (
            <span>
                {paymentDetail?.name}
                <br />
                {paymentDetail?.isBank ? getBankDetail() : paymentDetail?.phone}
            </span>
        )),
        NumberColumn('Withdraw Amount', 'amount'),
        DateColumn('Date', 'createdDateTime')
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
                preview={{
                    url: routeURL.cms.withdraw_request_view,
                }}
                columnData={columns}
                apiURL={{
                    get: api.withdraw.request.readAll,
                    delete: api.withdraw.request.delete,
                    deleteMany: api.withdraw.request.deleteMany,
                    toggle: api.withdraw.request.toggle,
                }}
            />
        </Row>
    );
}
