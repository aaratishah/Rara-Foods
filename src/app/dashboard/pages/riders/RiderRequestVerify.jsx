import { QuestionCircleFilled } from "@ant-design/icons";
import {
	AutoComplete,
	Button,
	Col,
	DatePicker,
	Divider,
	Form,
	Input,
	InputNumber,
	Radio,
	Row,
	Select,
	Switch,
	TimePicker,
	Tooltip,
	Typography,
} from "antd";
import api from "app/dashboard/api";
import DragDropUpload from "app/dashboard/components/DragDropUpload";
import GalleryUpload from "app/dashboard/components/GalleryUpload";
import AddPageLayout from "app/dashboard/components/ListTable/AddPageLayout";
import MapViewer from "app/dashboard/components/MapViewer";
import { notificationError } from "app/dashboard/components/notification";
import { notificationSuccess } from "app/web/components/notification";
import {
	GALLERY_IMAGE_SIZE,
	RIDER_PHOTO_IMAGE_SIZE,
	mapCenterDefault,
	COUNTRY_CODE,
} from "config";
import routeURL from "config/routeURL";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
const { Paragraph } = Typography;
const rowStyle = {
	width: "100%",
};

const fileTitle = "agreement_document";
const backUrl = routeURL.cms.rider();
const pageTitle = "Rider Verification";
export default function RiderRequestVerify(props) {
	const {
		match: {
			params: { itemId },
		},
	} = props;
	var formRef = useRef();
	const [spinning, setSpinning] = useState(false);
	const [profilePhoto, setProfilePhoto] = useState([]);
	const [agreementDoc, setAgreementDoc] = useState([]);
	const [regions, setRegions] = useState([]);
	const [riderEmail, setRiderEmail] = useState("");

	const onSaveForm = (value) => {
		// validate here

		if (true) {
			var jsonData = {
				...value,
			};
			if (itemId) jsonData._id = itemId;
			if (agreementDoc.length > 0) {
				jsonData.agreementDoc = agreementDoc[0];
			} else {
				notificationError("Please Upload Agreement Documentation");
			}

			setSpinning(true);
			api.rider
				.verify(jsonData)
				.then((data) => {
					notificationSuccess(data.message);
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
		setProfilePhoto([data.photo]);
		setAgreementDoc(data.agreementDoc || []);
		setRiderEmail(data.email);
		const formField = {
			...data,
		};
		if (formField.dob) {
			formField.dob = moment(formField.dob);
		}
		formRef.current.setFieldsValue(formField);
	};

	useEffect(() => {
		setSpinning(true);
		api.region
			.readAll()
			.then(({ data }) => setRegions(data))
			.catch((error) => {
				if (error.response && error.response.data) {
					if (typeof error.response.data.message === "string")
						return notificationError(error.response.data.message);
					let errors = error.response.data;
					Object.keys(errors).map((key) => notificationError(errors[key]));
				}
			})
			.finally(() => setSpinning(false));
	}, []);

	useEffect(() => {
		if (itemId) {
			setSpinning(true);
			api.rider
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

	const getPasswordFromEmail = (email) =>
		email.includes("@") ? email.split("@")[0] : false;

	return (
		<Row style={{ ...rowStyle, padding: "24px 40px" }}>
			<AddPageLayout
				title="Verify Rider"
				breadCrumb={[
					{
						title: "Home",
						url: routeURL.cms.home(),
					},
					{
						title: "Rider",
						url: backUrl,
					},
					{
						title: "Verify",
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
							scrollToFirstError={true}
							autoComplete="off"
						>
							{/* <Tooltip title={`Required Image size: ${RIDER_PHOTO_IMAGE_SIZE}`}>
								<QuestionCircleFilled
									style={{
										marginLeft: 8,
									}}
								/>
							</Tooltip> */}
							<Row
								style={{ ...rowStyle, marginTop: 20 }}
								justify="space-between"
								gutter={24}
							>
								<Col xs={24} md={8} order={2}>
									<Form.Item label="Rider Photo">
										<GalleryUpload
											disabled={true}
											maxFile={1}
											fileNames={profilePhoto}
											setFileNames={setProfilePhoto}
										/>
									</Form.Item>
								</Col>
								<Col xs={24} md={16}>
									<Row style={rowStyle} gutter={24}>
										<Col xs={24}>
											<Form.Item
												name="name"
												label="Rider Name"
												rules={[
													{
														required: true,
														message: "Please input the rider name!",
													},
												]}
											>
												<Input disabled={true} />
											</Form.Item>
										</Col>
									</Row>
									<Row style={rowStyle} gutter={24}>
										<Col xs={24}>
											<Form.Item
												name="gender"
												label="Gender"
												rules={[
													{
														required: true,
														message: "Please select gender",
													},
												]}
											>
												<Select
													disabled={true}
													style={{ width: "100%" }}
													showSearch
													optionFilterProp="children"
													filterOption={(input, option) =>
														option.children
															.toLowerCase()
															.indexOf(input.toLowerCase()) >= 0
													}
												>
													{["male", "female", "other"].map((value, idx) => (
														<Select.Option key={idx} value={value}>
															{value}
														</Select.Option>
													))}
												</Select>
											</Form.Item>
										</Col>
									</Row>
								</Col>
							</Row>

							<Row style={rowStyle} gutter={24}>
								<Col xs={24} md={12}>
									<Form.Item
										name="regionID"
										label="Region"
										rules={[
											{
												required: true,
												message: "Please select region",
											},
										]}
									>
										<Select
											disabled={true}
											style={{ width: "100%" }}
											placeholder="Select a region"
											showSearch
											optionFilterProp="children"
											filterOption={(input, option) =>
												option.children
													.toLowerCase()
													.indexOf(input.toLowerCase()) >= 0
											}
										>
											{regions.map((region) => (
												<Select.Option value={region._id}>
													{region.name}
												</Select.Option>
											))}
										</Select>
									</Form.Item>
								</Col>
								<Col xs={24} lg={12}>
									<Form.Item
										name="dob"
										label="Date of Birth"
										rules={[
											{
												required: true,
												message: "Please input date of birth",
											},
										]}
									>
										<DatePicker
											disabled={true}
											style={{
												width: "100%",
											}}
										/>
									</Form.Item>
								</Col>
							</Row>
							<Row style={rowStyle} gutter={24}>
								<Col xs={24} lg={12}>
									<Form.Item
										name="email"
										label="Email"
										rules={[
											{
												required: true,
												message: "Please input email",
											},
											{
												type: "email",
												message: "Please input valid email",
											},
										]}
									>
										<Input
											disabled={true}
											onChange={({ target: { value } }) => setRiderEmail(value)}
										/>
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
									Agreement Documents
									<Tooltip title={`Valid File Format: docx, pdf, jpeg`}>
										<QuestionCircleFilled
											style={{
												marginLeft: 8,
											}}
										/>
									</Tooltip>{" "}
								</span>
							</Divider>
							<Row style={{ ...rowStyle, marginTop: 20 }}>
								<DragDropUpload
									style={{
										width: "100%",
									}}
									title={false}
									// maxFile={5}
									multiple={true}
									name={fileTitle}
									fileNames={agreementDoc}
									setFileNames={setAgreementDoc}
								/>
							</Row>

							{itemId && riderEmail && (
								<>
									<Divider>Login Credentials For Rider</Divider>
									<Row style={{ ...rowStyle }}>
										<div className="desc">
											{riderEmail ? (
												<>
													<Paragraph copyable={{ text: riderEmail }}>
														Email: {riderEmail}
													</Paragraph>
													<Paragraph
														copyable={{
															text: getPasswordFromEmail(riderEmail),
														}}
													>
														Password: {getPasswordFromEmail(riderEmail)}
													</Paragraph>
												</>
											) : (
												<Paragraph>
													Please input rider email to get login credentials
												</Paragraph>
											)}
										</div>
									</Row>
								</>
							)}
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
											Verify
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
