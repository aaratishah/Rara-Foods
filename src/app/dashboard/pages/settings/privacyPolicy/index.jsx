import { Button, Col, Divider, Form, Input, Row } from 'antd';
import api from 'app/dashboard/api';
import AddPageLayout from 'app/dashboard/components/ListTable/AddPageLayout';
import { notificationSuccess } from 'app/dashboard/components/notification';
import { useEffect, useState } from 'react';
import routeURL from 'config/routeURL';
import { convertToHTML } from 'draft-convert';
import { ContentState, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import htmlToDraft from 'html-to-draftjs';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Link } from 'react-router-dom';
import { handleError } from 'services/util';
const rowStyle = {
  width: '100%',
};

const backUrl = routeURL.cms.home();
const pageTitle = 'Privacy Policy';
/*
	Things to Change
	1. imageTitle


	*/
export default function ItemAdd(props) {
  const [title, setTitle] = useState('');
  const [descriptionState, setDescriptionState] = useState(
    EditorState.createEmpty()
  );
  const [spinning, setSpinning] = useState(false);

  const onSaveForm = () => {
    // validate here
    if (true) {
      const body = convertToHTML(descriptionState.getCurrentContent());
      var jsonData = {
        body,
        title,
      };
      // convert editorText to html to save into html;
      setSpinning(true);
      api.privacy_policy
        .save_privacy_policy(jsonData)
        .then((data) => {
          notificationSuccess(data.message);
          //   props.history.push(backUrl);
        })
        .catch(handleError)
        .finally(() => setSpinning(false));
    }
  };

  const fillForm = (data) => {
    if (data.title) setTitle(data.title);
    if (data.body) {
      const blocksFromHTML = htmlToDraft(data.body).contentBlocks;
      setDescriptionState(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(blocksFromHTML)
        )
      );
    }
  };

  useEffect(() => {
    setSpinning(true);
    api.privacy_policy
      .read()
      .then(({ data }) => fillForm(data))
      .catch(handleError)
      .finally(() => setSpinning(false));
  }, []);

  return (
    <Row style={{ ...rowStyle, padding: '24px 40px' }}>
      <AddPageLayout
        title={'Privacy Policy Page Builder'}
        breadCrumb={[
          {
            title: 'Home',
            url: routeURL.cms.home(),
          },
          {
            title: pageTitle,
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
            <Row style={rowStyle} gutter={24}>
              <Col xs={24}>
                <Form layout="vertical">
                  <Form.Item
                    label="Title"
                    rules={[
                      {
                        required: true,
                        message: 'Title is Required!',
                      },
                    ]}
                  >
                    <Input
                      value={title}
                      onChange={({ target: { value } }) => setTitle(value)}
                    />
                  </Form.Item>
                </Form>
              </Col>
            </Row>
            <Divider orientation="left"></Divider>

            <Row style={rowStyle} gutter={24}>
              <Col xs={24}>
                <Form.Item label="Detail Description">
                  <Editor
                    //  initialEditorState={shortDescriptionState}
                    wrapperClassName="wysisyg-wrapper"
                    editorState={descriptionState}
                    onEditorStateChange={setDescriptionState}
                  />
                </Form.Item>
              </Col>
            </Row>
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
                  <Button
                    type="primary"
                    onClick={onSaveForm}
                    loading={spinning}
                  >
                    Save
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
          </Col>
        </Row>
        {/* </Spin> */}
      </AddPageLayout>
    </Row>
  );
}
