import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {Button, Col, Divider, Form, Input, InputNumber, Row, Select, TimePicker} from 'antd';
import React from 'react';
const rowStyle = { width: '100%' };
const format = 'HH:mm';
export default function TimeSlab() {
    return (
        <Form.List name="slab">
            {(fields, { add, remove }) => (
                <>
                    {fields.map((field) => {
                        return (
                            <>
                                <Row
                                    key={field.key}
                                    style={{
                                        ...rowStyle,
                                        padding: 10,
                                        borderRadius: 5,
                                        backgroundColor: '#e3f2fd',
                                    }}
                                    align="middle"
                                    justify="space-between"
                                >
                                    <Col xs={23}>
                                        <Row
                                            style={{
                                                ...rowStyle,
                                            }}
                                            gutter={24}
                                        >
                                            <Col xs={22} md={7}>
                                                <Form.Item
                                                    {...field}
                                                    label="Start Time "
                                                    name={[field.name, 'startTime']}
                                                    fieldKey={[field.fieldKey, 'startTime']}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Start time is missing.',
                                                        },
                                                    ]}
                                                >
                                                <TimePicker format={format} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={22} md={7}>
                                                <Form.Item
                                                    {...field}
                                                    label="End Time "
                                                    name={[field.name, 'endTime']}
                                                    fieldKey={[field.fieldKey, 'endTime']}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'End time is missing.',
                                                        },
                                                    ]}
                                                >
                                                    <TimePicker format={format} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={22} md={7}>
                                                <Form.Item
                                                    {...field}
                                                    label={`Charge ( ${process.env.REACT_APP_CURRENCY_SYMBOL} per K.M )`}
                                                    name={[field.name, 'charge']}
                                                    fieldKey={[field.fieldKey, 'charge']}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Charge is missing.',
                                                        },
                                                    ]}
                                                >
                                                    <InputNumber
                                                        min={0}
                                                        style={{
                                                            width: '100%'
                                                        }}/>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={1}>
                                        <MinusCircleOutlined onClick={()=>remove(field.name)} style={{
                                            color: "red",
                                            fontSize: 22,
                                            cursor: 'pointer'
                                        }} />
                                    </Col>
                                </Row>
                                <Divider />
                            </>
                        );
                    })}
                    <Row>
                        <Form.Item>
                            <Button
                                type="dashed"
                                onClick={() => add()}
                                block
                                icon={<PlusOutlined />}
                            >
                                Add Slab
                            </Button>
                        </Form.Item>
                    </Row>
                </>
            )}
        </Form.List>
    );
}
