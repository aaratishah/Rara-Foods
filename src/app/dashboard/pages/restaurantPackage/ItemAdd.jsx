import {
	Button,
	Col,
	DatePicker,
	Divider,
	Form,
	Input,
	message,
	Row,
	Select,
	Switch,
} from "antd";
import api from "app/dashboard/api";
import AddPageLayout from "app/dashboard/components/ListTable/AddPageLayout";
import { notificationError } from "app/dashboard/components/notification";
import routeURL from "config/routeURL";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { handleError } from "services/util";
const rowStyle = {
	width: "100%",
};

const backUrl = routeURL.cms.restaurant_package();
const pageTitle = "Restaurant Package";

export default function ItemAdd(props) {
	const {
		match: {
			params: { itemId },
		},
	} = props;
	var formRef = useRef();
	const [spinning, setSpinning] = useState(false);
	const [hasDeadline, setHasDeadline] = useState(false);
	const [restaurantList, setRestaurantList] = useState([]);
	useEffect(() => {
		setSpinning(true);
		api.restaurant
			.readAll()
			.then(({ data }) => setRestaurantList(data))
			.catch(handleError)
			.finally(() => setSpinning(false));
	}, []);
	const onSaveForm = (value) => {
		// validate here
		if (true) {
			var jsonData = {
				...value,
			};
			if (itemId) jsonData._id = itemId;
			setSpinning(true);
			api.restaurant_package
				.save(jsonData)
				.then((data) => {
					message.info(data.message);
					props.history.push(backUrl);
				})
				.catch(handleError)
				.finally(() => setSpinning(false));
		}
	};

	const fillForm = (data) => {
		setHasDeadline(!!data.expiredAt);
		formRef.current.setFieldsValue({
			activeStatus: data.activeStatus,
			name: data.name,
			extra: data.extra,
			expiredAt: moment(data.expiredAt),
			hasDeadline: !!data.expiredAt,
			restaurants: data.restaurants,
		});
	};

	useEffect(() => {
		if (itemId) {
			setSpinning(true);
			api.restaurant_package
				.read(itemId)
				.then(({ data }) => fillForm(data))
				.catch(handleError)
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
										label="Food Package Title (Say Popular on Rara)"
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

							<Row style={rowStyle} gutter={24}>
								<Col xs={24} md={8}>
									<Form.Item name="hasDeadline" label="Does Package Expired?">
										<Switch
											checked={hasDeadline}
											onChange={(status) => setHasDeadline(status)}
										/>
									</Form.Item>
								</Col>
								<Col xs={24} md={16}>
									<Form.Item name="expiredAt" label="Package Expiration Date">
										<DatePicker
											showToday={false}
											renderExtraFooter={null}
											disabledDate={(current) => {
												// Can not select days before today and today
												return current && current < moment().endOf("day");
											}}
											disabled={!hasDeadline}
											style={{ width: "100%" }}
											placeholder="Select Expired Date"
										/>
									</Form.Item>
								</Col>
							</Row>

							<Row style={rowStyle} gutter={24}>
								<Col xs={24}>
									<Form.Item
										name="restaurants"
										label="Restaurants"
										rules={[
											{
												required: true,
												message: "Please select restaurants",
											},
										]}
									>
										<Select
											mode="multiple"
											showSearch
											style={{ width: "100%" }}
											placeholder="Select restaurants"
											optionFilterProp="children"
											filterOption={(input, option) =>
												option.children
													.toLowerCase()
													.indexOf(input.toLowerCase()) >= 0
											}
										>
											{restaurantList.map((restaurant) => (
												<Select.Option value={restaurant._id}>
													{restaurant.name}
												</Select.Option>
											))}
										</Select>
									</Form.Item>
								</Col>
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
