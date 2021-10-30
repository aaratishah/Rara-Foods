import { DeleteFilled, EditFilled, EyeFilled } from '@ant-design/icons';
import { Col, message, Popconfirm, Row, Spin, Switch, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import _ from 'lodash';
import PageLayout from 'app/dashboard/components/ListTable/PageLayout';
import moment from 'moment';
import { handleError } from 'services/util';
import { useHotkeys } from 'react-hotkeys-hook';

const rowStyle = {
  width: '100%'
};

export default function ListTable({
  refreshAllData,
  title,
  breadCrumb,
  addButton,
  edit,
  preview = false,
  columnData,
  apiURL,
  actions = false
}) {
  const [refreshShortcut, setRefreshShortcut] = useState(false);
  useHotkeys('r', () => setRefreshShortcut((value) => !value));
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

  const onSwitchChange = (checked, index, row) => {
    setLoadingRows((prev) => [...prev, index]);
    apiURL
      .toggle(row._id, checked ? 'on' : 'off')
      .then((res) => {
        const newRow = {
          ...row,
          activeStatus: checked
        };
        var tempCopyData = [...tempData];
        tempCopyData[index] = newRow;
        syncData(tempCopyData);
      })
      .catch(handleError)
      .finally(() => unsetLoading(index));
  };

  const renderStatus = (activeStatus, row, idx) => {
    return (
      <Switch
        key={key}
        loading={loadingRows.includes(idx)}
        checked={activeStatus}
        onChange={(checked) => {
          onSwitchChange(checked, idx, row);
        }}
      />
    );
  };
  // useEffect(() => {
  let initialColumn = [];
  if (columnData) {
    initialColumn = [...columnData];
    apiURL.toggle &&
      initialColumn.push({
        width: 80,
        title: 'Status',
        dataIndex: 'activeStatus',
        filterMultiple: false,
        filteredValue: filteredInfo ? filteredInfo.activeStatus : null,
        filters: [
          {
            text: 'on',
            value: true
          },
          {
            text: 'off',
            value: false
          }
        ],
        onFilter: (value, record) => record.activeStatus === value,
        render: renderStatus
      });
    let width = 90;
    if (actions) width += 100;
    if (edit) width += 50;
    if (preview) width += 50;
    if (preview || edit || apiURL.delete || actions) {
      initialColumn.push({
        title: 'Actions',
        width: width,
        dataIndex: '_id',
        render: (rowId, row) => {
          return (
            <Row gutter={16} align="middle">
              {typeof actions === 'function' && actions(row)}
              {preview && (
                <Col>
                  <Link to={preview.url(rowId, row)}>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        cursor: 'pointer',
                        color: '#40a9ff'
                      }}
                    >
                      <EyeFilled style={{ marginRight: 5 }} />
                      View
                    </div>
                  </Link>
                </Col>
              )}
              {edit && (
                <Col>
                  <Link to={edit.url(rowId, row)}>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        cursor: 'pointer',
                        color: '#40a9ff'
                      }}
                    >
                      <EditFilled style={{ marginRight: 5 }} />
                      {edit.title || 'Edit'}
                    </div>
                  </Link>
                </Col>
              )}
              {apiURL.delete && (
                <Col>
                  <Popconfirm
                    title={`Are you sure delete this ${title}?`}
                    onConfirm={() => {
                      onDeleteRow(row.restaurant ? row.restaurant._id : rowId);
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        cursor: 'pointer',
                        color: 'red'
                      }}
                    >
                      <DeleteFilled style={{ marginRight: 5 }} />
                      Delete
                    </div>
                  </Popconfirm>
                </Col>
              )}
            </Row>
          );
        }
      });
    }

    // setColumns(intialColumn);
  }
  // }, [columnData]);

  const syncData = (data) => {
    setRowsData(
      data
        .map((each, idx) => {
          if (each.locationDetail) {
            each.locationDetail = each.locationDetail.geo.country;
          }
          if (each.by) {
            each.by = each.by.email;
          }
          if(each.restaurant && typeof(each.restaurant) === 'object' && each.restaurant !== null){
            each.name = each.restaurant.name
            each.address = each.restaurant.address
          }
          let data = { key: idx, ...each };
          console.log('feature', data);
          return data;
        })
        .sort(
          (a, b) =>
            moment(b.createdDateTime).unix() - moment(a.createdDateTime).unix()
        )
    );
    setTempData(
      data
        .map((each, idx) => ({ key: idx, ...each }))
        .sort(
          (a, b) =>
            moment(b.createdDateTime).unix() - moment(a.createdDateTime).unix()
        )
    );
  };
  // useEffect(() => {
  //   setSpinning(true);
  //   apiURL
  //     .get()
  //     .then(({ data }) => syncData(data))
  //     .catch((error) => {
  //       if (error && error.response && error.response.data)
  //         message.error(error.response.data.message);
  //     })
  //     .finally(() => setSpinning(false));
  // }, []);

  useEffect(() => {
    setSpinning(true);
    apiURL
      .get()
      .then(({ data }) => syncData(data))
      .catch(handleError)
      .finally(() => setSpinning(false));
  }, [refreshAllData, refreshShortcut]);

  const onRefreshData = () => {
    setSpinning(true);
    setSelectedRowsKey([]);
    apiURL
      .get()
      .then(({ data }) => syncData(data))
      .catch(handleError)
      .finally(() => setSpinning(false));
  };

  const onDeleteRow = (adminid) => {
    setSpinning(true);
    apiURL
      .delete(adminid)
      .then((res) => {
        onRefreshData();
        message.success(res.message);
      })
      .catch(handleError)
      .finally(() => setSpinning(false));
  };

  const onDeleteRows = () => {
    let ids = selectedRowsKey.map((each) => each._id);
    console.log('ids', ids);
    setSpinning(true);
    apiURL.deleteMany &&
      apiURL
        .deleteMany(ids)
        .then((res) => {
          onRefreshData();
          message.success(res.message);
        })
        .catch(handleError)
        .finally(() => setSpinning(false));
  };

  const onSearch = (searchText) => {
    setTempData(
      searchText.length === 0
        ? rowsData
        : _.filter(rowsData, (item) => {
            let isMatch = false;
            for (const eachColumn of columnData) {
              if (
                item &&
                eachColumn.dataIndex &&
                item[eachColumn.dataIndex] &&
                typeof item[eachColumn.dataIndex]?.toString() === 'string' &&
                item[eachColumn.dataIndex]
                  ?.toString()
                  ?.toLowerCase()
                  .includes(searchText.toLowerCase())
              ) {
                isMatch = true;
              }
            }
            return isMatch;
          })
    );
  };

  const onReset = () => {
    setFilteredInfo(null);
    setTempData(rowsData);
  };

  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setFilteredInfo(filters);
    // this.setState({
    //   filteredInfo: filters,
    //   sortedInfo: sorter,
    // });
  };

  return (
    <Row style={rowStyle}>
      <PageLayout
        rowsData={rowsData}
        title={title}
        breadCrumb={breadCrumb}
        addButton={addButton}
        deleteRows={{
          selectedKeys: selectedRowsKey.map((each) => each.key),
          onDeleteRows: onDeleteRows,
          deleteMany: apiURL.deleteMany
        }}
        onSearch={onSearch}
        onReset={onReset}
        spinning={spinning}
        onRefresh={() => setRefreshShortcut((value) => value)}
      >
        <Row
          style={{
            ...rowStyle,
            marginTop: 40
          }}
        >
          <Spin spinning={spinning}>
            <Table
              style={{ whiteSpace: 'pre' }}
              rowSelection={
                apiURL.deleteMany && {
                  selectedRowKeys: selectedRowsKey.map((each) => each.key),
                  type: 'checkbox',
                  onChange: (_, _data) => {
                    console.log('many data', _data);
                    setSelectedRowsKey(
                      _data.map((each) => ({
                        key: each?.key,
                        // _id: each?._id?.toString()
                        _id: each.restaurant ? each.restaurant._id.toString() : each._id.toString()
                      }))
                    );
                  }
                }
              }
              columns={initialColumn}
              dataSource={tempData}
              onChange={handleChange}
            />
          </Spin>
        </Row>
      </PageLayout>
    </Row>
  );
}
