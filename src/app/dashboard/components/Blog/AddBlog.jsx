import React, { Fragment, useState } from "react";
import { Row, Form, Col, Input, Select } from "antd";
import GalleryUpload from "app/dashboard/components/GalleryUpload";
// import { UploadOutlined } from "@ant-design/icons";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const { Option } = Select;
const imageTitle = "blog";

const AddBlog = ({
  rowStyle,
  title,
  descriptionState,
  setDescriptionState,
  onImageUpload,
}) => {
  const { fileNames, setFileNames } = onImageUpload;

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
              // value={myVal}
              // onChange={(e) => setMyVal(e.target.value)}
            />
          </Form.Item>

          <Row>
            <Col xs={10}>
              <Form.Item
                name="category"
                label="Category"
                hasFeedback
                // rules={[
                //   {
                //     required: true,
                //     message: "Please select a cateogry",
                //   },
                // ]}
              >
                <Select placeholder="Choose Category" defaultValue="value-2">
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

          <Form.Item name="upload" label="Blog Image" valuePropName="fileList">
            <GalleryUpload
              fileNames={fileNames}
              title={imageTitle}
              setFileNames={setFileNames}
            />
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
