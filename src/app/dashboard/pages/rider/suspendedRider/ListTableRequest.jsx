import {
  DeleteFilled,
  EditFilled, ExclamationCircleOutlined,
  EyeFilled,
  MoreOutlined,
} from "@ant-design/icons";
import {
  Col,
  Dropdown, Input, InputNumber,
  Menu,
  message, Modal,
  Popconfirm,
  Row,
  Spin,
  Switch,
  Table, Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import {Link, useHistory} from "react-router-dom";
import _ from "lodash";
import PageLayout from "app/dashboard/components/ListTable/PageLayout";
import moment from "moment";
import { handleError } from "services/util";
import routeURL from "../../../../../config/routeURL";
import api from "../../../api";
import {notificationError} from "../../../components/notification";

const rowStyle = {
  width: "100%",
};

export default function ListTableRequest({
  refreshAllData,
  title,
  breadCrumb,
  addButton,
  edit,
  preview = false,
  columnData,
  apiURL,
  actions = false,
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

  const onSwitchChange = (checked, index, row) => {
    setLoadingRows((prev) => [...prev, index]);
    apiURL
      .toggle(row._id, checked ? "on" : "off")
      .then((res) => {
        const newRow = { ...row, activeStatus: checked };
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

  const [suspendModel, setSuspendModel] = useState(false);
  const [suspendDays  , setSuspendDays] = useState(0);

  const onSuspendRider = (suspendDays, riderId, index) => {
    if (riderId) {
      setLoadingRows((prev) => [...prev, index]);
      api.rider
          .suspend_rider_request(riderId, {
            suspendDays ,
          })
          .then(()=>{
            onRefreshData();
            setSuspendModel(false)

          })
          .catch(handleError)
          .finally(() => unsetLoading(index));
    } else notificationError("Invalid Rider ID");
  };

  const getSuspendUI = (index, row) => {

    return (
      <Modal
        className="ant-modal-launching-soon"
        title={null}
        keyboard={false}
        width={400}
        visible={suspendModel}
        onCancel={() => setSuspendModel(false)}
        onOk={() => {
          if (!suspendDays  )
            return notificationError("Please set suspend days");
          onSuspendRider(suspendDays, row._id, index);
        }}
      >
        <Row>
          <Typography.Title
            level={5}
            style={{
              width: "100%",
            }}
          >
            Suspension Days
          </Typography.Title>
          <InputNumber
            style={{
              width: "100%",
            }}
            onChange={setSuspendDays}
            min={0}
            max={365}
          />
        </Row>
      </Modal>
    );
  };

  // useEffect(() => {
  let intialColumn = [];
  if (columnData) {
    intialColumn = [...columnData];
    apiURL.toggle &&
      intialColumn.push({
        width: 80,
        title: "Status",
        dataIndex: "activeStatus",
        filterMultiple: false,
        filteredValue: filteredInfo ? filteredInfo.activeStatus : null,
        filters: [
          {
            text: "on",
            value: true,
          },
          {
            text: "off",
            value: false,
          },
        ],
        onFilter: (value, record) => record.activeStatus === value,
        render: renderStatus,
      });
    let width = 70;
    if (actions) width += 100;
    if (edit) width += 50;
    if (preview) width += 50;
    intialColumn.push({
      title: "Actions",
      width: width,
      dataIndex: "_id",
      render: (rowId, row, idx) => {
        return (
          <Dropdown
            overlay={
              <Menu>
                {getSuspendUI(idx, row)}
                <Menu.Item
                    onClick={() => {
                      Modal.confirm({
                        title: "Are you sure to revoke suspension from the rider?",
                        icon: <ExclamationCircleOutlined />,
                        // content: 'Bla bla ...',
                        okText: "Revoke Suspension",
                        onOk: () => onSuspendRider(0, rowId, idx),
                        cancelText: "Discard",
                      });
                    }}

                  key="2"
                  style={{
                    color: "#3dcb20",
                  }}
                >
                  Revoke Suspension
                </Menu.Item>
                <Menu.Item
                  onClick={() => setSuspendModel(true)}
                  key="2"
                  style={{
                    color: "#ff9800",
                  }}
                >
                  Edit Suspension Days
                </Menu.Item>
                <Menu.Item
                  key="4"
                  onClick={() =>
                    history.push(routeURL.cms.rider_request_edit(row._id))
                  }
                  style={{
                    color: "#2196f3",
                  }}
                >
                  Edit Info
                </Menu.Item>
              </Menu>
            }
            trigger={["click"]}
          >
            <span
              style={{
                cursor: "pointer",
              }}
            >
              Action <MoreOutlined />
            </span>
          </Dropdown>
        );

        return (
          <Row gutter={16} align="middle">
            {preview && (
              <Col>
                <Link to={preview.url(rowId, row)}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      cursor: "pointer",
                      color: "#40a9ff",
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
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      cursor: "pointer",
                      color: "#40a9ff",
                    }}
                  >
                    <EditFilled style={{ marginRight: 5 }} />
                    Edit
                  </div>
                </Link>
              </Col>
            )}
            {apiURL.delete && (
              <Col>
                <Popconfirm
                  title={`Are you sure delete this ${title}?`}
                  onConfirm={() => {
                    onDeleteRow(rowId);
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      cursor: "pointer",
                      color: "red",
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
      },
    });

    // setColumns(intialColumn);
  }
  // }, [columnData]);

  const syncData = (data) => {
    setRowsData(
      data
        .map((each, idx) => ({ key: idx, ...each }))
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

  useEffect(() => {
    setSpinning(true);
    apiURL
      .get()
      .then(({ data }) => syncData(data))
      .catch(handleError)
      .finally(() => setSpinning(false));
  }, [refreshAllData]);

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

  const onDeleteRows = (adminids) => {
    setSpinning(true);
    apiURL.deleteMany &&
      apiURL
        .deleteMany(adminids.map((each) => tempData[each]._id))
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
            for (const eachColumn of columnData)
              if (
                item &&
                eachColumn.dataIndex &&
                item[eachColumn.dataIndex] &&
                typeof item[eachColumn.dataIndex] === "string" &&
                item[eachColumn.dataIndex]
                  ?.toLowerCase()
                  .includes(searchText.toLowerCase())
              )
                isMatch = true;
            return isMatch;
          })
    );
  };

  const onReset = () => {
    setFilteredInfo(null);
    setTempData(rowsData);
  };

  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
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
          selectedKeys: selectedRowsKey,
          onDeleteRows: onDeleteRows,
          deleteMany: apiURL.deleteMany,
        }}
        onSearch={onSearch}
        onReset={onReset}
      >
        <Row style={{ ...rowStyle, marginTop: 40 }}>
          <Spin spinning={spinning}>
            <Table
              style={{ whiteSpace: "pre" }}
              rowSelection={
                apiURL.deleteMany && {
                  selectedRowKeys: selectedRowsKey,
                  type: "checkbox",
                  onChange: (selectedRowKeys) =>
                    setSelectedRowsKey(selectedRowKeys),
                }
              }
              columns={intialColumn}
              dataSource={tempData}
              onChange={handleChange}
            />
          </Spin>
        </Row>
      </PageLayout>
    </Row>
  );
}
