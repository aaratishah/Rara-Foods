import { Button, Col, Divider, Form, Row } from "antd";
import api from "app/dashboard/api";
import AddPageLayout from "app/dashboard/components/ListTable/AddPageLayout";
import { notificationSuccess } from "app/dashboard/components/notification";
import { useEffect, useRef, useState } from "react";
import routeURL from "config/routeURL";
import { convertToHTML } from "draft-convert";
import { ContentState, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import htmlToDraft from "html-to-draftjs";
import { Link } from "react-router-dom";
import { handleError } from "services/util";
import AddBlog from "app/dashboard/components/Blog/AddBlog";
import Meta from "app/dashboard/components/Blog/Meta";
const rowStyle = {
  width: "100%",
};

const backUrl = routeURL.cms.home();
const pageTitle = "Blog";
/*
	Things to Change
	1. imageTitle
	
	
	*/
export default function ItemAdd(props) {
  const {
    match: {
      params: { itemId },
    },
  } = props;

  const [title, setTitle] = useState("");
  const [descriptionState, setDescriptionState] = useState(
    EditorState.createEmpty()
  );
  const [fileNames, setFileNames] = useState([]);
  const [spinning, setSpinning] = useState(false);
  const formRef = useRef();

  const onSaveForm = (values) => {
    console.log("Values");
    const body = convertToHTML(descriptionState.getCurrentContent());
    const { blogTitle, metaDesc, author, metaTag, metaTitle } = values;

    const jsonData = {
      title: blogTitle,
      description: body,
      links: "http:test.com",
      images: fileNames,
      author,
      metaDescription: {
        title: metaTitle,
        description: metaDesc,
        tags:
          typeof metaTag === "object"
            ? metaTag
            : metaTag.split(",").map((item) => item.trim()),
      },
    };

    setSpinning(true);
    api.blog
      .save_blog(jsonData)
      .then((data) => {
        notificationSuccess(data.message);
        formRef.current.resetFields();
        setDescriptionState(EditorState.createEmpty());
      })
      .catch(handleError)
      .finally(() => setSpinning(false));
  };

  const fillForm = (data) => {
    if (data && data.title) {
      const { author, title, images, links, description } = data;
      let mTag, mTitle, mDesc;
      mTag = mTitle = mDesc = "";
      if (data.metaDescription) {
        const { title, tags, description } = data.metaDescription;
        mTag = tags;
        mTitle = title;
        mDesc = description;
      }

      const blocksFromHTML = htmlToDraft(description).contentBlocks;
      setDescriptionState(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(blocksFromHTML)
        )
      );

      formRef.current.setFieldsValue({
        author,
        blogDesc: descriptionState,
        blogTitle: title,
        category: undefined,
        links,
        metaDesc: mDesc,
        metaTag: mTag,
        metaTitle: mTitle,
        upload: images,
      });
    }

    if (data.images) setFileNames(data.images);
  };

  useEffect(() => {
    if (itemId) {
      setSpinning(true);
      api.blog
        .read(itemId)
        .then(({ data }) => fillForm(data))
        .catch(handleError)
        .finally(() => setSpinning(false));
    }
  }, [itemId]);

  return (
    <Row style={{ ...rowStyle, padding: "24px 40px" }}>
      <AddPageLayout
        title={pageTitle}
        breadCrumb={[
          {
            title: "Home",
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
              backgroundColor: "#fff",
              borderRadius: 8,
              boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
              padding: 30,
            }}
          >
            <Form layout="vertical" onFinish={onSaveForm} ref={formRef}>
              <AddBlog
                title={title}
                rowStyle={rowStyle}
                descriptionState={descriptionState}
                setDescriptionState={setDescriptionState}
                onImageUpload={{ fileNames, setFileNames }}
              />
              <Divider orientation="left" />
              <Meta />

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
            </Form>
          </Col>
        </Row>
        {/* </Spin> */}
      </AddPageLayout>
    </Row>
  );
}
