import { QuestionCircleFilled } from "@ant-design/icons";
import { Button, Col, Divider, Form, Input, message, Row, Tooltip } from "antd";
import api from "app/dashboard/api";
import GalleryUpload from "app/dashboard/components/GalleryUpload";
import AddPageLayout from "app/dashboard/components/ListTable/AddPageLayout";
import { notificationError } from "app/dashboard/components/notification";
import { FOOD_CATEGORY_IMAGE_SIZE } from "config";
import routeURL from "config/routeURL";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
const rowStyle = {
	width: "100%",
};

const backUrl = routeURL.cms.food_category();
const pageTitle = "Food Catgory";
const imageTitle = "food_category";

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
	var formRef = useRef();
	const [spinning, setSpinning] = useState(false);
	const [fileNames, setFileNames] = useState([]);

	const onSaveForm = (value) => {
		// validate here
		if (true) {
			var jsonData = {
				...value,
				images: fileNames,
			};
			if (itemId) jsonData._id = itemId;
			setSpinning(true);
			api.food_category
				.save(jsonData)
				.then((data) => {
					message.info(data.message);
					props.history.push(backUrl);
				})
				.catch((error) => {
					if (error.response && error.response.data) {
						if (typeof error.response.data.message === "string")
							return notificationError(error.response.data.message);
						let errors = error.response.data;
						Object.keys(errors).map((key) => notificationError(errors[key]));
					}
				})
				.finally(() => setSpinning(false));
		}
	};

	const fillForm = (data) => {
		setFileNames(data.images);
		formRef.current.setFieldsValue({
			activeStatus: data.activeStatus,
			name: data.name,
			extra: data.extra,
		});
	};

	useEffect(() => {
		if (itemId) {
			setSpinning(true);
			api.food_category
				.read(itemId)
				.then(({ data }) => fillForm(data))
				.catch((error) => {
					if (error.response && error.response.data) {
						if (typeof error.response.data.message === "string")
							return notificationError(error.response.data.message);
						let errors = error.response.data;
						Object.keys(errors).map((key) => notificationError(errors[key]));
					}
				})
				.finally(() => setSpinning(false));
		}
	}, [itemId]);

	return (
		<Row style={{ ...rowStyle, padding: "24px 40px" }}>
			<AddPageLayout
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
										label="Food Category Title (Say Pizza)"
										rules={[
											{
												required: true,
												message: "Please input the title!",
											},
										]}
									>
										<Input />
									</Form.Item>
								</Col>
							</Row>

							<Row style={rowStyle} gutter={24}>
								<Col xs={24}>
									<Form.Item name="extra" label="Description">
										<Input />
									</Form.Item>
								</Col>
							</Row>

							<Divider orientation="left">
								<span
									style={{
										display: "flex",
										fexDirection: "row",
										alignItems: "center",
									}}
								>
									Thumbnail Images
									<Tooltip
										title={`Required Image size: ${FOOD_CATEGORY_IMAGE_SIZE}`}
									>
										<QuestionCircleFilled
											style={{
												marginLeft: 8,
											}}
										/>
									</Tooltip>{" "}
								</span>
							</Divider>

							<Row style={{ ...rowStyle, marginTop: 20 }}>
								<GalleryUpload
									fileNames={fileNames}
									title={imageTitle}
									setFileNames={setFileNames}
								/>
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
											{itemId ? "Update" : "Create"}
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
