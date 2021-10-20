import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Select,
} from 'antd';
import api from 'app/dashboard/api';
import AddPageLayout from 'app/dashboard/components/ListTable/AddPageLayout';
import routeURL from 'config/routeURL';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { handleError } from 'services/util';

const rowStyle = {
  width: '100%',
};

const backUrl = routeURL.cms.shipping_charge();
const pageTitle = 'Shipping Charge';

export default function ItemAdd(props) {
  const {
    match: {
      params: { itemId },
    },
  } = props;
  var formRef = useRef();
  const [spinning, setSpinning] = useState(false);

  const onSaveForm = (value) => {
    // validate here
    if (true) {
      var jsonData = {
        ...value,
      };
      if (itemId) jsonData._id = itemId;
      setSpinning(true);
      api.shipping_charge
        .save(jsonData)
        .then((data) => {
          message.info(data.message);
          props.history.push(backUrl);
        })
        .catch(handleError)
        .finally(() => setSpinning(false));
    }
  };

  const fillForm = (data) => {
    formRef.current.setFieldsValue({
      activeStatus: data.activeStatus,
      charge: data.charge,
      description: data.description,
      name: data.name,
      baseCharge: data.baseCharge,
      driverCommission: data.driverCommission,
      vehicleType: data.vehicleType,

    });
  };

  useEffect(() => {
    if (itemId) {
      setSpinning(true);
      api.shipping_charge
        .read(itemId)
        .then(({ data }) => fillForm(data))
        .catch(handleError)
        .finally(() => setSpinning(false));
    }
  }, [itemId]);

  return (
    <Row style={{ ...rowStyle, padding: '24px 40px' }}>
      <AddPageLayout
        title={itemId ? `Update ${pageTitle}` : `Add ${pageTitle}`}
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
            title: itemId ? 'Update' : 'Add',
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
              <Row style={rowStyle} gutter={24}>
                <Col xs={24}>
                  <Form.Item
                    name="name"
                    label="Title"
                    rules={[
                      {
                        required: true,
                        message: 'Please input the Title!',
                      },
                    ]}
                  >
                    <Input placeholder="say, Flat Charge" />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
											name="vehicleType"
											label="Vehicle Type"
											rules={[
												{
													required: true,
													message: "Please select a Vehicle Type",
												},
											]}
										>
											<Select
												style={{ width: "100%" }}
												placeholder="Select Vehicle Type"
												optionFilterProp="children"
												filterOption={(input, option) =>
													option.children
														.toLowerCase()
														.indexOf(input.toLowerCase()) >= 0
												}
											>
												{['bike', 'cycle', 'car'].map((vehicle) => (
													<Select.Option value={vehicle}>
														{vehicle}
													</Select.Option>
												))}
											</Select>
										</Form.Item>
              <Row style={rowStyle} gutter={24}>
                <Col xs={24}>
                  <Form.Item
                    name="baseCharge"
                    label={`Base Charge (in ${process.env.REACT_APP_CURRENCY_SYMBOL})`}
                    rules={[
                      {
                        required: true,
                        message: 'Please input the Base Charge!',
                      },
                    ]}
                  >
                    <InputNumber
                      style={{
                        width: '100%',
                      }}
                      min={0}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row style={rowStyle} gutter={24}>
                <Col xs={24}>
                  <Form.Item
                    name="charge"
                    label={`Delivery Charge (in ${process.env.REACT_APP_CURRENCY_SYMBOL}) per K.M.`}
                    rules={[
                      {
                        required: true,
                        message: 'Please input the fare per kilometre!',
                      },
                    ]}
                  >
                    <InputNumber
                      style={{
                        width: '100%',
                      }}
                      min={0}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row style={rowStyle} gutter={24}>
                <Col xs={24}>
                  <Form.Item
                    help="percentage of Total Food Price "
                    name="driverCommission"
                    label={`Rider Commision ( % )`}
                    rules={[
                      {
                        required: true,
                        message:
                          'Please input the rider commission in percentage!',
                      },
                    ]}
                  >
                    <InputNumber
                      style={{
                        width: '100%',
                      }}
                      min={0}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row style={rowStyle} gutter={24}>
                <Col xs={24}>
                  <Form.Item name="description" label="Description">
                    <Input.TextArea autoSize={{ minRows: 4 }} />
                  </Form.Item>
                </Col>
              </Row>
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
          </Col>
        </Row>
        {/* </Spin> */}
      </AddPageLayout>
    </Row>
  );
}
