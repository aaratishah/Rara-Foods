import { QuestionCircleFilled } from "@ant-design/icons";
import {
	Button,
	Col,
	Divider,
	Form,
	Input,
	InputNumber,
	Radio,
	Row,
	Select,
	Switch,
	Tooltip,
	Typography,
} from "antd";
import api from "app/dashboard/api";
import GalleryUpload from "app/dashboard/components/GalleryUpload";
import AddPageLayout from "app/dashboard/components/ListTable/AddPageLayout";
import { notificationError } from "app/dashboard/components/notification";
import { notificationSuccess } from "app/web/components/notification";
import { GALLERY_IMAGE_SIZE } from "config";
import routeURL from "config/routeURL";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import FoodAddon from "./FoodAddon";
import _ from "lodash";
import { JwtService } from "services";
import { PRIVILEGE_ADMIN } from "config";

const { Paragraph, Text } = Typography;
const rowStyle = {
	width: "100%",
};

const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 15, offset: 1 },
};
const tailLayout = {
	wrapperCol: { offset: 8, span: 16 },
};
const slug = "food";

const imageTitle = "food_restaurant";
const fileTitle = "agreement_document";
const backUrl = routeURL.cms[slug]();
const pageTitle = "Food";
const role = JwtService.getUserRole();

export default function ItemAdd(props) {
	const {
		match: {
			params: { itemId },
		},
	} = props;
	var formRef = useRef();
	const [spinning, setSpinning] = useState(false);
	const [fileNames, setFileNames] = useState([]);
	const [foodGroups, setFoodGroups] = useState([]);
	const [foodSpecialities, setFoodSpecialities] = useState([]);
	const [restaurants, setRestaurants] = useState([]);
	const [hasDiscount, setHasDiscount] = useState("no");
	const [price, setPrice] = useState(0);
	const onSaveForm = (value) => {
		// validate here
		if (true) {
			const addon = [];
			if (value.addon)
				value.addon.forEach((on) => {
					const eachOn = _.pick(on, ["optionType", "title"]);
					var items = [];
					if (on.items && Array.isArray(on.items))
						on.items.forEach((item) => (items = [...items, item]));
					eachOn.items = items;
					addon.push(eachOn);
				});
			var jsonData = {
				...value,
				addon,
				images: fileNames,
				activeImage: fileNames && fileNames.length > 0 ? fileNames[0] : -1,
			};
			if (itemId) jsonData._id = itemId;

			setSpinning(true);
			console.log("value json", jsonData);
			api[slug]
				.save(jsonData)
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
		setFileNames(data.images || []);
		setPrice(data.price);
		setHasDiscount(data.discountType);
		formRef.current.setFieldsValue({
			activeStatus: data.activeStatus,
			name: data.name,
			keywords: data.keywords,
			subTitle: data.subTitle,
			description: data.description,
			price: data.price,
			calorie: data.calorie,
			discountType: data.discountType,
			discountPercent: data.discountPercent,
			discountAmount: data.discountAmount,
			minQuantity: data.minQuantity,
			foodSpeciality: data.foodSpeciality,
			foodGroup: data.foodGroup,
			restaurant: data.restaurant,
			addon: data.addon || [],
		});
	};

	useEffect(() => {
		if (itemId) {
			setSpinning(true);
			api[slug]
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

	useEffect(() => {
		setSpinning(true);
		api.food_group_restaurant
			.readAll()
			.then(({ data }) => setFoodGroups(data))
			.catch((error) => {
				if (error.response && error.response.data) {
					if (typeof error.response.data.message === "string")
						return notificationError(error.response.data.message);
					let errors = error.response.data;
					Object.keys(errors).map((key) => notificationError(errors[key]));
				}
			});

		api.food_speciality
			.readAll()
			.then(({ data }) => setFoodSpecialities(data))
			.catch((error) => {
				if (error.response && error.response.data) {
					if (typeof error.response.data.message === "string")
						return notificationError(error.response.data.message);
					let errors = error.response.data;
					Object.keys(errors).map((key) => notificationError(errors[key]));
				}
			});

		api.restaurant
			.readAll()
			.then(({ data }) => setRestaurants(data))
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

	return (
		<Row style={{ ...rowStyle, padding: "24px 40px" }}>
			<AddPageLayout
				title={itemId ? `Update ${pageTitle} ` : `Add ${pageTitle} `}
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
						title: itemId ? "Update " : "Add ",
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
										label="Food title"
										rules={[
											{
												required: true,
												message: "Please input the restaurant name!",
											},
										]}
									>
										<Input />
									</Form.Item>
								</Col>
							</Row>
							<Row style={rowStyle} gutter={24}>
								{role === PRIVILEGE_ADMIN && (
									<Col xs={24} md={12}>
										<Form.Item
											name="restaurant"
											label="Food for which Restaurant"
											rules={[
												{
													required: true,
													message: "Please select an Restaurant",
												},
											]}
										>
											<Select
												style={{ width: "100%" }}
												placeholder="Select Restaurant"
												optionFilterProp="children"
												filterOption={(input, option) =>
													option.children
														.toLowerCase()
														.indexOf(input.toLowerCase()) >= 0
												}
											>
												{restaurants.map((restaurant) => (
													<Select.Option value={restaurant._id}>
														{restaurant.name}
													</Select.Option>
												))}
											</Select>
										</Form.Item>
									</Col>
								)}

								<Col xs={24} md={role === PRIVILEGE_ADMIN ? 12 : 24}>
									<Form.Item
										name="foodGroup"
										label="Select a Food Type"
										rules={[
											{
												required: true,
												message: "Please select atleast one",
											},
										]}
									>
										<Select
											style={{ width: "100%" }}
											placeholder="Select Food Group"
											optionFilterProp="children"
											filterOption={(input, option) =>
												option.children
													.toLowerCase()
													.indexOf(input.toLowerCase()) >= 0
											}
										>
											{foodGroups.map((foodGroup) => (
												<Select.Option value={foodGroup._id}>
													{foodGroup.name}
												</Select.Option>
											))}
										</Select>
									</Form.Item>
								</Col>
							</Row>

							<Row style={rowStyle} gutter={24}>
								<Col xs={24} md={12}>
									<Form.Item
										name="minQuantity"
										label="Minimum quantity to checkout"
										initialValue={1}
									>
										<InputNumber min={1} style={{ width: "100%" }} />
									</Form.Item>
								</Col>
								<Col xs={24} md={12}>
									<Form.Item
										rules={[
											{
												required: true,
												message: "Please input the price of the food",
											},
										]}
										name="price"
										label="Food Price"
									>
										<InputNumber
											onChange={setPrice}
											min={0}
											style={{ width: "100%" }}
										/>
									</Form.Item>
								</Col>
							</Row>

							<Row style={rowStyle} gutter={24}>
								<Col xs={24} md={8}>
									<Form.Item name={"discountType"} label="Discount">
										<Radio.Group
											disabled={!price}
											onChange={({ target: { value } }) =>
												setHasDiscount(value)
											}
										>
											<Radio value="no">No Discount</Radio>
											<Radio value="percent">Discount Percent</Radio>
											<Radio value="amount">Discount amount</Radio>
										</Radio.Group>
									</Form.Item>
								</Col>
								<Col xs={0} md={4}></Col>
								{hasDiscount === "no" ? null : hasDiscount === "percent" ? (
									<Col xs={24} md={12}>
										<Form.Item
											name="discountPercent"
											label="Discount Percentage"
										>
											<InputNumber
												disabled={hasDiscount === "no"}
												min={0}
												max={100}
												style={{ width: "100%" }}
											/>
										</Form.Item>
									</Col>
								) : (
									<Col xs={24} md={12}>
										<Form.Item name="discountAmount" label="Discount Amount">
											<InputNumber
												disabled={hasDiscount === "no"}
												min={0}
												max={price}
												style={{ width: "100%" }}
											/>
										</Form.Item>
									</Col>
								)}
							</Row>

							<Row style={rowStyle} gutter={24}>
								<Col xs={24}>
									<Form.Item
										name="subTitle"
										label="Description"
										rules={[
											{
												required: true,
												message: "Please input the description!",
											},
										]}
									>
										<Input.TextArea autoSize={{ minRows: 4 }} />
									</Form.Item>
								</Col>
							</Row>

							<Row style={rowStyle} gutter={24}>
								<Col xs={24} md={16}>
									<Form.Item name="calorie" label="Calorie">
										<InputNumber min={0} style={{ width: "100%" }} />
									</Form.Item>
								</Col>
							</Row>
							<Row style={rowStyle} gutter={24}>
								<Col xs={24} md={24}>
									<Form.Item
										name="foodSpeciality"
										label="Food Specilities"
										rules={[]}
									>
										<Select
											mode="multiple"
											style={{ width: "100%" }}
											placeholder="Select Food Specilities"
											optionFilterProp="children"
											filterOption={(input, option) =>
												option.children
													.toLowerCase()
													.indexOf(input.toLowerCase()) >= 0
											}
										>
											{foodSpecialities.map((foodSpeciality) => (
												<Select.Option value={foodSpeciality._id}>
													{foodSpeciality.name}
												</Select.Option>
											))}
										</Select>
									</Form.Item>
								</Col>

								<Col xs={24} md={24}>
									<Form.Item name="keywords" label="Keywords">
										<Select
											dropdownRender={false}
											mode="tags"
											style={{ width: "100%" }}
										></Select>
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
									Foods ADDON
								</span>
							</Divider>
							<Row>
								<FoodAddon />
							</Row>

							<Row style={{ ...rowStyle, marginTop: 20 }}>{/* add on */}</Row>

							<Divider orientation="left">
								<span
									style={{
										display: "flex",
										fexDirection: "row",
										alignItems: "center",
									}}
								>
									Pictures Wall
									<Tooltip title={`Required Image size: ${GALLERY_IMAGE_SIZE}`}>
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
