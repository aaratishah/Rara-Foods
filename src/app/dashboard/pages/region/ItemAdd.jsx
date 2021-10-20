import {
	Button,
	Col,
	Divider,
	Form,
	Input,

	message,
	Row
} from "antd";
import api from "app/dashboard/api";
import AddPageLayout from "app/dashboard/components/ListTable/AddPageLayout";
import routeURL from "config/routeURL";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
const rowStyle = {
	width: "100%",
};

const backUrl = routeURL.cms.region();
const pageTitle = "Region";
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
	const [regionCode, setVendorId] = useState("");
	const [isRegionCodeUnique, setIsUniqueCode] = useState(null);

	
	const onSaveForm = (value) => {
		// validate here
		if (true) {
			var jsonData = {
				...value,
			};
			if (itemId) jsonData._id = itemId;
			setSpinning(true);
			api.region
				.save(jsonData)
				.then((data) => {
					message.info(data.message);
					props.history.push(backUrl);
				})
				.catch((err) => {
					console.log("error", err);
					// return console.log("error message", err.response.data);
					// if (err.response.data) message.error(err.response.data.message);
				})
				.finally(() => setSpinning(false));
		}
	};

	const fillForm = (data) => {
		if (data.regionCode) setVendorId(data.regionCode);
		validateUniqueCode(data.regionCode);
		formRef.current.setFieldsValue({
			regionCode: data.regionCode,
			activeStatus: data.activeStatus,
			name: data.name,
		});
	};

	useEffect(() => {
		if (itemId) {
			setSpinning(true);
			api.region
				.read(itemId)
				.then(({ data }) => fillForm(data))
				.catch((err) => {
					if (err.response.data) message.error(err.response.data.message);
				})
				.finally(() => setSpinning(false));
		}
	}, [itemId]);

	const [idValidating, setIdValidating] = useState(false);
	const validateUniqueCode = (value) => {
		if (!value) return setIsUniqueCode(null);
		setIdValidating(true);
		setVendorId(value);
		api.region
			.isUnique("regionCode", value, itemId)
			.then(({ unique }) => setIsUniqueCode(unique))
			.finally(() => setIdValidating(false));
	};

	

	return (
		<Row style={{ ...rowStyle, padding: "24px 40px" }}>
			<AddPageLayout
				title={
					itemId ? `Update ${pageTitle}` : `Add ${pageTitle}`
				}
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
								<Col xs={24} lg={12}>
									<Form.Item
										name="regionCode"
										label="Region Code"
										rules={[
											{
												required: true,
												message: "Please input the Region Id!",
											},
										]}
										hasFeedback
										validateStatus={
											idValidating
												? "validating"
												: itemId || isRegionCodeUnique === true
												? "success"
												: "error"
										}
										help={
											!itemId && !isRegionCodeUnique && "Region Id must be unique"
										}
									>
										<Input
											disabled={!!itemId}
											value={regionCode}
											onChange={({ target: { value } }) =>
												validateUniqueCode(value)
											}
											required
										/>
									</Form.Item>
								</Col>
								<Col xs={24} lg={12}>
									<Form.Item
										name="name"
										label="Region Name"
										rules={[
											{
												required: true,
												message: "Please input the region name!",
											},
										]}
									>
										<Input />
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
