import { ExclamationCircleOutlined, KeyOutlined, QuestionCircleFilled } from '@ant-design/icons';
import {
  AutoComplete,
  Button,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Row,
  Select,
  Switch,
  Tabs,
  TimePicker,
  Tooltip,
  Typography,
} from 'antd';
import api from 'app/dashboard/api';
import DragDropUpload from 'app/dashboard/components/DragDropUpload';
import GalleryUpload from 'app/dashboard/components/GalleryUpload';
import AddPageLayout from 'app/dashboard/components/ListTable/AddPageLayout';
import MapViewer from 'app/dashboard/components/MapViewer';
import { notificationError } from 'app/dashboard/components/notification';
import { notificationSuccess } from 'app/web/components/notification';
import { COUNTRY_CODE, GALLERY_IMAGE_SIZE, mapCenterDefault, } from 'config';
import routeURL from 'config/routeURL';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { handleError } from 'services/util';

import { convertToHTML } from 'draft-convert';
import { ContentState, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import htmlToDraft from 'html-to-draftjs';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const { Paragraph } = Typography;
const rowStyle = {
  width: '100%',
};

const imageTitle = 'restaurant';
const fileTitle = 'agreement_document';
const backUrl = routeURL.cms.restaurant();
const pageTitle = 'Restaurant';
const format = 'h:mm A';
/*
Things to Change
1. imageTitle


*/
const days = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];
// const states = {
//   NSW: 'New South Wales',
//   QLD: 'Queensland',
//   SA: 'South Australia',
//   TAS: 'Tasmania',
//   VIC: 'Victoria',
//   WA: 'Western Australia',
// };

export default function ItemAdd(props) {
  const {
    match: {
      params: { itemId },
    },
  } = props;
  var formRef = useRef();
  const [descriptionState, setDescriptionState] = useState(
    EditorState.createEmpty()
  );
  const [status, setStatus] = useState('PENDING');
  const [spinning, setSpinning] = useState(false);
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  const [location, setLocation] = useState(mapCenterDefault);
  const [fileNames, setFileNames] = useState([]);
  const [agreementDoc, setAgreementDoc] = useState([]);
  const [regions, setRegions] = useState([]);
  // const [deliveryCharge, setDeliveryCharge] = useState([]);
  const [tax, setTax] = useState([]);
  const [foodCategory, setFoodCategory] = useState([]);
  const [hasDeliveryCondition, setHasDeliveryCondition] = useState(false);
  const [hasTax, setHasTax] = useState(true);
  const [hasServiceCharge, setHasServiceCharge] = useState(false);

  const [openingType, setOpeningType] = useState(true);
  const [isClosedObj, setIsClosedObj] = useState({});
  const [restaurantEmail, setRestaurantEmail] = useState('');
  const [hasDietPlan, setDietPlan] = useState(false);
  const [dietPlans, setDietPlans] = useState([]);

  const onLocChange = (latitude, longitude) => {
    setLocation({
      latitude,
      longitude,
    });
  };
  const onWebsiteChange = (value) => {
    if (!value || value.indexOf('.') >= 0) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(
        ['.hk', '.com', '.org', '.net'].map((domain) => `${value}${domain}`)
      );
    }
  };
  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));

  const onSaveForm = (value) => {
    // validate here
    console.log('value', value);
    const description = convertToHTML(descriptionState.getCurrentContent());
    if (!description) return notificationError('Description is Required.');
    if (true) {
      var jsonData = {
        ...value,
        image: fileNames,
        agreementDoc: agreementDoc,
        activePhoto: fileNames.length > 0 ? fileNames[0] : -1,
        region: regions.find((each) => each?._id?.toString() === value?.regionID)?.name,
        description,
        ...location,
      };
      if (itemId) jsonData._id = itemId;

      setSpinning(true);
      api.restaurant
        .save(jsonData)
        .then((data) => {
          notificationSuccess(data.message);
          props.history.push(backUrl);
        })
        .catch(handleError)
        .finally(() => setSpinning(false));
    }
  };

  const fillForm = (data) => {
    setStatus(data?.status || "PENDING");
    setFileNames(data.image);
    setAgreementDoc(data.agreementDoc || []);
    if (data.geo?.coordinates) {
      const loc = {
        latitude: data?.geo?.coordinates[1],
        longitude: data?.geo?.coordinates[0],
      };
      setLocation(loc);
    }
    if (data?.email) {
      setRestaurantEmail(data?.email);
    }
    setOpeningType(data.openTime.isSameTimeEveryDay);
    setIsClosedObj(() => {
      const obj = {};
      days.forEach((day) => {
        obj[day] = data.openTime[day].isClosed;
      });
      return obj;
    });
    // open time object
    var openTime = data.openTime;
    const allDays = [...days, 'everyday'];
    for (const day of allDays) {
      if (!openTime[day]) {
        openTime[day] = {};
      }
      if (openTime[day].startTime) {
        openTime[day].startTime = moment(openTime[day].startTime);
      }
      if (openTime[day].endTime) {
        openTime[day].endTime = moment(openTime[day].endTime);
      }
    }
    setDietPlan(data.dietPlans.length > 0);
    setHasServiceCharge(data.serviceCharge > 0);
    const formField = {
      hasTax: data.tax > 0,
      commission: data.commission,
      tax: data.tax,
      hasServiceCharge: data.serviceCharge > 0,
      serviceCharge: data.serviceCharge,
      popularity: data.popularity,
      activeStatus: data.activeStatus,
      availableFoodCategory: data.availableFoodCategory,
      name: data.name,
      regionID: data.regionID,
      // description: data.description,
      email: data.email,
      keywords: data.keywords,
      phoneNumber: data.phoneNumber,
      image: data.image,
      website: data.website,
      category: data.category,
      address: data.address,
      famousFor: data.famousFor,
      userPickup: data.userPickup,
      dining: data.dining,
      hasOwnDelivery: data.hasOwnDelivery,
      // deliveryCharge: data.deliveryCharge,
      hasDeliveryCondition: data.hasDeliveryCondition,
      minimumSpentForFreeDelivery: data.minimumSpentForFreeDelivery,
      openTime,
      dietPlans: data.dietPlans,
      hasDietPlan: data.dietPlans.length > 0,
      contactPerson: data.contactPerson,
    };
    if (data.description) {
      const blocksFromHTML = htmlToDraft(data.description).contentBlocks;
      setDescriptionState(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(blocksFromHTML)
        )
      );
    }
    formRef.current.setFieldsValue(formField);
  };
  useEffect(() => {
    setSpinning(true);
    // api.shipping_charge
    //   .readAll()
    //   .then(({ data }) => setDeliveryCharge(data))
    //   .catch(handleError);
    api.tax
      .readAll()
      .then(({ data }) => setTax(data))
      .catch(handleError);
    api.region
      .readAll()
      .then(({ data }) => setRegions(data))
      .catch(handleError);
    api.region
      .readAll()
      .then(({ data }) => setRegions(data))
      .catch(handleError);
    api.dietary_plan
      .readAll()
      .then(({ data }) => setDietPlans(data))
      .catch(handleError);
    api.food_category
      .readAll()
      .then(({ data }) => setFoodCategory(data))
      .catch(handleError)
      .finally(() => setSpinning(false));
  }, []);

  useEffect(() => {
    if (itemId) {
      setSpinning(true);
      api.restaurant
        .read(itemId)
        .then(({ data }) => fillForm(data))
        .catch(handleError)
        .finally(() => setSpinning(false));
    }
  }, [itemId]);

  const getPasswordFromEmail = (email) =>
    email.includes('@') ? email.split('@')[0] : false;

  function getLoginDetail() {
    return !itemId && <>
      <Divider>Login Credentials For Restaurant</Divider>
      <Row style={{ ...rowStyle }}>
        <div className="desc">
          {restaurantEmail ? (
            <>
              <Paragraph copyable={{ text: restaurantEmail }}>
                Email: {restaurantEmail}
              </Paragraph>
              <Paragraph
                copyable={{
                  text: getPasswordFromEmail(restaurantEmail),
                }}
              >
                Password: {getPasswordFromEmail(restaurantEmail)}
              </Paragraph>
            </>
          ) : (
            <Paragraph>
              Please input restaurant email to get login credentials
            </Paragraph>
          )}
        </div>
      </Row>
    </>;
  }

  function onResetPassword() {
    Modal.confirm({
      title: 'Do you want to reset Password?',
      icon: <ExclamationCircleOutlined/>,
      content: 'Customer will be notify through SMS and Email.',
      onOk() {
        return new Promise((resolve, reject) => {
          api.restaurant.resetPassword(itemId).then(({data}) => {
            Modal.info({
              title: 'Password has been reset and sent to email',
              content: (
                <>
                  <Paragraph copyable={{ text: data?.email }}>
                    Email: {data?.email}
                  </Paragraph>
                  <Paragraph
                    copyable={{
                      text: data?.password,
                    }}
                  >
                    Password: {data?.password}
                  </Paragraph>
                </>
              ),
              onOk() {
                Modal.destroyAll();
              }
            })
          });
        })
      },
      onCancel() {
      //
      },
    });
  }

  return (
    <Row style={{
      ...rowStyle,
      padding: '24px 40px'
    }}>
      <AddPageLayout
        title={
          itemId ? `Update ${pageTitle} Vendor` : `Add ${pageTitle} Vendor`
        }
        breadCrumb={[
          {
            title: 'Home',
            url: routeURL.cms.home(),
          },
          {
            title: pageTitle,
            url: backUrl,
          },
          {
            title: itemId ? 'Update Vendor' : 'Add Vendor',
            url: false,
          },
        ]}
        showActions={false}
        backUrl={backUrl}
      >
        {/* <Spin spinning={spinning} wrapperClassName="item-add-spinner"> */}
        <Row
          style={{
            ...rowStyle,
            marginTop: 40,
          }}
          justify="center"
        >
          <Tabs centered style={{ width: '100%' }}>
            <Tabs.TabPane style={{ width: '100%' }} tab="Restaurant Detail" key="1">
              <Row
                style={{
                  ...rowStyle,
                }}
                justify="center">
              <Col
                xs={24}
                md={24}
                lg={16}
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 8,
                  boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 8px',
                  padding: 30,
                }}
              >
                <Form
                  ref={formRef}
                  layout="vertical"
                  name="control-ref"
                  onFinish={onSaveForm}
                  requiredMark={true}
                  scrollToFirstError
                  autoComplete="off"
                >
                  <Row style={rowStyle} gutter={24}>
                    <Col xs={24}>
                      <Form.Item
                        name="name"
                        label="Restaurant Name"
                        rules={[
                          {
                            required: true,
                            message: 'Please input the restaurant name!',
                          },
                        ]}
                      >
                        <Input/>
                      </Form.Item>
                    </Col>
                    <Col xs={24}>
                      <Form.Item
                        name="commission"
                        label="Commission for Company (in %)"
                      >
                        <InputNumber
                          min={0}
                          max={100}
                          style={{
                            width: '100%',
                          }}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24}>
                      <Form.Item
                        name="deliveryTime"
                        label="Delivery Time (in minutes)"
                      >
                        <InputNumber
                          min={0}
                          max={1000}
                          style={{
                            width: '100%',
                          }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row style={rowStyle} gutter={24}>
                    {/*<Col xs={24} md={12}>*/}
                    {/*  <Form.Item*/}
                    {/*    name="deliveryCharge"*/}
                    {/*    label="Delivery Charge"*/}
                    {/*    rules={[*/}
                    {/*      {*/}
                    {/*        required: true,*/}
                    {/*        message: 'Please select Delivery Charge Option',*/}
                    {/*      },*/}
                    {/*    ]}*/}
                    {/*  >*/}
                    {/*    <Select*/}
                    {/*      style={{ width: '100%' }}*/}
                    {/*      showSearch*/}
                    {/*      optionFilterProp="children"*/}
                    {/*      filterOption={(input, option) =>*/}
                    {/*        option.children*/}
                    {/*          .toLowerCase()*/}
                    {/*          .indexOf(input.toLowerCase()) >= 0*/}
                    {/*      }*/}
                    {/*    >*/}
                    {/*      {deliveryCharge.map((dc, idx) => (*/}
                    {/*        <Select.Option key={idx} value={dc._id}>*/}
                    {/*          {dc.name}*/}
                    {/*        </Select.Option>*/}
                    {/*      ))}*/}
                    {/*    </Select>*/}
                    {/*  </Form.Item>*/}
                    {/*</Col>*/}
                    <Col xs={24} md={24}>
                      <Form.Item
                        name="tax"
                        label="Choose Tax"
                        rules={[
                          {
                            required: true,
                            message: 'Please select Tax Option',
                          },
                        ]}
                      >
                        <Select
                          style={{ width: '100%' }}
                          showSearch
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {tax.map((tc, idx) => (
                            <Select.Option key={idx} value={tc._id}>
                              {tc.name}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row style={rowStyle} gutter={24}>
                    <Col xs={24} md={12}>
                      <Form.Item name="category" label="Category">
                        <Input/>
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                      <Form.Item
                        name="popularity"
                        label="How popular is this restaurant?"
                        initialValue={3}
                        rules={[
                          {
                            required: true,
                            message:
                              'Please select how popular is this restaurant?',
                          },
                        ]}
                      >
                        <Select
                          style={{ width: '100%' }}
                          showSearch
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {[
                            'Not Popular',
                            'Average',
                            'Good',
                            'Popular',
                            'Most Popular',
                          ].map((poplarity, idx) => (
                            <Select.Option key={idx} value={idx + 1}>
                              {poplarity}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row style={rowStyle} gutter={24}>
                    <Col xs={24} md={24}>
                      <Form.Item
                        name="availableFoodCategory"
                        label="Available Food Category"
                        rules={[
                          {
                            required: true,
                            message: 'Please select atleast one',
                          },
                        ]}
                      >
                        <Select
                          mode="multiple"
                          style={{ width: '100%' }}
                          placeholder="Select Food Category"
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {foodCategory.map((category) => (
                            <Select.Option value={category._id}>
                              {category.name}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row style={rowStyle} gutter={24}>
                    <Col xs={24} md={12}>
                      <Form.Item
                        name="regionID"
                        label="Region"
                        rules={[
                          {
                            required: true,
                            message: 'Please select region',
                          },
                        ]}
                      >
                        <Select
                          style={{ width: '100%' }}
                          placeholder="Select a region"
                          showSearch
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {regions.map((region) => (
                            <Select.Option value={region._id}>
                              {region.name}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} lg={12}>
                      <Form.Item
                        name="phoneNumber"
                        label="Phone Number (include country code)"
                        rules={[
                          {
                            required: false,
                          },
                          {
                            validator: (rule, telNo) => {
                              if (!telNo) {
                                return Promise.resolve();
                              } else if (telNo.length < 5 || telNo.length > 15) {
                                return Promise.reject('Invalid Phone number');
                              }
                              const re = /^[+]?[\s./0-9]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/g;
                              if (re.test(telNo)) {
                                return Promise.resolve();
                              }
                              return Promise.reject('Invalid Phone number');
                            },
                          },
                        ]}
                      >
                        <Input type="tel"/>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row style={rowStyle} gutter={24}>
                    <Col xs={24} lg={12}>
                      <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                          {
                            type: 'email',
                            message: 'Please input valid email',
                          },
                        ]}
                      >
                        <Input
                          onChange={({ target: { value } }) =>
                            setRestaurantEmail(value)
                          }
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} lg={12}>
                      <Form.Item name="website" label="Website">
                        <AutoComplete
                          options={websiteOptions}
                          onChange={onWebsiteChange}
                          placeholder="website"
                        >
                          <Input/>
                        </AutoComplete>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Divider orientation="left">Address</Divider>
                  <Row style={rowStyle} gutter={24}>
                    <Col xs={24} md={12}>
                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: 'Please select State',
                          },
                        ]}
                        name={['address', 'state']}
                        label="State"
                      >
                        <Input />

                        {/*<Select*/}
                        {/*  style={{ width: '100%' }}*/}
                        {/*  placeholder="Select State"*/}
                        {/*  showSearch*/}
                        {/*  optionFilterProp="children"*/}
                        {/*  filterOption={(input, option) =>*/}
                        {/*    option.children*/}
                        {/*      .toLowerCase()*/}
                        {/*      .indexOf(input.toLowerCase()) >= 0*/}
                        {/*  }*/}
                        {/*>*/}
                        {/*  {Object.keys(states)*/}
                        {/*    .map((key) => (*/}
                        {/*      <Select.Option value={states[key]}>*/}
                        {/*        {states[key]}*/}
                        {/*      </Select.Option>*/}
                        {/*    ))}*/}
                        {/*</Select>*/}
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: 'Please input City',
                          },
                        ]}
                        name={['address', 'city']}
                        label="City"
                      >
                        <Input/>
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: 'Please input Street',
                          },
                        ]}
                        name={['address', 'street']}
                        label="Street"
                      >
                        <Input/>
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: 'Please input Zip Code',
                          },
                        ]}
                        name={['address', 'zipCode']}
                        label="Zip Code"
                      >
                        <InputNumber
                          style={{
                            width: '100%',
                          }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Divider/>
                  <Row style={rowStyle} gutter={24}>
                    <Col xs={24}>
                      <Form.Item label="Description">
                        <Editor
                          //  initialEditorState={shortDescriptionState}
                          wrapperClassName="wysisyg-wrapper"
                          editorState={descriptionState}
                          onEditorStateChange={setDescriptionState}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row style={rowStyle} gutter={24}>
                    <Col xs={24} md={8}>
                      <Form.Item name="hasDietPlan" label="Has Diet Plan?">
                        <Switch onChange={(status) => setDietPlan(status)}/>
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={16}>
                      <Form.Item
                        name="dietPlans"
                        label="Choose Available Diet Plans"
                        rules={[]}
                      >
                        <Select
                          disabled={!hasDietPlan}
                          mode="multiple"
                          style={{ width: '100%' }}
                          placeholder="Select Plans"
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {dietPlans.map((dietPlan) => (
                            <Select.Option value={dietPlan._id}>
                              {dietPlan.name}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row style={rowStyle} gutter={24}>
                    <Col xs={24} md={8}>
                      <Form.Item name="userPickup" label="User Pick up Facility">
                        <Switch defaultChecked/>
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={16}>
                      <Form.Item
                        name="famousFor"
                        label="Restaurant Famous For (minimum 2)"
                        help="American, Fast Food, Pizza"
                      >
                        <Select
                          dropdownRender={false}
                          mode="tags"
                          style={{ width: '100%' }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row style={rowStyle} gutter={24}>
                    <Col xs={24} md={8}>
                      <Form.Item
                        name="hasServiceCharge"
                        label="Collect Service Charge?"
                      >
                        <Switch
                          value={hasServiceCharge}
                          onChange={(checked) => setHasServiceCharge(checked)}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={16}>
                      <Form.Item
                        name="serviceCharge"
                        label="Service Charge (%) for every food"
                      >
                        <InputNumber
                          disabled={!hasServiceCharge}
                          min={0}
                          max={100}
                          style={{
                            width: '100%',
                          }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row style={rowStyle} gutter={24}>
                    <Col xs={24} md={8}>
                      <Form.Item
                        name="hasDeliveryCondition"
                        label="has free delivery scheme?"
                      >
                        <Switch
                          onChange={(checked) => setHasDeliveryCondition(checked)}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={16}>
                      <Form.Item
                        name="minimumSpentForFreeDelivery"
                        label="Minimum Spent ($) For Free delivery?"
                      >
                        <InputNumber
                          min={1}
                          style={{
                            width: '100%',
                          }}
                          disabled={!hasDeliveryCondition}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row style={rowStyle} gutter={24}>
                    <Col xs={24} md={8}>
                      <Form.Item name="activeStatus" label="Active Status">
                        <Switch defaultChecked/>
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={16}>
                      <Form.Item
                        name="minimumSpentToCheckout"
                        label="Minimum Spent ($) To Checkout?"
                      >
                        <InputNumber
                          min={1}
                          style={{
                            width: '100%',
                          }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row style={rowStyle} gutter={24}>
                    <Col xs={24} md={8}>
                      <Form.Item name="dining" label="Dining Facility?">
                        <Switch/>
                      </Form.Item>
                    </Col>
                    <Col xs={16}>
                      <Form.Item name="keywords" label="Keywords">
                        <Select
                          dropdownRender={false}
                          mode="tags"
                          style={{ width: '100%' }}
                        ></Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Divider>Active Hours</Divider>
                  <Row style={rowStyle} gutter={24}>
                    <Col xs={24} lg={8}>
                      <Form.Item
                        name={['openTime', 'isSameTimeEveryDay']}
                        label="Opening Type"
                        initialValue={openingType}
                      >
                        <Radio.Group
                          onChange={({ target: { value } }) =>
                            setOpeningType(value)
                          }
                        >
                          <Radio value={true}>Same Time Every Day</Radio>
                          <Radio value={false}>Different Time Every Day</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </Col>
                    <Col xs={24} lg={8}>
                      <Form.Item
                        name={['openTime', 'everyday', 'startTime']}
                        label="Open Time"
                      >
                        <TimePicker disabled={!openingType} format={format}/>
                      </Form.Item>
                    </Col>
                    <Col xs={24} lg={8}>
                      <Form.Item
                        name={['openTime', 'everyday', 'endTime']}
                        label="Close Time"
                      >
                        <TimePicker disabled={!openingType} format={format}/>
                      </Form.Item>
                    </Col>
                  </Row>
                  {!openingType && (
                    <>
                      {days.map((day) => (
                        <Row key={day} style={rowStyle} gutter={24}>
                          <Col xs={24} lg={8}>
                            <Form.Item
                              name={['openTime', day, 'isClosed']}
                              label={((string) =>
                                string.charAt(0)
                                  .toUpperCase() + string.slice(1))(
                                day
                              )}
                              initialValue={false}
                            >
                              <Radio.Group
                                onChange={({ target: { value } }) =>
                                  setIsClosedObj({
                                    ...isClosedObj,
                                    [day]: value,
                                  })
                                }
                              >
                                <Radio value={false}>Open</Radio>
                                <Radio value={true}>Closed</Radio>
                              </Radio.Group>
                            </Form.Item>
                          </Col>
                          <Col xs={24} lg={8}>
                            <Form.Item
                              name={['openTime', day, 'startTime']}
                              label="Open Time"
                            >
                              <TimePicker
                                format={format}
                                disabled={isClosedObj[day]}
                              />
                            </Form.Item>
                          </Col>
                          <Col xs={24} lg={8}>
                            <Form.Item
                              name={['openTime', day, 'endTime']}
                              label="Close Time"
                            >
                              <TimePicker
                                format={format}
                                disabled={isClosedObj[day]}
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                      ))}
                    </>
                  )}
                  <Divider>Location</Divider>
                  <Row style={{
                    ...rowStyle,
                    marginTop: 20,
                    height: 300
                  }}>
                    <MapViewer
                      activeMarker={{
                        ...location,
                        name:
                          formRef.current && formRef.current.getFieldValue('name'),
                      }}
                      markerAppendable
                      height={400}
                      onMapClick={onLocChange}
                      options={{
                        zoom: 7,
                        disableDefaultUI: true,
                      }}
                    />
                  </Row>
                  <Divider orientation="left">
                <span
                  style={{
                    display: 'flex',
                    fexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  Agreement Documents
                  <Tooltip title={`Valid File Format: docx, pdf, jpeg`}>
                    <QuestionCircleFilled
                      style={{
                        marginLeft: 8,
                      }}
                    />
                  </Tooltip>{' '}
                </span>
                  </Divider>
                  <Row style={{
                    ...rowStyle,
                    marginTop: 20
                  }}>
                    <DragDropUpload
                      style={{
                        width: '100%',
                      }}
                      title={false}
                      // maxFile={5}
                      multiple={true}
                      title={fileTitle}
                      fileNames={agreementDoc}
                      setFileNames={setAgreementDoc}
                    />
                  </Row>
                  <Divider orientation="left">
                <span
                  style={{
                    display: 'flex',
                    fexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  Pictures Wall
                  <Tooltip title={`Required Image size: ${GALLERY_IMAGE_SIZE}`}>
                    <QuestionCircleFilled
                      style={{
                        marginLeft: 8,
                      }}
                    />
                  </Tooltip>{' '}
                </span>
                  </Divider>
                  <Row style={{
                    ...rowStyle,
                    marginTop: 20
                  }}>
                    <GalleryUpload
                      fileNames={fileNames}
                      title={imageTitle}
                      setFileNames={setFileNames}
                    />
                  </Row>
                  <Divider orientation="left">
                <span
                  style={{
                    display: 'flex',
                    fexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  Contact person
                  <Tooltip title={'Person representing the Business'}>
                    <QuestionCircleFilled
                      style={{
                        marginLeft: 8,
                      }}
                    />
                  </Tooltip>{' '}
                </span>
                  </Divider>
                  <Row style={{
                    ...rowStyle,
                    marginTop: 20
                  }} gutter={24}>
                    <Col xs={24} lg={12}>
                      <Form.Item name={['contactPerson', 'name']} label="name">
                        <Input/>
                      </Form.Item>
                    </Col>
                    <Col xs={24} lg={12}>
                      <Form.Item
                        name={['contactPerson', 'phoneNumber']}
                        label="Phone Number (include country code)"
                        rules={[
                          {
                            required: false,
                          },
                          {
                            validator: (rule, telNo) => {
                              if (!telNo) {
                                return Promise.resolve();
                              } else if (telNo.length < 5 || telNo.length > 15) {
                                return Promise.reject('Invalid Phone number');
                              }
                              const re = /^[+]?[\s./0-9]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/g;
                              if (re.test(telNo)) {
                                return Promise.resolve();
                              }
                              return Promise.reject('Invalid Phone number');
                            },
                          },
                        ]}
                      >
                        <Input type="tel"/>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row style={{
                    ...rowStyle,
                    marginTop: 20
                  }} gutter={24}>
                    <Col xs={24} lg={12}>
                      <Form.Item
                        rules={[
                          {
                            type: 'email',
                            message: 'Please input the valid email.',
                          },
                        ]}
                        name={['contactPerson', 'email']}
                        label="Email"
                      >
                        <Input/>
                      </Form.Item>
                    </Col>
                    <Col xs={24} lg={12}>
                      <Form.Item
                        name={['contactPerson', 'position']}
                        label="Designation"
                      >
                        <Input/>
                      </Form.Item>
                    </Col>
                  </Row>
                  {getLoginDetail()}
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
                        <Button type="primary" htmlType="submit" loading={spinning}>
                          {itemId ? 'Update' : 'Create'}
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
              </Col></Row>
            </Tabs.TabPane>
            {status === "ACCEPTED" && itemId && <Tabs.TabPane tab="Login Detail" key="2">
              <Row style={{ width: '100%' }}>
                <Col xs={24}>
                  {getLoginDetail()}
                  <Button onClick={onResetPassword} icon={<KeyOutlined/>} type="primary">
                    Reset Password
                  </Button>
                </Col>
              </Row>
            </Tabs.TabPane>}

          </Tabs>
        </Row>
        {/* </Spin> */}
      </AddPageLayout>
    </Row>
  );
}
