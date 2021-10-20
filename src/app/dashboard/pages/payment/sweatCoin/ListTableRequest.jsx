import { DatePicker, Row, Spin, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PageLayout from 'app/dashboard/components/ListTable/PageLayout';
import moment from 'moment';
import { handleError } from 'services/util';
import api from '../../../api';
import { LoadingOutlined } from '@ant-design/icons';

const rowStyle = {
  width: "100%",
};

export default function ListTableRequest({
  title,
  breadCrumb,
  addButton,
  columnData,
  apiURL,
}) {
  const history = useHistory();
  const [filteredInfo, setFilteredInfo] = useState(null);
  const [rowsData, setRowsData] = useState([]);
  const [tempData, setTempData] = useState([]);
  const [spinning, setSpinning] = useState(false);
  const [selectedRowsKey, setSelectedRowsKey] = useState([]);
  const [loadingRows, setLoadingRows] = useState([]);
  const [key, setKey] = useState(0);

  const unsetLoading = (indexToBeUpdate) => {
    setLoadingRows((prevArr) => {
      function removeItemOnce(arr, value) {
        var index = arr.indexOf(value);
        if (index > -1) {
          arr.splice(index, 1);
          return removeItemOnce(arr, value);
        }
        return arr;
      }

      return removeItemOnce(prevArr, indexToBeUpdate);
    });
    setKey(Math.random());
  };

  const syncData = (data) => {
    setData(data);
    setRowsData(
      data?.list
        .map((each, idx) => ({ key: idx, ...each }))
        .sort(
          (a, b) =>
            moment(b.createdDateTime).unix() - moment(a.createdDateTime).unix()
        )
    );
    setTempData(
      data.list
        .map((each, idx) => ({ key: idx, ...each }))
        .sort(
          (a, b) =>
            moment(b.createdDateTime).unix() - moment(a.createdDateTime).unix()
        )
    );
  };
  const [data, setData] = useState(null);
  const [dateRange, setDateRange] = useState([
    moment().subtract(7, "days"),
    moment(),
  ]);
  useEffect(() => {
    onRefreshData();
  }, [dateRange]);

  const onRefreshData = () => {
    if (dateRange && dateRange[0] && dateRange[1]) {
      setSpinning(true);
      api.payment
        .sweat_coin(dateRange[0], dateRange[1])
        .then(({ data }) => syncData(data))
        .catch(handleError)
        .finally(() => setSpinning(false));
    }
  };

  const onReset = () => {
    setFilteredInfo(null);
    setTempData(rowsData);
  };

  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    // this.setState({
    //   filteredInfo: filters,
    //   sortedInfo: sorter,
    // });
  };

  const spinningText = (text) => (spinning ? <LoadingOutlined /> : text);
  return (
    <Row style={rowStyle}>
      <PageLayout
        showActions={false}
        rowsData={rowsData}
        title={title}
        breadCrumb={breadCrumb}
        // onReset={onReset}
      >
        <Row style={{ ...rowStyle, marginTop: 40 }}>
          <Row style={rowStyle} justify="end">
            <DatePicker.RangePicker
              bordered={false}
              size="large"
              value={dateRange}
              onChange={(date) => setDateRange(date)}
              disabledDate={(current) =>
                current && current > moment().endOf("day")
              }
              ranges={{
                Today: [moment(), moment()],
                Yesterday: [
                  moment().startOf("day").subtract(1, "day"),
                  moment(),
                ],
                "Last 7 days": [
                  moment().startOf("day").subtract(7, "day"),
                  moment(),
                ],
                "This Week": [moment().startOf("week"), moment()],
                "Last week": [
                  moment().subtract(1, "weeks").startOf("week"),
                  moment().subtract(1, "weeks").endOf("week"),
                ],
                "This Month": [moment().startOf("month"), moment()],
                "Last Month": [
                  moment().subtract(1, "months").startOf("month"),
                  moment().subtract(1, "months").endOf("month"),
                ],
                "This year": [moment().startOf("year"), moment()],
                "Last Year": [
                  moment().subtract(1, "years").startOf("year"),
                  moment().subtract(1, "years").endOf("year"),
                ],
                Lifetime: [moment("2020/04/20").startOf("year"), moment()],
              }}
            />
          </Row>

          <Row style={{ ...rowStyle }}>
            <div className="col-sm-6">
              <div className="form-group">
                <label>Total Worth amount on wallet</label>
                <p>{spinningText(data?.total)}</p>
              </div>
            </div>
          </Row>
          <Spin spinning={spinning}>
            <Table
              style={{ whiteSpace: "pre" }}
              columns={columnData}
              dataSource={tempData}
              onChange={handleChange}
            />
          </Spin>
        </Row>
      </PageLayout>
    </Row>
  );
}
