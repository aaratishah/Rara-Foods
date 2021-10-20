import { Button, Card, Col, message, Modal, Row, Tabs, Typography } from 'antd';
import WithdrawRequest from 'app/dashboard/pages/restaurant/wallet/request';
import { useEffect, useState } from 'react';
import api from 'app/dashboard/api';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { notificationSuccess } from 'app/web/components/notification';
import { handleError } from 'services/util';

const rowStyle = {
  width: '100%',
};

export default function RestaurantWallet() {
  const [refreshData, setRefreshData] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [wallet, setWallet] = useState(null);
  useEffect(() => {
    api.restaurant.wallet()
      .then(({ data }) => setWallet(data))
      .catch(handleError)
      .finally(() => setSpinning(false));
  }, []);

  const balance = wallet?.availableBalance || 0;
  function requestWithdraw() {
    Modal.confirm({
      title: `Do you want to withdraw ${process.env.REACT_APP_CURRENCY_SYMBOL}${balance}?`,
      icon: <ExclamationCircleOutlined />,
      content: 'This will send the request for withdrawing the amount to the company.',
      onOk() {
        return new Promise((resolve, reject) => {
          api.restaurant_withdraw.requestWithdraw()
            .then(({ message }) => {
              setRefreshData(value => !value);
              resolve(notificationSuccess(message));
            })
            .catch(reject(handleError()))
            .finally(() => setSpinning(false));
        }).catch(() => console.log('Oops errors!'));
      },
      onCancel() {},
    });
  }
  return (
    <Row style={{
      ...rowStyle,
      padding: '24px 40px'
    }}>
     <Row gutter={16} justify="space-between" align="middle" style={{
       padding: 30,
       width: '100%',
       backgroundColor: '#ececec'
     }
     }>
       <Col>
         <Card>
           <Typography.Title level={4}>
             Balance
           </Typography.Title>
           <Typography.Title level={2}>
             {process.env.REACT_APP_CURRENCY_SYMBOL}{balance}
           </Typography.Title>
         </Card>
       </Col>
       <Col>
         <Button onClick={requestWithdraw} type='primary'>Request for withdraw</Button>
       </Col>
     </Row>
      <WithdrawRequest refreshAllData={refreshData} />
    </Row>
  );
}
