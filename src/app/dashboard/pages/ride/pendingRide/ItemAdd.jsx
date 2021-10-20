import {
  Avatar,
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Switch,
} from "antd";
import api from "app/dashboard/api";
import AddPageLayout from "app/dashboard/components/ListTable/AddPageLayout";
import routeURL from "config/routeURL";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { handleError } from "services/util";
import { notificationSuccess } from "../../../components/notification";
import GalleryUpload from "../../../components/GalleryUpload";
import moment from "moment";

const rowStyle = {
  width: "100%",
};

const backUrl = routeURL.cms.rider_request();
const pageTitle = "Rider";
const imageTitle = "rider";

export default function ItemAdd(props) {
  const {
    match: {
      params: { itemId },
    },
  } = props;
  const formRef = useRef();
  const [spinning, setSpinning] = useState(false);
  const [constants, setConstants] = useState({});
  const [hasCommissionOverride, setHasCommissionOverride] = useState(false);
  const [photoImage, setPhotoImage] = useState({
    photo: [],
    vehicle: [],
    license: [],
    citizen: [],
    blueBook: [],
    insurance: [],
    agreementDoc: [],
  });

  const setPhoto = (name) => (images) =>
    setPhotoImage((value) => ({
      ...value,
      [name]: images,
    }));
  const onSaveForm = (value) => {
    // validate here
    if (true) {
      console.log('values', photoImage)
      const jsonData = {
        ...value,
        license: {
          ...value.license,
          document: photoImage.license.length > 0 ? photoImage.license[0] : null,
        },
        citizenship: {
          ...value.citizenship,
          document: photoImage.citizen.length > 0 ? photoImage.citizen[0] : null,
        },
        insurance: {
          ...value.insurance,
          document:
            photoImage.insurance.length > 0 ? photoImage.insurance[0] : null,
        },
        blueBook: {
          ...value.blueBook,
          document:
            photoImage.blueBook.length > 0 ? photoImage.blueBook[0] : null,
        },
        vehicle: {
          ...value.vehicle,
          image:
              photoImage.vehicle.length > 0 ? photoImage.vehicle[0] : null,
        },
        photo: photoImage.photo.length > 0 ? photoImage.photo[0] : null,
        agreementDoc:
          photoImage.agreementDoc.length > 0 ? photoImage.agreementDoc[0] : null,
      };
      if (itemId) jsonData._id = itemId;
      setSpinning(true);
      api.rider
        .add(jsonData)
        .then((data) => {
          notificationSuccess(data.message);
          props.history.push(backUrl);
        })
        .catch(handleError)
        .finally(() => setSpinning(false));
    }
  };

  const fillForm = (data) => {
    setPhotoImage({
      photo: data.photo ? [data.photo] : [],
    });

    formRef.current.setFieldsValue({
      activeStatus: data.activeStatus,
      description: data.description,
      name: data.name,
      charge: data.charge,
    });
    setSpinning(false);
  };

  useEffect(() => {
    if (itemId) {
      setSpinning(true);
      api.rider
        .read(itemId)
        .then(({ data }) => fillForm(data))
        .catch(handleError)
        .finally(() => setSpinning(false));
    }
  }, [itemId]);

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
    getConstants("stateList");
    getConstants("vehicleColor");
    getConstants("bloodGroup");

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
    // get commission
    setSpinning(true);
    api.systemData.commission
      .readAll()
      .then(({ data }) =>
        setConstants((value) => ({
          ...value,
          commission: data,
        }))
      )
      .catch(handleError)
      .finally(() => setSpinning(false));
  }, []);

  const getPersonalDetailUI = () => {
    return (
      <>
        <Divider orientation="left">
          <span
            style={{
              display: "flex",
              fexDirection: "row",
              alignItems: "center",
            }}
          >
            Rider's Personal Detail
          </span>
        </Divider>
        <Row style={{ ...rowStyle, marginTop: 20 }}>
          <Form.Item label="Rider Photo *">
            <GalleryUpload
              maxFile={1}
              fileNames={photoImage.photo}
              imageTitle={`${imageTitle}_photo`}
              setFileNames={setPhoto("photo")}
            />
          </Form.Item>
        </Row>
        <Row style={rowStyle} gutter={24}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Phone number *"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please input Phone Number",
                },
                {
                  validator: (rule, telNo) => {
                    if (!telNo) return Promise.resolve();
                    else if (telNo.length < 5 || telNo.length > 12)
                      return Promise.reject("Invalid Phone number");
                    const re = /^[+]?[\s./0-9]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/g;
                    if (re.test(telNo)) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Invalid Phone number");
                  },
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  type: "email",
                  message: "Please input valid email",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row style={rowStyle} gutter={24}>
          <Col xs={24}>
            <Form.Item
              name="name"
              label="Rider Full Name *"
              rules={[
                {
                  required: true,
                  message: "Please input the name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              name="secondaryPhone"
              label="Secondary Phone Number"
              rules={[
                {
                  validator: (rule, telNo) => {
                    if (!telNo) return Promise.resolve();
                    else if (telNo.length < 5 || telNo.length > 12)
                      return Promise.reject("Invalid Phone number");
                    const re = /^[+]?[\s./0-9]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/g;
                    if (re.test(telNo)) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Invalid Phone number");
                  },
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item name="grandFatherName" label="Grandfather Name">
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item name="fatherName" label="Father Name">
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item name="motherName" label="Mother Name">
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item name="dob" label="Date of Birth">
              <DatePicker
                style={{
                  width: "100%",
                }}
                format="DD/MM/YYYY"
                disabledDate={(current) =>
                  current && current >= moment().endOf("day")
                }
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              name="bloodGroup"
              label="Blood Group *"
              rules={[
                {
                  required: true,
                  message: "Please select a blood group",
                },
              ]}
            >
              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder="say, AB+"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {constants?.bloodGroup?.map((item) => (
                  <Select.Option value={item.value}>{item.label}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row style={rowStyle} gutter={24}>
          <Col xs={24} md={12}>
            <Form.Item
              name="gender"
              label="Gender *"
              rules={[
                {
                  required: true,
                  message: "Please select a rider gender",
                },
              ]}
            >
              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder="gender"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {constants?.personGenderList?.map((item) => (
                  <Select.Option value={item.value}>{item.label}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item
              name="isPremiumRider"
              initialValue={false}
              label="is Premium Rider?"
            >
              <Switch />
            </Form.Item>
          </Col>
        </Row>
      </>
    );
  };

  const getCurrentAddressUI = () => {
    return (
      <>
        <Divider orientation="left">
          <span
            style={{
              display: "flex",
              fexDirection: "row",
              alignItems: "center",
            }}
          >
            Rider's Current Address
          </span>
        </Divider>
        <Row style={rowStyle} gutter={24}>
          <Col xs={24} md={24}>
            <Form.Item
              name={["currentAddress", "street"]}
              label="Street Address *"
              rules={[
                {
                  required: true,
                  message: "Please input the Street Address!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name={["currentAddress", "city"]}
              label="City *"
              initialValue="Kathmandu"
              rules={[
                {
                  required: true,
                  message: "Please input the Street Address!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name={["currentAddress", "state"]}
              label="State *"
              initialValue={3}
              rules={[
                {
                  required: true,
                  message: "Please input the state!",
                },
              ]}
            >
              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder="state"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {constants?.stateList?.map((item) => (
                  <Select.Option value={item.value}>{item.label}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </>
    );
  };

  const getVehicleDetailUI = () => {
    return (
      <>
        <Divider orientation="left">
          <span
            style={{
              display: "flex",
              fexDirection: "row",
              alignItems: "center",
            }}
          >
            Rider's Vehicle Detail
          </span>
        </Divider>

        <Row style={{ ...rowStyle, marginTop: 20 }}>
          <Form.Item label="Vehicle Photo *">
            <GalleryUpload
              maxFile={1}
              fileNames={photoImage.vehicle}
              imageTitle={`${imageTitle}_vehicle`}
              setFileNames={setPhoto("vehicle")}
            />
          </Form.Item>
        </Row>

        <Row style={rowStyle} gutter={24}>
          <Col xs={24} md={12}>
            <Form.Item
              name={["vehicle", "vehicleType"]}
              label="Vehicle Type *"
              rules={[
                {
                  required: true,
                  message: "Please select vehicle type!",
                },
              ]}
            >
              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder="vehicle type"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {constants?.vehicleType?.map((item) => (
                  <Select.Option value={item._id}>{item.name}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name={["vehicle", "vehicleNumber"]}
              label="Vehicle Number *"
              rules={[
                {
                  required: true,
                  message: "Please input the vehicle number!",
                },
              ]}
            >
              <Input placeholder="say, Ba 3 pa 7223" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              name={["vehicle", "model"]}
              label="Vehicle Brand/Model *"
              rules={[
                {
                  required: true,
                  message: "Please input the Vehicle Model!",
                },
              ]}
            >
              <Input placeholder="say, Ba 3 pa 7223" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name={["vehicle", "color"]}
              label="Vehicle Color *"
              rules={[
                {
                  required: true,
                  message: "Please select the vehicle color!",
                },
              ]}
            >
              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder="vehicle color"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children?.toLowerCase().indexOf(input?.toLowerCase()) >=
                  0
                }
              >
                {constants?.vehicleColor?.map((item) => (
                  <Select.Option value={item.value}>
                    <Avatar
                      style={{
                        backgroundColor: item.value,
                        width: 16,
                        height: 16,
                        marginRight: 8,
                      }}
                    />
                    {item.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              name={["vehicle", "issuedDate"]}
              label="Vehicle Issue Date"
            >
              <DatePicker
                style={{
                  width: "100%",
                }}
                format="DD/MM/YYYY"
                disabledDate={(current) =>
                  current && current >= moment().endOf("day")
                }
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              name={["vehicle", "issuedPlace"]}
              label="Vehicle Issue From"
            >
              <Input placeholder="Say, Nepalgunj!" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="hasCommissionOverride"
              initialValue={setHasCommissionOverride}
              label="Should override the commission rate?"
              help={
                <b
                  style={{
                    color: "#e57373",
                    fontSize: 11,
                  }}
                >
                  This will change the commission rate for this rider.
                </b>
              }
            >
              <Switch
                checked={hasCommissionOverride}
                onChange={setHasCommissionOverride}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="commission" label="Commission Type">
              <Select
                disabled={!hasCommissionOverride}
                showSearch
                style={{ width: "100%" }}
                placeholder="Commission type"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {constants?.commission?.map((item) => (
                  <Select.Option value={item._id}>{item.name}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </>
    );
  };

  const getBlueBookUI = () => {
    return (
      <>
        <Divider orientation="left">
          <span
            style={{
              marginTop: 30,
              display: "flex",
              fexDirection: "row",
              alignItems: "center",
            }}
          >
            Rider's BlueBook Detail
          </span>
        </Divider>

        <Row style={{ ...rowStyle, marginTop: 20 }}>
          <Form.Item label="BlueBook Scanned Photo *">
            <GalleryUpload
              maxFile={1}
              fileNames={photoImage.blueBook}
              imageTitle={`${imageTitle}_blueBook`}
              setFileNames={setPhoto("blueBook")}
            />
          </Form.Item>
        </Row>

        <Row style={rowStyle} gutter={24}>
          <Col xs={24} md={12}>
            <Form.Item
              name={["blueBook", "blueBookNumber"]}
              label="BlueBook Number *"
              rules={[
                {
                  required: true,
                  message: "Please input the BlueBook number!",
                },
              ]}
            >
              <Input placeholder="Blue book number." />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              name={["blueBook", "expireDate"]}
              label="Expire at? *"
              rules={[
                {
                  required: true,
                  message: "Please input expiry Date!",
                },
              ]}
            >
              <DatePicker
                style={{
                  width: "100%",
                }}
                format="DD/MM/YYYY"
                disabledDate={(current) =>
                  current && current < moment().startOf("day")
                }
              />
            </Form.Item>
          </Col>
        </Row>
      </>
    );
  };

  const getLicenseUI = () => {
    return (
      <>
        <Divider orientation="left">
          <span
            style={{
              marginTop: 30,
              display: "flex",
              fexDirection: "row",
              alignItems: "center",
            }}
          >
            Rider's License Detail
          </span>
        </Divider>

        <Row style={{ ...rowStyle, marginTop: 20 }}>
          <Form.Item label="License Scanned Photo *">
            <GalleryUpload
              maxFile={1}
              fileNames={photoImage.license}
              imageTitle={`${imageTitle}_license`}
              setFileNames={setPhoto("license")}
            />
          </Form.Item>
        </Row>

        <Row style={rowStyle} gutter={24}>
          <Col xs={24} md={12}>
            <Form.Item
              name={["license", "licenseNo"]}
              label="License Number *"
              rules={[
                {
                  required: true,
                  message: "Please input the License number!",
                },
              ]}
            >
              <Input placeholder="License number." />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item name={["license", "issuedPlace"]} label="Issued Place">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name={["license", "issuedDate"]}
              label="Issued at *"
              rules={[
                {
                  required: true,
                  message: "Please input issue Date!",
                },
              ]}
            >
              <DatePicker
                style={{
                  width: "100%",
                }}
                format="DD/MM/YYYY"
                disabledDate={(current) =>
                  current && current >= moment().endOf("day")
                }
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name={["license", "expireDate"]}
              label="Expire at? *"
              rules={[
                {
                  required: true,
                  message: "Please input expiry Date!",
                },
              ]}
            >
              <DatePicker
                style={{
                  width: "100%",
                }}
                format="DD/MM/YYYY"
                disabledDate={(current) =>
                  current && current < moment().startOf("day")
                }
              />
            </Form.Item>
          </Col>
        </Row>
      </>
    );
  };

  const getCitizenshipUi = () => {
    return (
      <>
        <Divider orientation="left">
          <span
            style={{
              marginTop: 30,
              display: "flex",
              fexDirection: "row",
              alignItems: "center",
            }}
          >
            Rider's Citizenship Detail
          </span>
        </Divider>

        <Row style={{ ...rowStyle, marginTop: 20 }}>
          <Form.Item label="Citizenship Scanned Photo *">
            <GalleryUpload
              maxFile={1}
              fileNames={photoImage.citizen}
              imageTitle={`${imageTitle}_citizen`}
              setFileNames={setPhoto("citizen")}
            />
          </Form.Item>
        </Row>

        <Row style={rowStyle} gutter={24}>
          <Col xs={24} md={12}>
            <Form.Item
              name={["citizenship", "citizenshipNo"]}
              label="Citizenship Number *"
              rules={[
                {
                  required: true,
                  message: "Please input the Citizenship number!",
                },
              ]}
            >
              <Input placeholder="Citizenship number." />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              name={["citizenship", "issuedPlace"]}
              label="Issued Place"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name={["citizenship", "issuedDate"]}
              label="Issued at *"
              rules={[
                {
                  required: true,
                  message: "Please input issue Date!",
                },
              ]}
            >
              <DatePicker
                style={{
                  width: "100%",
                }}
                format="DD/MM/YYYY"
                disabledDate={(current) =>
                  current && current >= moment().endOf("day")
                }
              />
            </Form.Item>
          </Col>
        </Row>
      </>
    );
  };

  const getAgreementDocUI = () => {
    return (
      <>
        <Divider orientation="left">
          <span
            style={{
              marginTop: 30,
              display: "flex",
              fexDirection: "row",
              alignItems: "center",
            }}
          >
            Rider's Agreement Document
          </span>
        </Divider>

        <Row style={{ ...rowStyle, marginTop: 20 }}>
          <Form.Item label="Agreement Document *">
            <GalleryUpload
              maxFile={1}
              fileNames={photoImage.agreementDoc}
              imageTitle={`${imageTitle}_agreementDoc`}
              setFileNames={setPhoto("agreementDoc")}
            />
          </Form.Item>
        </Row>
      </>
    );
  };

  return (
    <Row style={{ ...rowStyle, padding: "24px 40px" }}>
      <AddPageLayout
        spinning={spinning}
        title={itemId ? `Update ${pageTitle}` : `Add ${pageTitle}`}
        breadCrumb={[
          {
            title: "Home",
            url: routeURL.cms.home(),
          },
          {
            title: pageTitle,
            url: backUrl,
          },
          {
            title: itemId ? "Update" : "Add",
            url: false,
          },
        ]}
        showActions={false}
        backUrl={backUrl}
      >
        <Row
          style={{
            ...rowStyle,
            marginTop: 40,
          }}
          justify="center"
        >
          <Col
            xs={24}
            md={24}
            lg={16}
            style={{
              backgroundColor: "#fff",
              borderRadius: 8,
              boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
              padding: 30,
            }}
          >
            <Form
              // wrapperCol={{
              // 	offset: 1,
              // }}
              // {...layout}
              ref={formRef}
              // form={form}
              layout="vertical"
              name="control-ref"
              onFinish={onSaveForm}
              requiredMark={true}
              scrollToFirstError
              autoComplete="off"
            >
              {getPersonalDetailUI()}
              {getCurrentAddressUI()}
              {getVehicleDetailUI()}
              {getBlueBookUI()}
              {getLicenseUI()}
              {getCitizenshipUi()}
              {getAgreementDocUI()}

              <Divider></Divider>
              <Row
                style={{
                  ...rowStyle,
                  marginTop: 30,
                }}
                gutter={16}
                justify="end"
              >
                <Col>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" loading={false}>
                      {itemId ? "Update" : "Create"}
                    </Button>
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item>
                    <Link to={backUrl}>
                      <Button>Cancel</Button>
                    </Link>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </AddPageLayout>
    </Row>
  );
}
