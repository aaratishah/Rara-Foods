import React, { Fragment } from "react";
import { Form, Typography, Input } from "antd";

const { Title } = Typography;
const { TextArea } = Input;

const Meta = () => {
  return (
    <Fragment>
      <Title level={4}>Meta Tags Information</Title>
      <Form.Item
        label="Title"
        name="metaTitle"
        rules={[
          {
            required: true,
            message: "Title is Required!",
          },
        ]}
      >
        <Input
          placeholder="Meta Title"
          // value={title}
          // onChange={({ target: { value } }) => setTitle(value)}
        />
      </Form.Item>

      <Form.Item
        label="Description"
        name="metaDesc"
        rules={[
          {
            required: true,
            message: "Meta Description cannot be empty",
          },
        ]}
      >
        <TextArea rows={4} placeholder="Meta description text" />
      </Form.Item>

      <Form.Item label="Tags" name="metaTag">
        <Input placeholder="tag1, tag2, tag3" />
      </Form.Item>
    </Fragment>
  );
};

export default Meta;
