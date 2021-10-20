import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Checkbox,
  Col,
  Collapse,
  Divider,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Popconfirm,
  Radio,
  Row,
  Typography,
} from 'antd';
import { notificationError } from 'app/dashboard/components/notification';
import api from 'app/dashboard/api';
import { notificationSuccess } from 'app/web/components/notification';
import config from 'config';
import { useEffect, useRef, useState } from 'react';
import { handleError } from 'services/util';
import './index.css';
const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
};

export default function FoodDetailModal({
  restaurantDetail,
  data,
  preview,
  setPreview,
  orderId,
  isGuest,
  fetchOrder
}) {
  // const [formRef, setFormRef] = useState(useRef())
  const [addonForm, setAddonForm] = useState({});
  const [quantity, setQuantity] = useState(data.minQuantity);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [price, setPrice] = useState();

  useEffect(() => {
    if (addonForm) {
      updatePrice();
    }
  }, [addonForm]);

  const setAddonFormValue = (key, name, value) => {
    setAddonForm({
      ...addonForm,
      [key]: {
        ...addonForm[key],
        [name]: value,
      },
    });
  };
  useEffect(() => {
    updatePrice();
  }, [data.price, quantity]);

  useEffect(() => {
    if (data.addon.length > 0) {
      const addonFormTemp = {};
      for (const addon of data.addon) {
        addonFormTemp[addon._id.toString()] = {
          key: addon._id,
        };
        if (addon.optionType === 'single') {
          const selected = addon.items.find((curr) => curr.isCheckDefault);
          if (selected) addonFormTemp[addon._id].selected = selected._id;
        } else if (addon.optionType === 'multiple') {
          addonFormTemp[addon._id].selected = addon.items.reduce(
            (acc, curr) => {
              if (curr.isCheckDefault) {
                acc.push(curr._id);
              }
              return acc;
            },
            []
          );
        } else if (addon.optionType === 'number') {
          const quantity = addon.items[0];
          if (quantity && quantity.quantity > 0)
            addonFormTemp[addon._id].quantity = quantity.quantity;
        }
      }
      setAddonForm(addonFormTemp);
    }
  }, [data]);

  const getFormItem = (addon) => {
    switch (addon.optionType) {
      case 'single':
        return (
          <Radio.Group
            style={{
              width: '100%',
              marginLeft: 8
            }}
            onChange={({ target: { value } }) => {
              setAddonFormValue(addon._id, 'selected', value);
            }}
            value={
              addonForm && addonForm[addon._id] && addonForm[addon._id].selected
            }
          >
            {addon.items.map((item) => (
              <Radio
                style={radioStyle}
                value={item._id.toString()}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <span
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Col>{item.name}</Col>
                  <Col>
                    {process.env.REACT_APP_CURRENCY_SYMBOL} {item.extraPrice}
                  </Col>
                </span>
              </Radio>
            ))}
          </Radio.Group>
        );
      case 'multiple':
        return (
          <Checkbox.Group
            style={{
              marginLeft: 8,
              width: '100%',
            }}
            onChange={(value) => {
              setAddonFormValue(addon._id, 'selected', value);
            }}
            value={
              addonForm && addonForm[addon._id] && addonForm[addon._id].selected
            }
          >
            {addon.items.map((item) => (
              <Checkbox
                style={radioStyle}
                value={item._id.toString()}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <span
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Col>{item.name}</Col>
                  <Col>
                    {process.env.REACT_APP_CURRENCY_SYMBOL} {item.extraPrice}
                  </Col>
                </span>
              </Checkbox>
            ))}
          </Checkbox.Group>
        );
        break;
      case 'number':
        return (
          <span
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginLeft: 8,
              alignItems: 'center',
            }}
          >
            <InputNumber
              step={1}
              precision={0}
              onChange={(value) => {
                setAddonFormValue(addon._id, 'quantity', value);
              }}
              value={
                addonForm &&
                addonForm[addon._id] &&
                addonForm[addon._id].quantity
              }
              min={addon.items ? addon.items[0].quantity : 1}
            />
            <Col>
              {process.env.REACT_APP_CURRENCY_SYMBOL}{' '}
              {addon.items ? addon.items[0].extraPrice: 0}
            </Col>
          </span>
        );
      default:
        return <p>Invalid Addon</p>;
    }
  };

  const updatePrice = () => {
    const price = getPrice();
    setPrice(price);
  };
  const getProductPrice = () => {
    let productPrice = data.price;
    if (
      data.discountType === 'percent' &&
      data.discountPercent >= 0 &&
      data.discountPercent <= 100
    ) {
      productPrice = productPrice - (data.discountPercent / 100) * productPrice;
    } else if (
      data.discountType === 'amount' &&
      data.discountAmount > 0 &&
      data.discountAmount <= data.price
    ) {
      productPrice = productPrice - data.discountAmount;
    }
    return productPrice;
  };
  const getPrice = () => {
    let productPrice = getProductPrice();
    // add addon price
    if (data.addon.length > 0) {
      const values = addonForm;
      for (const addon of data.addon) {
        const value = values[addon._id];
        if (value) {
          if (addon.optionType === 'single') {
            const selectedItemId = value.selected;
            if (selectedItemId) {
              const selectedItem = addon.items.find(
                (item) => item._id.toString() === selectedItemId.toString()
              );
              productPrice += parseFloat(selectedItem.extraPrice);
            }
          } else if (addon.optionType === 'multiple') {
            const selectedItemId = value.selected;
            if (selectedItemId) {
              const selectedItems = addon.items.filter((item) =>
                selectedItemId.includes(item._id.toString())
              );
              for (const selectedItem of selectedItems)
                productPrice += parseFloat(selectedItem.extraPrice);
            }
          } else if (addon.optionType === 'number') {
            const selectedQuantity = value.quantity;
            if (selectedQuantity) {
              const selectedItem = addon.items[0];
              productPrice = parseFloat(
                parseFloat(productPrice) +
                  parseFloat(selectedItem.extraPrice * selectedQuantity)
              ).toFixed(2);
            }
          }
        }
      }
    }
    return `$${parseFloat(productPrice).toFixed(2) * quantity}`;
  };

  const onAddToOrder = (e) => {
    e.preventDefault();
    if (true) {
      const formValue = addonForm;
      const specialInstruction = formValue.specialInstruction;
      delete formValue['specialInstruction'];
      const addon = Object.keys(formValue).map((key) => {
        const adonBody = { key };
        const adonItem = formValue[key];
        if (adonItem.selected && Array.isArray(adonItem.selected))
          adonBody.selected = adonItem.selected;
        else if (adonItem.selected) adonBody.selected = [adonItem.selected];
        if (adonItem.quantity) adonBody.quantity = adonItem.quantity;
        return adonBody;
      });
      const payload = {
        quantity,
        addon: addon,
        specialInstruction,
        foodId: data._id,
        orderId,
      };
      console.log('wow', payload);
      if (true) {
        setIsSubmitting(true);
        // TODO save order to database
        api.order
          .addFood(payload)
          .then(() => {
            setSubmitted(true);
            setPreview(false);
            if(typeof fetchOrder=== 'function') fetchOrder();
          })
          .catch(handleError)
          .finally(() => setIsSubmitting(false));
        return;
      }
      // if user is logged in post to the api
    } else {
      notificationError('Please select Option to proceed');
    }
  };

  const buildCartButtonUI = () => {
    const ButtonUI = (
      <Button
        disabled={quantity < data.minQuantity}
        style={{
          background: quantity < data.minQuantity ? '#424242' : '#000000',
          color: '#FFFFFF',
          WebkitBoxPack: 'center',
          justifyContent: 'center',
          minHeight: 56,
          cursor: quantity < data.minQuantity ? 'not-allowed' : '#pointer',
          WebkitBoxAlign: 'center',
          alignItems: 'center',
          display: 'flex',
          boxSizing: 'border-box',
        }}
      >
        <Row
          gutter={24}
          align="middle"
          style={{
            margin: 0,
          }}
        >
          <div
            style={{
              // flex: 1,
              textAlign: 'right',
              color: '#FFFFFF',
              // lineHeight: 24,
              fontSize: 16,
              paddingLeft: 40,
            }}
          >
            Add {quantity} to Order
          </div>
          <div
            style={{
              // flex: 1,
              textAlign: 'right',
              color: '#FFFFFF',
              // lineHeight: 24,
              paddingLeft: 40,
              fontSize: 14,
            }}
          >
            {price}
          </div>
        </Row>
      </Button>
    );
    return <div
      className="quick-cart"
      style={{
        background: quantity < data.minQuantity ? '#424242' : '#000000',
        cursor: quantity < data.minQuantity ? 'not-allowed' : '#pointer',
      }}
      disabled={quantity < data.minQuantity}
      onClick={onAddToOrder}
    >
      {ButtonUI}
    </div>
  };
  const ModalFooter = (
    <Row justify="space-between" align="middle" style={{}}>
      <Col
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Button
          disabled={quantity <= data.minQuantity}
          onClick={() => {
            if (quantity >= data.minQuantity) setQuantity(quantity - 1);
            else {
              message.warning(
                'You have to select ' + data.minQuantity + ' Quantity to order'
              );
            }
          }}
          shape="circle"
          icon={<MinusOutlined />}
        />
        <Typography.Title
          level={2}
          style={{
            marginLeft: 10,
            marginRight: 10,
            marginBottom: 0,
          }}
        >
          {quantity}
        </Typography.Title>
        <Button
          shape="circle"
          icon={<PlusOutlined />}
          onClick={() => {
            setQuantity(quantity + 1);
          }}
        />
      </Col>
      <Col>{buildCartButtonUI()}</Col>
    </Row>
  );

  return (
    <Modal
      className="food-detail-modal"
      title={data.name}
      style={{ top: 20 }}
      visible={preview}
      onCancel={() => setPreview(false)}
      footer={ModalFooter}
    >
      <img
        style={{
          objectFit: 'cover',
          width: '100%',
          height: 200,
        }}
        src={config.getImageHost(data.activeImage)}
        alt
      />
      <Card>
        <Typography.Title level={5}>{data.name}</Typography.Title>
        {data.calorie > 0 && (
          <Typography.Text>{data.calorie} cal</Typography.Text>
        )}
        {data.addon.length > 0 && (
          <Collapse
            defaultActiveKey={['1']}
            // onChange={callback}
            expandIconPosition={'right'}
          >
            <Collapse.Panel
              key="1"
              header={
                <Typography.Text
                  style={{
                    fontWeight: 600,
                  }}
                >
                  Select Option
                </Typography.Text>
              }
            >
              {data.addon.map((addon, idx) => {
                return (
                  <Row style={{ width: '100%' }}>
                    {/* <Row>{addon.title}</Row> */}
                    <Form.Item

                      label={addon.title}
                      style={{
                        width: '100%',
                      }}
                    >
                      {getFormItem(addon)}
                    </Form.Item>
                    {idx < data.addon.length - 1 && <Divider />}
                  </Row>
                );
              })}
              {/* <Form
                onFieldsChange={updatePrice}
                // wrapperCol={{
                // 	offset: 1,
                // }}
                // {...layout}
                ref={formRef}
                // form={form}
                layout="vertical"
                name="control-ref"
                onFinish={onAddToOrder}
                requiredMark={true}
                scrollToFirstError
              >

                <Form.Item
                  label={'Special Instruction (Optional)'}
                  style={{
                    width: '100%',
                  }}
                  name={'specialInstruction'}
                >
                  <Input.TextArea placeholder="Special Instructions (optional)" />
                </Form.Item>
              </Form> */}
            </Collapse.Panel>
          </Collapse>
        )}
        {data.calorie > 0 && (
          <Typography.Paragraph>
            2,000 calories a day is used for general nutrition advice, but
            calorie needs vary. Additional nutrition information available upon
            request.
          </Typography.Paragraph>
        )}
      </Card>
    </Modal>
  );
}
