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
import { handleError } from 'services/util';
const { Paragraph } = Typography;
const rowStyle = {
	width: "100%",
};

const imageTitle = "rider";
const photoTitle = "rider_profile_photo";
const fileTitle = "agreement_document";
const licenseTitle = "rider_license";
const bluebookTitle = "rider_bluebook";
const vehicleTitle = "rider_vehicle";
const citizenshipTitle = "rider_citizenship";
const backUrl = routeURL.cms.rider();
const pageTitle = "Rider";
const format = "HH:mm";

function idealTextColor(bgColor) {
	var nThreshold = 105;
	var components = getRGBComponents(bgColor);
	var bgDelta =
		components.R * 0.299 + components.G * 0.587 + components.B * 0.114;

	return 255 - bgDelta < nThreshold ? "#000000" : "#ffffff";
}

function getRGBComponents(color) {
	var r = color.substring(1, 3);
	var g = color.substring(3, 5);
	var b = color.substring(5, 7);

	return {
		R: parseInt(r, 16),
		G: parseInt(g, 16),
		B: parseInt(b, 16),
	};
}

const days = [
	"monday",
	"tuesday",
	"wednesday",
	"thursday",
	"friday",
	"saturday",
	"sunday",
];
const states = {
	AL: "Alabama",
	AK: "Alaska",
	AZ: "Arizona",
	AR: "Arkansas",
	CA: "California",
	CO: "Colorado",
	CT: "Connecticut",
	DE: "Delaware",
	DC: "District of Columbia",
	FL: "Florida",
	GA: "Georgia",
	HI: "Hawaii",
	ID: "Idaho",
	IL: "Illinois",
	IN: "Indiana",
	IA: "Iowa",
	KS: "Kansas",
	KY: "Kentucky",
	LA: "Louisiana",
	ME: "Maine",
	MD: "Maryland",
	MA: "Massachusetts",
	MI: "Michigan",
	MN: "Minnesota",
	MS: "Mississippi",
	MO: "Missouri",
	MT: "Montana",
	NE: "Nebraska",
	NV: "Nevada",
	NH: "New Hampshire",
	NJ: "New Jersey",
	NM: "New Mexico",
	NY: "New York",
	NC: "North Carolina",
	ND: "North Dakota",
	OH: "Ohio",
	OK: "Oklahoma",
	OR: "Oregon",
	PA: "Pennsylvania",
	RI: "Rhode Island",
	SC: "South Carolina",
	SD: "South Dakota",
	TN: "Tennessee",
	TX: "Texas",
	UT: "Utah",
	VT: "Vermont",
	VA: "Virginia",
	WA: "Washington",
	WV: "West Virginia",
	WI: "Wisconsin",
	WY: "Wyoming",
};

export default function RiderInformationAdd(props) {
	const {
		match: {
			params: { itemId },
		},
	} = props;
	const [form] = Form.useForm();
	// var formRef = useRef();
	const [spinning, setSpinning] = useState(false);
	const [location, setLocation] = useState(mapCenterDefault);
	const [fileNames, setFileNames] = useState([]);
	const [profilePhoto, setProfilePhoto] = useState([]);
	const [agreementDoc, setAgreementDoc] = useState([]);
	const [licenseDoc, setLicenseDoc] = useState([]);
	const [citizenDoc, setCitizenDoc] = useState([]);
	const [bluebookDoc, setBluebookDoc] = useState([]);
	const [vehicleImage, setVehicleImage] = useState([]);
	const [riderEmail, setRiderEmail] = useState("");
	const [openingType, setOpeningType] = useState(true);
	const [isClosedObj, setIsClosedObj] = useState({});
	const [regions, setRegions] = useState([]);
	const onLocChange = (latitude, longitude) => {
		setLocation({
			latitude,
			longitude,
		});
	};

	const onSaveForm = (value) => {
		// validate here
		console.log("value", value);

		if (true) {
			var jsonData = {
				...value,
				image: fileNames,
				agreementDoc: agreementDoc,
				activePhoto: fileNames.length > 0 ? fileNames[0] : -1,
				...location,
			};
			if (itemId) jsonData._id = itemId;
			if (citizenDoc.length > 0) {
				jsonData.citizenship.document = citizenDoc[0];
			}
			if (vehicleImage.length > 0) {
				jsonData.vehicle.photo = vehicleImage[0];
			}
			if (licenseDoc.length > 0) {
				jsonData.license.document = licenseDoc[0];
			} else {
				notificationError("Please Upload License Photo");
			}
			if (profilePhoto.length > 0) {
				jsonData.photo = profilePhoto[0];
			} else {
				notificationError("Please Upload Profile Photo");
			}
			if (bluebookDoc.length > 0) {
				jsonData.vehicle.blueBookDoc = bluebookDoc[0];
			} else {
				notificationError("Please Upload Blue book!");
			}
			setSpinning(true);
			api.rider
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
		console.log("formField -5",data);

		if (data.image) setFileNames(data.image);
		if (data.photo) setProfilePhoto([data.photo]);
		if (data.vehicle && data.vehicle.photo)
			setVehicleImage([data.vehicle.photo]);
		if (data.license && data.license.document)
			setLicenseDoc([data.license.document]);
		if (data.vehicle && data.vehicle.blueBookDoc)
			setBluebookDoc([data.vehicle.blueBookDoc]);
		if (data.citizenship && data.citizenship.document)
			setCitizenDoc([data.citizenship.document]);
		if (data.agreementDoc) setAgreementDoc(data.agreementDoc || []);
		console.log("formField -4");

		if (data.geo) setLocation(data.geo);
		// open time object
		setOpeningType(data.favorableTime.isSameTimeEveryDay);
		setIsClosedObj(() => {
			const obj = {};
			days.forEach((day) => {
				obj[day] = data.favorableTime[day].isClosed;
			});
			return obj;
		});
		console.log("formField 1");
		// open time object
		var favorableTime = data.favorableTime;
		const allDays = [...days, "everyday"];
		for (const day of allDays) {
			if (!favorableTime[day]) {
				favorableTime[day] = {};
			}
			if (favorableTime[day].startTime) {
				favorableTime[day].startTime = moment(favorableTime[day].startTime);
			}
			if (favorableTime[day].endTime) {
				favorableTime[day].endTime = moment(favorableTime[day].endTime);
			}
		}
		console.log("formField 2");

		const formField = {
			...data,
			favorableTime,
			verificationDate: moment(data.verificationDate),
			dob: moment(data.dob),
		};
		if (formField.license && formField.license.issuedDate) {
			formField.license.issuedDate = moment(formField.license.issuedDate);
		}
		if (formField.vehicle && formField.vehicle.issuedDate) {
			formField.vehicle.issuedDate = moment(formField.vehicle.issuedDate);
		}
		if (formField.citizenship && formField.citizenship.issuedDate) {
			formField.citizenship.issuedDate = moment(
				formField.citizenship.issuedDate
			);
		}
		console.log("formField 3", formField);
		form.setFieldsValue(formField);
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
						title: itemId ? "Update Rider" : "Add Rider",
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
							// ref={formRef}
							form={form}
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
											maxFile={1}
											fileNames={profilePhoto}
											title={photoTitle}
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
												<Input />
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
								<Col xs={24} lg={12}>
									<Form.Item
										name="bloodGroup"
										label="Blood Group"
										rules={[
											{
												required: true,
												message: "Please select Rider Blood Group",
											},
										]}
									>
										<Select
											style={{ width: "100%" }}
											placeholder="Select bloodgroup"
											showSearch
											optionFilterProp="children"
											filterOption={(input, option) =>
												option.children
													.toLowerCase()
													.indexOf(input.toLowerCase()) >= 0
											}
										>
											{["A+", "O+", "B+", "AB+", "A-", "O-", "B-", "AB-"].map(
												(group) => (
													<Select.Option value={group}>{group}</Select.Option>
												)
											)}
										</Select>
									</Form.Item>
								</Col>
								<Col xs={24} lg={12}>
									<Form.Item
										name="height"
										label="Height (in C.M.)"
										rules={[
											{
												required: true,
												message: "Please input Height in centimeter",
											},
										]}
									>
										<InputNumber
											style={{
												width: "100%",
											}}
											min={100}
											max={300}
										/>
									</Form.Item>
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
								<Col xs={24} md={12}>
									<Form.Item name="educationLevel" label="Education Level">
										<Select
											style={{ width: "100%" }}
											showSearch
											optionFilterProp="children"
											filterOption={(input, option) =>
												option.children
													.toLowerCase()
													.indexOf(input.toLowerCase()) >= 0
											}
										>
											{[
												"Below Secondary",
												"Secondary",
												"Higher Secondary",
												"Under Graduate",
												"Post Graduate",
											].map((value, idx) => (
												<Select.Option key={idx} value={value}>
													{value}
												</Select.Option>
											))}
										</Select>
									</Form.Item>
								</Col>
							</Row>
							<Row style={rowStyle} gutter={24}>
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
											style={{
												width: "100%",
											}}
										/>
									</Form.Item>
								</Col>
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
											onChange={({ target: { value } }) => setRiderEmail(value)}
										/>
									</Form.Item>
								</Col>
							</Row>
							<Row style={rowStyle} gutter={24}>
								<Col xs={24} lg={12}>
									<Form.Item
										name="primaryPhone"
										label={`Primary Phone Number (include country code! default: ${COUNTRY_CODE} )`}
										rules={[
											{
												required: true,
												message: "Please input phone Number",
											},
											{
												validator: (rule, telNo) => {
													if (!telNo) return Promise.resolve();
													else if (telNo.length < 5 || telNo.length > 12)
														return Promise.reject("Invalid Phone number");
													const re = /^[+]?[\s./0-9]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/g;
													if (re.test(telNo)) {
														return Promise.resolve();
													}
													return Promise.reject("Invalid Phone number");
												},
											},
										]}
									>
										<Input type="tel" />
									</Form.Item>
								</Col>
								<Col xs={24} lg={12}>
									<Form.Item
										name="secondaryPhone"
										label="Secondary Phone Number (include country code)"
										rules={[
											{
												validator: (rule, telNo) => {
													if (!telNo) return Promise.resolve();
													else if (telNo.length < 5 || telNo.length > 12)
														return Promise.reject("Invalid Phone number");
													const re = /^[+]?[\s./0-9]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/g;
													if (re.test(telNo)) {
														return Promise.resolve();
													}
													return Promise.reject("Invalid Phone number");
												},
											},
										]}
									>
										<Input type="tel" />
									</Form.Item>
								</Col>
							</Row>
							<Row style={rowStyle} gutter={24}>
								<Col xs={24} lg={12}>
									<Form.Item
										name="fatherName"
										label="Father Name"
										rules={[
											{
												required: true,
												message: "Please input Father Name of the Rider",
											},
										]}
									>
										<Input />
									</Form.Item>
								</Col>
								<Col xs={24} lg={12}>
									<Form.Item
										name="motherName"
										label="Mother Name"
										rules={[
											{
												required: true,
												message: "Please input Mother Name of the Rider",
											},
										]}
									>
										<Input />
									</Form.Item>
								</Col>
							</Row>

							<Row style={rowStyle} gutter={24}>
								<Col xs={24} lg={12}>
									<Form.Item
										name="grandFatherName"
										label="Grand Father Name"
										rules={[
											{
												required: true,
												message: "Please input Grand Father Name of the Rider",
											},
										]}
									>
										<Input />
									</Form.Item>
								</Col>
							</Row>

							<Divider orientation="left">Address</Divider>
							<Row style={rowStyle} gutter={24}>
								<Col xs={24} md={12}>
									<Form.Item
										rules={[
											{
												required: true,
												message: "Please select State",
											},
										]}
										name={["address", "state"]}
										label="State"
									>
										<Select
											style={{ width: "100%" }}
											placeholder="Select State"
											showSearch
											optionFilterProp="children"
											filterOption={(input, option) =>
												option.children
													.toLowerCase()
													.indexOf(input.toLowerCase()) >= 0
											}
										>
											{Object.keys(states).map((key) => (
												<Select.Option value={states[key]}>
													{states[key]}
												</Select.Option>
											))}
										</Select>
									</Form.Item>
								</Col>
								<Col xs={24} md={12}>
									<Form.Item
										rules={[
											{
												required: true,
												message: "Please input City",
											},
										]}
										name={["address", "city"]}
										label="City"
									>
										<Input />
									</Form.Item>
								</Col>
								<Col xs={24} md={12}>
									<Form.Item
										rules={[
											{
												required: true,
												message: "Please input Street",
											},
										]}
										name={["address", "street"]}
										label="Street"
									>
										<Input />
									</Form.Item>
								</Col>
								<Col xs={24} md={12}>
									<Form.Item
										rules={[
											{
												required: true,
												message: "Please input Zip Code",
											},
										]}
										name={["address", "zipCode"]}
										label="Zip Code"
									>
										<InputNumber
											style={{
												width: "100%",
											}}
										/>
									</Form.Item>
								</Col>
							</Row>
							<Divider />

							<Divider orientation="left">Citizenship (Optional)</Divider>
							<Row style={{ ...rowStyle, marginTop: 20 }}>
								<DragDropUpload
									style={{
										width: "100%",
									}}
									title={citizenshipTitle}
									maxFile={1}
									multiple={false}
									name={"Citizenship Photo (Both side on single photo)"}
									fileNames={citizenDoc}
									setFileNames={setLicenseDoc}
								/>
							</Row>
							<Row style={rowStyle} gutter={24}>
								<Col xs={24} md={12}>
									<Form.Item
										name={["citizenship", "citizenshipNo"]}
										label="Citizenship Number"
									>
										<Input />
									</Form.Item>
								</Col>
								<Col xs={24} md={12}>
									<Form.Item
										name={["citizenship", "issuedDate"]}
										label="Issued Date"
									>
										<DatePicker style={{ width: "100%" }} />
									</Form.Item>
								</Col>
							</Row>
							<Row style={rowStyle} gutter={24}>
								<Col xs={24}>
									<Form.Item
										name={["citizenship", "issuedPlace"]}
										label="Citizenship Issued Address"
									>
										<Input />
									</Form.Item>
								</Col>
							</Row>

							<Divider />

							<Divider orientation="left">License</Divider>
							<Row style={{ ...rowStyle, marginTop: 20 }}>
								<DragDropUpload
									style={{
										width: "100%",
									}}
									title={licenseTitle}
									maxFile={1}
									multiple={false}
									name={"License Photo (Clear Image)"}
									fileNames={licenseDoc}
									setFileNames={setLicenseDoc}
								/>
							</Row>
							<Row style={rowStyle} gutter={24}>
								<Col xs={24} md={12}>
									<Form.Item
										rules={[
											{
												required: true,
												message: "Please input License Number",
											},
										]}
										name={["license", "licenseNo"]}
										label="License Number"
									>
										<Input />
									</Form.Item>
								</Col>
								<Col xs={24} md={12}>
									<Form.Item
										rules={[
											{
												required: true,
												message: "Please input License Date",
											},
										]}
										name={["license", "issuedDate"]}
										label="Issued Date"
									>
										<DatePicker style={{ width: "100%" }} />
									</Form.Item>
								</Col>
							</Row>
							<Row style={rowStyle} gutter={24}>
								<Col xs={24}>
									<Form.Item
										rules={[
											{
												required: true,
												message: "Please input Issued Place",
											},
										]}
										name={["license", "issuedPlace"]}
										label="License Issued Address"
									>
										<Input />
									</Form.Item>
								</Col>
							</Row>

							<Divider />

							<Divider orientation="left">vehicle</Divider>
							<Row style={{ ...rowStyle, marginTop: 20 }}>
								<Col xs={24} md={8} order={2}>
									<Form.Item label="Vehicle Photo">
										<GalleryUpload
											maxFile={1}
											fileNames={vehicleImage}
											title={vehicleTitle}
											setFileNames={setVehicleImage}
										/>
									</Form.Item>
								</Col>
								<Col order={1} xs={24} md={16}>
									<Row style={rowStyle} gutter={24}>
										<Col xs={24}>
											<Form.Item
												rules={[
													{
														required: true,
														message: "Please input Vehicle Number",
													},
												]}
												name={["vehicle", "vehicleNumber"]}
												label="Vehicle Number"
											>
												<Input />
											</Form.Item>
										</Col>
										<Col xs={24}>
											<Form.Item
												rules={[
													{
														required: true,
														message: "Please input Vehicle Model",
													},
												]}
												name={["vehicle", "model"]}
												label="Model Number"
											>
												<Input />
											</Form.Item>
										</Col>
										<Col xs={24}>
											<Form.Item
												rules={[
													{
														required: true,
														message: "Please Select Bike Color",
													},
												]}
												name={["vehicle", "color"]}
												label="Bike Color"
											>
												<Input />
											</Form.Item>
										</Col>
									</Row>
								</Col>
							</Row>

							<Row style={{ ...rowStyle, marginTop: 20 }}>
								<DragDropUpload
									style={{
										width: "100%",
									}}
									title={bluebookTitle}
									maxFile={1}
									multiple={false}
									name={"Blue Book Photo (Clear Image)"}
									fileNames={bluebookDoc}
									setFileNames={setBluebookDoc}
								/>
							</Row>

							<Row style={rowStyle} gutter={24}>
								<Col xs={24} md={12}>
									<Form.Item
										rules={[
											{
												required: true,
												message: "Please input Bluebook Number",
											},
										]}
										name={["vehicle", "blueBookNo"]}
										label="Bluebook Number"
									>
										<Input />
									</Form.Item>
								</Col>
								<Col xs={24} md={12}>
									<Form.Item
										rules={[
											{
												required: true,
												message: "Please input Bluebook Issued Date",
											},
										]}
										name={["vehicle", "issuedDate"]}
										label="Bluebook Issued Date"
									>
										<DatePicker style={{ width: "100%" }} />
									</Form.Item>
								</Col>
							</Row>
							<Row style={rowStyle} gutter={24}>
								<Col xs={24}>
									<Form.Item
										rules={[
											{
												required: true,
												message: "Please input Bluebook Issued Place",
											},
										]}
										name={["vehicle", "issuedPlace"]}
										label="Vehicle Issued Address"
									>
										<Input />
									</Form.Item>
								</Col>
							</Row>

							<Divider />

							<Divider>Location</Divider>
							<Row style={{ ...rowStyle, marginTop: 20, height: 300 }}>
								<MapViewer
									activeMarker={{
										...location,
										name: form && form.getFieldValue("name"),
									}}
									markerAppendable
									height={400}
									onMapClick={onLocChange}
									options={{
										zoom: 7,
										disableDefaultUI: true,
									}}
								/>
							</Row>

							<Divider>Active Hours</Divider>
							<Row style={rowStyle} gutter={24}>
								<Col xs={24} lg={8}>
									<Form.Item
										name={["favorableTime", "isSameTimeEveryDay"]}
										label="Opening Type"
										initialValue={openingType}
									>
										<Radio.Group
											onChange={({ target: { value } }) =>
												setOpeningType(value)
											}
										>
											<Radio value={true}>Same Time Every Day</Radio>
											<Radio value={false}>Different Time Every Day</Radio>
										</Radio.Group>
									</Form.Item>
								</Col>
								<Col xs={24} lg={8}>
									<Form.Item
										name={["favorableTime", "everyday", "startTime"]}
										label="Open Time"
									>
										<TimePicker disabled={!openingType} format={format} />
									</Form.Item>
								</Col>
								<Col xs={24} lg={8}>
									<Form.Item
										name={["favorableTime", "everyday", "endTime"]}
										label="Close Time"
									>
										<TimePicker disabled={!openingType} format={format} />
									</Form.Item>
								</Col>
							</Row>
							{!openingType && (
								<>
									{days.map((day) => (
										<Row key={day} style={rowStyle} gutter={24}>
											<Col xs={24} lg={8}>
												<Form.Item
													name={["favorableTime", day, "isClosed"]}
													label={((string) =>
														string.charAt(0).toUpperCase() + string.slice(1))(
														day
													)}
													initialValue={false}
												>
													<Radio.Group
														onChange={({ target: { value } }) =>
															setIsClosedObj({
																...isClosedObj,
																[day]: value,
															})
														}
													>
														<Radio value={false}>Open</Radio>
														<Radio value={true}>Closed</Radio>
													</Radio.Group>
												</Form.Item>
											</Col>
											<Col xs={24} lg={8}>
												<Form.Item
													name={["favorableTime", day, "startTime"]}
													label="Open Time"
												>
													<TimePicker
														format={format}
														disabled={isClosedObj[day]}
													/>
												</Form.Item>
											</Col>
											<Col xs={24} lg={8}>
												<Form.Item
													name={["favorableTime", day, "endTime"]}
													label="Close Time"
												>
													<TimePicker
														format={format}
														disabled={isClosedObj[day]}
													/>
												</Form.Item>
											</Col>
										</Row>
									))}
								</>
							)}
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

							{!itemId && (
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
