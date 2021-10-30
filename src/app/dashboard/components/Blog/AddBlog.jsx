import React, { Fragment } from "react";
import { Row, Form, Col, Input, Select, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const { Option } = Select;

const AddBlog = ({
  rowStyle,
  title,
  descriptionState,
  setDescriptionState,
}) => {
  return (
    <Fragment>
      <Row style={rowStyle} gutter={24}>
        <Col xs={24}>
          <Form.Item
            label="Title"
            name="blogTitle"
            rules={[
              {
                required: true,
                message: "Title is Required!",
              },
            ]}
          >
            <Input
              placeholder="Blog Title"
              value={title}
              // onChange={}
            />
          </Form.Item>

          <Row>
            <Col xs={10}>
              <Form.Item
                name="category"
                label="Category"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please select a cateogry",
                  },
                ]}
              >
                <Select placeholder="Choose Category">
                  <Option value="value-1">Value1</Option>
                  <Option value="value-2">Value2</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={10} style={{ marginLeft: "20px" }}>
              <Form.Item
                label="Written By"
                name="author"
                rules={[
                  {
                    required: true,
                    message: "Author cannot be empty",
                  },
                ]}
              >
                <Input
                  value={title}
                  // onChange={({ target: { value } }) => setTitle(value)}
                  placeholder="Author Name"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="upload"
            label="Choose Image"
            valuePropName="fileList"
            // getValueFromEvent={normFile}
            extra="**limit 1 image"
          >
            <Upload name="logo" action="/upload.do" listType="picture">
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
        </Col>
      </Row>

      <Row style={rowStyle} gutter={24}>
        <Col xs={24}>
          <Form.Item label="Description" name="blogDesc">
            <Editor
              wrapperClassName="wysisyg-wrapper"
              editorState={descriptionState}
              onEditorStateChange={setDescriptionState}
            />
          </Form.Item>
        </Col>
      </Row>
    </Fragment>
  );
};

export default AddBlog;
