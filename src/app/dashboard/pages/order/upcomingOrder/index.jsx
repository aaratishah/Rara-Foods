import { Modal, Row, Space } from 'antd';
import api from 'app/dashboard/api';
import ListTable from 'app/dashboard/components/ListTable';
import OrderPreview from 'app/dashboard/pages/order/pendingOrder/OrderPreview';
import routeURL from 'config/routeURL';
import moment from 'moment';
import { useState } from 'react';
import { DateColumn, StringColumn } from 'app/dashboard/components/column';
import { handleError } from 'services/util';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { notificationSuccess } from 'app/web/components/notification';

const rowStyle = {
  width: '100%',
};

const title = 'Upcoming Order';
export default function UpcomingOrder() {
  const [orderId, setOrderId] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [refreshData, setRefreshData] = useState(false);
  const onFetchAllData = () => setRefreshData((refreshData) => !refreshData);

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'orderId',
      key: 'orderId',
      sorter: (a, b) => a.orderId.localeCompare(b.orderId),
      sortDirections: ['descend', 'ascend'],
      ellipsis: true,
      render: (columnData) => (
        <div
          style={{
            whiteSpace: 'pre-line',
          }}
        >
          {columnData}
        </div>
      ),
    },
    {
      title: 'Foods',
      dataIndex: 'cartId',
      key: 'cartId',
      sorter: (a, b) => (a.cartId ? a.cartId.foods.length : 0) - (b.cartId ? b.cartId.foods.length : 0),
      sortDirections: ['descend', 'ascend'],
      ellipsis: true,
      render: (cartId) => (
        <div
          style={{
            whiteSpace: 'pre-line',
          }}
        >
          {cartId && cartId.foods.length}
        </div>
      ),
    },
    StringColumn("Restaurant",'restaurantId', (restaurant) => {
      return <div
        style={{
          whiteSpace: 'pre-line',
        }}
      >
        {restaurant.name}
      </div>
    }),
    {
      title: 'User\'s Name',
      dataIndex: 'clientId',
      key: 'user',
      sorter: (a, b) => a.clientId.name.localeCompare(b.clientId.name),
      sortDirections: ['descend', 'ascend'],
      ellipsis: true,
      render: (user) => (
        <div
          style={{
            whiteSpace: 'pre-line',
          }}
        >
          {user.name}
        </div>
      ),
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      sorter: (a, b) => a.totalPrice - b.totalPrice,
      sortDirections: ['descend', 'ascend'],
      ellipsis: true,
      render: (totalPrice) => (
        <div
          style={{
            whiteSpace: 'pre-line',
          }}
        >
          {totalPrice}
        </div>
      ),
    },
    // StringColumn('Payment', 'paymentMode'),
    // StringColumn('Payment Status', 'paymentStatus'),
    // StringColumn('Order Status', 'status'),

    DateColumn('Schedule At',"scheduledDate"),
    DateColumn('Created At',"createdDateTime"),
  ];

  function moveToPending(row) {
    Modal.confirm({
      title: `Do you want to move this order to Pending list?`,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        return new Promise((resolve, reject) => {
          api.order
            .orderStatus(row._id, 'checkedOut')
            .then(({ message }) => {
              setRefreshData(value => !value);
              resolve(notificationSuccess(message));
            })
            .catch(reject(handleError()))
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
      <OrderPreview
        noAction
        refresh={onFetchAllData}
        isGuest={false}
        orderId={orderId}
        previewVisible={previewVisible}
        setPreviewVisible={setPreviewVisible}
      />
      <ListTable
        refreshAllData={refreshData}
        actions={(row) => {
          return <Space size={8}><span
            style={{
              cursor: 'pointer',
              color: 'teal',
            }}
            onClick={()=>moveToPending(row)}
          >
              Process
            </span>
            <span
              style={{
                cursor: 'pointer',
                color: 'teal',
              }}
              onClick={() => {
                setOrderId(row._id);
                setPreviewVisible(true);
              }}
            >
              Preview
            </span></Space>;
        }}
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
          get: api.order.upcomingOrder,
          delete: api.order.delete,
          deleteMany: api.order.deleteMany,
          toggle: api.order.toggle,
        }}
      />
    </Row>
  );
}
