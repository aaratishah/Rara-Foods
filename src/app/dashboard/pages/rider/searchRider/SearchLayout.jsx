import {
  ArrowLeftOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
  RedoOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Col, Input, Modal, Row, Tooltip, Typography } from 'antd';
import OwnButton from 'app/dashboard/components/Button';
import React, { useState } from 'react';
import { CSVLink } from 'react-csv';
import { Link } from 'react-router-dom';
import moment from 'moment';

const { Title } = Typography;
const { confirm } = Modal;
const rowStyle = {
  width: "100%",
};
const breadCrumbStyle = {
  color: "#9e9e9e",
  fontSize: 12,
};
const getFileName = (title) =>
  `${(title && title.toLowerCase()) || "data"}_${moment().format(
    "DD-MMM-yyyy hh:mm:ss a"
  )}.csv`;
export default function SearchLayout({
  deleteRows = {},
  title,
  breadCrumb,
  addButton,
  children,
  onSearch,
  onReset,
  showActions = true,
  backUrl = false,
  rowsData,
  showCSV = true,
  onRefresh = null,
  spinning = false,
}) {
  const { selectedKeys, onDeleteRows, deleteMany } = deleteRows;
  const showDeleteConfirm = () => {
    confirm({
      title: `Are you sure delete selected ${
        selectedKeys.length == 1 ? " row" : " rows"
      } ?`,
      icon: <ExclamationCircleOutlined />,
      content: `Confirming will delete ${selectedKeys.length}${
        selectedKeys.length == 1 ? " row" : " rows"
      }`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        return new Promise((resolve, reject) =>
          resolve(onDeleteRows(selectedKeys))
        ).catch(() => console.log("Oops errors!"));
      },
    });
  };
  const [searchText, setSearchText] = useState("");

  return (
    <Row style={rowStyle}>
      <Row style={rowStyle} align="middle" justify="space-between">
        <Col>
          {backUrl && (
            <Link to={backUrl}>
              <ArrowLeftOutlined
                style={{
                  marginRight: 16,
                  fontSize: 22,
                  cursor: "pointer",
                  color: "unset",
                }}
              />
            </Link>
          )}
          <Title
            level={3}
            style={{
              marginBottom: 0,
              letterSpacing: 1,
            }}
          >
            {title}
          </Title>
        </Col>
        {typeof onRefresh === "function" && (
          <Col>
            <Tooltip title="Refresh (press r to refresh)">
              <RedoOutlined
                style={{
                  fontSize: 30,
                }}
                onClick={onRefresh}
                spin={spinning}
              />
            </Tooltip>
          </Col>
        )}
      </Row>

      {breadCrumb && (
        <Row style={rowStyle}>
          <Breadcrumb separator=">">
            {breadCrumb.map((each) => {
              return (
                <Breadcrumb.Item key={each.title}>
                  {each.url ? (
                    <Link to={each.url} style={breadCrumbStyle}>
                      {each.title}
                    </Link>
                  ) : (
                    <span style={breadCrumbStyle}>{each.title}</span>
                  )}
                </Breadcrumb.Item>
              );
            })}
          </Breadcrumb>
        </Row>
      )}

      {showActions && (
        <Row
          style={{ ...rowStyle, marginTop: 40 }}
          justify="space-between"
          gutter={[16, 16]}
        >
          {addButton && (
            <Col>
              <Link to={addButton.url}>
                <OwnButton icon={<PlusOutlined />}>{addButton.title}</OwnButton>
              </Link>
            </Col>
          )}
          <Col>
            <Row gutter={[16, 16]}>
              {onSearch && typeof onSearch === "function" && (
                <Col>
                  <Input.Search
                    onSearch={onSearch}
                    style={{
                      width: 200,
                      fontSize: 13,
                      height: 37,
                      borderRadius: 5,
                    }}
                    value={searchText}
                    placeholder="Search..."
                    onChange={({ target: { value } }) => setSearchText(value)}
                  />
                </Col>
              )}
              {onReset && typeof onReset === "function" && (
                <Col>
                  <OwnButton
                    noElevation
                    type="default"
                    onClick={() => {
                      onReset();
                      setSearchText("");
                    }}
                  >
                    Reset
                  </OwnButton>
                </Col>
              )}
              {showCSV &&
              (rowsData.length === 0 ? (
                <Col>
                  <div
                    filename={getFileName(title)}
                    className="ant-btn ant-btn-primary ant-btn-lg box-shadow ant-radio-button-wrapper-disabled"
                    data={rowsData}
                    target="_blank"
                  >
                    Download CSV
                  </div>
                </Col>
              ) : (
                <Col>
                  <CSVLink
                    filename={getFileName(title)}
                    className="ant-btn ant-btn-primary ant-btn-lg box-shadow "
                    data={rowsData}
                    target="_blank"
                  >
                    Download CSV
                  </CSVLink>
                </Col>
              ))}
              {deleteMany && (
                <Col>
                  <OwnButton
                    onClick={showDeleteConfirm}
                    noElevation
                    type="default"
                    disabled={selectedKeys.length < 1}
                    danger
                  >
                    Delete selected Rows
                  </OwnButton>
                </Col>
              )}
            </Row>
          </Col>
        </Row>
      )}
      {children}
    </Row>
  );
}
