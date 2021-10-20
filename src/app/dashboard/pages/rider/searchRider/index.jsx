import { EditFilled } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Spin,
  Switch,
  Table, Tag,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ImageColumn, StringColumn } from "../../../components/column";
import RiderName from "app/dashboard/components/user/rider/RiderName";
import routeURL from "config/routeURL";
import api from "../../../api";
import { handleError } from "services/util";
import moment from "moment";
import SearchLayout from './SearchLayout';

const rowStyle = {
  width: "100%",
};
const title = "Search Rider";
const breadCrumb = [
  {
    title: "Home",
    url: routeURL.cms.home(),
  },
  {
    title: title,
    url: false,
  },
];
export default function ListTableSearchRider() {
  const formRef = useRef();

  const columnData = [
    ImageColumn("photo"),
    StringColumn("Name", "rider", (_, rider) => <RiderName rider={rider} />),
    StringColumn("Status", "status", (status) => {
      return status === 'REJECTED' ? <Tag color='magenta'>{status}</Tag> : status === 'ACCEPTED' ? <Tag color='green'>{status}</Tag> : <Tag color='orange'>{status}</Tag>;
    }),
    StringColumn("Gender", "gender"),
    StringColumn("Phone", "phone"),
    StringColumn('Vehicle', 'vehicle',(value) => {
      return <span>
                {(()=>{
                  const col = constants?.vehicleType.find(each => each._id.toString() === value.vehicleType.toString());
                  if(col) return <Link to={routeURL.cms.vehicle_type_view(col._id)} >{col.name}</Link>;
                })()}, {value.vehicleNumber} <Avatar style={{
        width: 16,
        height: 16,
        backgroundColor: value.color
      }} /> {value.model}
            </span>
    }),
  ];

  const [tempData, setTempData] = useState([]);
  const [spinning, setSpinning] = useState(false);
  const [constants, setConstants] = useState({});

  columnData.push({
    title: "Actions",
    width: 100,
    dataIndex: "_id",
    render: (rowId, row) => {
      return (
        <Row gutter={16} align="middle">
          <Col>
            <Link to={routeURL.cms.rider_request_edit(row.rider._id)}>
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
        </Row>
      );
    },
  });

  const getConstants = (constant) => {
    setSpinning(true);

    api
      .constant(constant)
      .then(({ data }) =>
        setConstants((value) => ({
          ...value,
          [constant]: data,
        }))
      )
      .catch(handleError)
      .finally(() => setSpinning(false));
  };
  useEffect(() => {
    getConstants("personGenderList");
    getConstants("bloodGroup");
    getConstants("riderRequestStatus");

    setSpinning(true);
    api.systemData.vehicle_type
      .readAll()
      .then(({ data }) =>
        setConstants((value) => ({
          ...value,
          vehicleType: data,
        }))
      )
      .catch(handleError)
      .finally(() => setSpinning(false));
  }, []);

  const onSearch = (value) => {
    setSpinning(true);
    api.rider
      .search_rider(value)
      .then(({ data }) => setTempData(data))
      .catch(handleError)
      .finally(() => setSpinning(false));
  };
  const syncData = (data) => {
    setTempData(
      data
        .map((each, idx) => ({ key: idx, ...each }))
        .sort(
          (a, b) =>
            moment(b.createdDateTime).unix() - moment(a.createdDateTime).unix()
        )
    );
  };

  return (
    <Row style={{ ...rowStyle, padding: "24px 40px" }}>
      <SearchLayout
        showCSV={false}
        rowsData={tempData}
        title={title}
        breadCrumb={breadCrumb}
      >
        <Row style={{ ...rowStyle, marginTop: 8 }}>
          <Row style={rowStyle}>
            <Form
              style={{
                width: "100%",
              }}
              // wrapperCol={{
              // 	offset: 1,
              // }}
              // {...layout}
              ref={formRef}
              // form={form}
              layout="vertical"
              name="control-ref"
              onFinish={onSearch}
              requiredMark={true}
              scrollToFirstError
              autoComplete="off"
            >
              <Row style={rowStyle} gutter={[24, 8]}>
                <Col xs={24}>
                  <Form.Item
                    label="Text (Name, Phone, email, Document Number, vehicle number etc)"
                    name="text"
                  >
                    <Input />
                  </Form.Item>
                </Col>
                {/*<Col xs={24} md={12} lg={8}>*/}
                {/*  <Form.Item*/}
                {/*    label="Phone number"*/}
                {/*    name="phone"*/}
                {/*    rules={[*/}
                {/*      {*/}
                {/*        validator: (rule, telNo) => {*/}
                {/*          if (!telNo) return Promise.resolve();*/}
                {/*          else if (telNo.length < 5 || telNo.length > 12)*/}
                {/*            return Promise.reject("Invalid Phone number");*/}
                {/*          const re = /^[+]?[\s./0-9]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/g;*/}
                {/*          if (re.test(telNo)) {*/}
                {/*            return Promise.resolve();*/}
                {/*          }*/}
                {/*          return Promise.reject("Invalid Phone number");*/}
                {/*        },*/}
                {/*      },*/}
                {/*    ]}*/}
                {/*  >*/}
                {/*    <Input />*/}
                {/*  </Form.Item>*/}
                {/*</Col>*/}

                <Col xs={24} md={12} lg={8}>
                  <Form.Item name={"gender"} label="Gender">
                    <Select
                      allowClear
                      showSearch
                      style={{ width: "100%" }}
                      placeholder="gender"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {constants?.personGenderList?.map((item) => (
                        <Select.Option value={item.value}>
                          {item.label}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} md={12} lg={8}>
                  <Form.Item name={"vehicle.vehicleType"} label="Vehicle Type">
                    <Select
                      allowClear
                      showSearch
                      style={{ width: "100%" }}
                      placeholder="vehicle type"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {constants?.vehicleType?.map((item) => (
                        <Select.Option value={item._id}>
                          {item.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} md={12} lg={8}>
                  <Form.Item name={"status"} label="Rider Status">
                    <Select
                      allowClear
                      showSearch
                      style={{ width: "100%" }}
                      placeholder="Status"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {constants?.riderRequestStatus?.map((item) => (
                        <Select.Option value={item.value}>
                          {item.label}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} md={4}>
                  <Form.Item name="isPremiumRider" label="is Premium Rider?">
                    <Switch />
                  </Form.Item>
                </Col>
                <Col xs={24} md={4}>
                  <Form.Item
                    name={["rider", "isSuspended"]}
                    label="is Suspended?"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
                <Col xs={24} md={4}>
                  <Form.Item name={["rider", "isOnline"]} label="is Online?">
                    <Switch />
                  </Form.Item>
                </Col>
                <Col xs={24} md={4}>
                  <Form.Item name={["rider", "isActive"]} label="is Active?">
                    <Switch />
                  </Form.Item>
                </Col>
                <Col xs={24} md={4}>
                  <Form.Item
                    name={["rider", "isAvailable"]}
                    label="is Available?"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" loading={false}>
                      Search
                    </Button>
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item>
                    <Button
                      onClick={() => {
                        formRef.current.resetFields();
                        syncData([]);
                      }}
                    >
                      Reset
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Row>
          <Spin spinning={spinning}>
            <Table columns={columnData} dataSource={tempData} />
          </Spin>
        </Row>
      </SearchLayout>
    </Row>
  );
}
