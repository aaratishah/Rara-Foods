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

const title = 'Tax';
export default function Tax() {
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
      title: 'Tax (%)',
      dataIndex: 'tax',
      key: 'tax',
      sorter: (a, b) => a.tax - b.tax,
      sortDirections: ['descend', 'ascend'],
      ellipsis: true,
      render: (columnData) => (
        <div
          style={{
            whiteSpace: 'pre-line',
          }}
        >
          {columnData} %
        </div>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
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
          url: routeURL.cms.tax_add(),
        }}
        edit={{
          url: routeURL.cms.tax_edit,
        }}
        columnData={columns}
        apiURL={{
          get: api.tax.readAll,
          delete: api.tax.delete,
          deleteMany: api.tax.deleteMany,
          toggle: api.tax.toggle,
        }}
      ></ListTable>
    </Row>
  );
}
