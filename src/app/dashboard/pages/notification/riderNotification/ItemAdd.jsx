import { Button, Col, DatePicker, Divider, Form, Input, Row } from "antd";
import api from "app/dashboard/api";
import AddPageLayout from "app/dashboard/components/ListTable/AddPageLayout";
import routeURL from "config/routeURL";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { handleError } from "services/util";
import { notificationSuccess } from "../../../components/notification";
import moment from "moment";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToHTML } from "draft-convert";
import { ContentState, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import htmlToDraft from "html-to-draftjs";
import GalleryUpload from "../../../components/GalleryUpload";

const rowStyle = {
  width: "100%",
};

const backUrl = routeURL.cms.rider_notification();
const pageTitle = "Broadcast Rider Notification";
const imageTitle = "rider_notification";

export default function ItemAdd(props) {
  const {
    match: {
      params: { itemId },
    },
  } = props;
  const formRef = useRef();
  const [spinning, setSpinning] = useState(false);
  const [iconImage, setIconImage] = useState([]);
  const [contentState, setContentState] = useState(EditorState.createEmpty());
  const onSaveForm = (value) => {
    // validate here
    if (true) {
      const content = convertToHTML(contentState.getCurrentContent());

      const jsonData = {
        ...value,
        content,
        photo: iconImage.length > 0 ? iconImage[0] : null
      };
      setSpinning(true);
      api.notification.rider
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
    if(data.photo) setIconImage([data.photo]);
    formRef.current.setFieldsValue({
      // activeStatus: data.activeStatus,
      campaignName: data.campaignName,
      title: data.title,
      body: data.body,
      link: data.link,
      expiredAt: data.expiredAt ? moment(data.expiredAt) : null,
    });
    if (data.content) {
      const blocksFromHTML = htmlToDraft(data.content).contentBlocks;
      setContentState(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(blocksFromHTML)
        )
      );
    }
  };

  useEffect(() => {
    if (itemId) {
      setSpinning(true);
      api.notification.rider
        .read(itemId)
        .then(({ data }) => fillForm(data))
        .catch(handleError)
        .finally(() => setSpinning(false));
    }
  }, [itemId]);

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
                    name="campaignName"
                    label="Campaign Name *"
                    rules={[
                      {
                        required: true,
                        message: "Please input the campaign name!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item name="title" label="Notification Title">
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item name="body" label="Notification Body">
                    <Input.TextArea />
                  </Form.Item>
                </Col>
              </Row>

              <Row style={rowStyle} gutter={24}>
                <Col xs={24}>
                  <Form.Item
                    label="Notification Content (Optional)"
                    help="you can style the content when rider open notification page inside app"
                  >
                    <Editor
                      wrapperClassName="wysisyg-wrapper"
                      editorState={contentState}
                      onEditorStateChange={setContentState}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row
                style={rowStyle}
                gutter={24}
                style={{
                  marginTop: 30,
                }}
              >
                <Col xs={24} md={12}>
                  <Form.Item
                    name="expiredAt"
                    label="Notification expire at"
                    help="By Default, After 1 year"
                    initialValue={moment()
                        .add(1, "year")}
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

                <Col xs={24} md={12}>
                  <Form.Item
                    name="link"
                    label="Link when notification clicked (optional)"
                  >
                    <Input
                      addonBefore="https://"
                      placeholder="www.facebook.com/abcdef.php"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row style={{ ...rowStyle, marginTop: 20 }}>
                <Form.Item label="Include Photo">
                  <GalleryUpload
                    maxFile={1}
                    fileNames={iconImage}
                    imageTitle={`${imageTitle}`}
                    setFileNames={setIconImage}
                  />
                </Form.Item>
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
                    <Button type="primary" htmlType="submit" loading={false}>
                      {itemId ? "Broadcast Again to all Riders" : "Broadcast to all Riders"}
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
