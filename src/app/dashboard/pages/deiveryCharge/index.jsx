import { Row } from 'antd';
import api from 'app/dashboard/api';
import ListTable from 'app/dashboard/components/ListTable';
import routeURL from 'config/routeURL';
import moment from 'moment';
import './index.css';

const rowStyle = {
  width: '100%',
};

const imageStyle = {
  cursor: 'pointer',
  //   border: '1px solid',
};

const title = 'Delivery Charge';
export default function deliveryCharge() {
  const columns = [
    {
      title: 'Title',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
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
      title: `Base Charge (${process.env.REACT_APP_CURRENCY_SYMBOL})`,
      dataIndex: 'baseCharge',
      key: 'baseCharge',
      sorter: (a, b) => a.baseCharge - b.baseCharge,
      sortDirections: ['descend', 'ascend'],
      ellipsis: true,
      render: (columnData) => (
        <div
          style={{
            whiteSpace: 'pre-line',
          }}
        >
          {process.env.REACT_APP_CURRENCY_SYMBOL} {columnData}
        </div>
      ),
    },
    {
      title: `Charge Per K.M (${process.env.REACT_APP_CURRENCY_SYMBOL})`,
      dataIndex: 'charge',
      key: 'charge',
      sorter: (a, b) => a.charge - b.charge,
      sortDirections: ['descend', 'ascend'],
      ellipsis: true,
      render: (columnData) => (
        <div
          style={{
            whiteSpace: 'pre-line',
          }}
        >
          {process.env.REACT_APP_CURRENCY_SYMBOL} {columnData}
        </div>
      ),
    },
    {
      title: `Driver Commission (${process.env.REACT_APP_CURRENCY_SYMBOL})`,
      dataIndex: 'driverCommission',
      key: 'driverCommission',
      sorter: (a, b) => a.driverCommission - b.driverCommission,
      sortDirections: ['descend', 'ascend'],
      ellipsis: true,
      render: (columnData) => (
        <div
          style={{
            whiteSpace: 'pre-line',
          }}
        >
          {process.env.REACT_APP_CURRENCY_SYMBOL} {columnData}
        </div>
      ),
    },
    // {
    //   title: 'Description',
    //   dataIndex: 'description',
    //   key: 'description',
    //   ellipsis: true,
    //   render: (columnData) => (
    //     <div
    //       style={{
    //         whiteSpace: 'pre-line',
    //       }}
    //     >
    //       {columnData}
    //     </div>
    //   ),
    // },
    {
      title: 'Created At',
      dataIndex: 'createdDateTime',
      key: 'createdDateTime',
      render: (data) => (
        <div
          style={{
            whiteSpace: 'pre-line',
          }}
        >
          {moment(data).fromNow()}
        </div>
      ),
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) =>
        moment(a.createdDateTime).unix() - moment(b.createdDateTime).unix(),
    },
  ];
  return (
    <Row style={{ ...rowStyle, padding: '24px 40px' }}>
      
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
          url: routeURL.cms.shipping_charge_add(),
        }}
        edit={{
          url: routeURL.cms.shipping_charge_edit,
        }}
        columnData={columns}
        apiURL={{
          get: api.shipping_charge.readAll,
          delete: api.shipping_charge.delete,
          deleteMany: api.shipping_charge.deleteMany,
          toggle: api.shipping_charge.toggle,
        }}
      ></ListTable>
    </Row>
  );
}
