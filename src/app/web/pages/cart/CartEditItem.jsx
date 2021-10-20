import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import {
	Button,
	Card,
	Checkbox,
	Col,
	Collapse,
	Divider,
	Form,
	Input,
	message,
	Modal,
	Radio,
	Result,
	Row,
	Typography,
} from "antd";
import { notificationError } from "app/dashboard/components/notification";
import api from "app/web/api";
import Container from "app/web/components/Container";
import { notificationSuccess } from "app/web/components/notification";
import config from "config";
import {
	ShopContext,
	UserContext,
} from "context";
import { useContext, useEffect, useRef, useState } from "react";
import Loader from "app/web/components/Loader";
import "./index.css";
import routeURL from "config/routeURL";
import { Link } from "react-router-dom";
const radioStyle = {
	display: "block",
	height: "30px",
	lineHeight: "30px",
};

export default function CartEditConfig(props) {
	const {
		cart: { fetchCart, items:carts, resetItems },
	  } = useContext(ShopContext);

	const { clientStore, clientDispatch } = useContext(UserContext);
	const isAuth = clientStore.isAuthenticated;

	const {
		match: {
			params: { itemId }, //itemid is a food id stored in the cart
		},
	} = props;
	// var formRef = useRef();
	const [form] = Form.useForm();
	// const [formRef, setFormRef] = useState(useRef());
	const [quantity, setQuantity] = useState(0);
	const [submitted, setSubmitted] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [price, setPrice] = useState();
	const [data, setData] = useState({});
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [restaurantDetail, setRestaurantDetail] = useState({});
	const [food, setFood] = useState({});
	const [spinning, setSpinning] = useState(false);
	const [removing, setRemoving] = useState(false);
	const [removed, setRemoved] = useState(false);

	useEffect(() => {
		// load the carts from the api
		setSpinning(true);

		if (data && data.restaurantId) {
			api.restaurant
				.read(data.restaurantId)
				.then(({ data }) => setRestaurantDetail(data))
				.catch((error) => {
					setError(true);
					if (error.response && error.response.data) {
						if (typeof error.response.data.message === "string")
							return notificationError(error.response.data.message);
						let errors = error.response.data;
						Object.keys(errors).map((key) => notificationError(errors[key]));
					}
				});
			api.food
				.read(data.foodId)
				.then(({ data }) => {
					setFood(data);
				})
				.catch((error) => {
					setError(true);
					if (error.response && error.response.data) {
						if (typeof error.response.data.message === "string")
							return notificationError(error.response.data.message);
						let errors = error.response.data;
						Object.keys(errors).map((key) => notificationError(errors[key]));
					}
				})
				.finally(() => setSpinning(false));
		}
	}, [data]);

	useEffect(() => {
		if (carts && Array.isArray(carts) && itemId && carts.length > itemId) {
			const food = carts[itemId];
			if (food) {
				setError(false);
				setData(food);
				if (form) {
					form.setFieldsValue({
						...food.addon,
						specialInstruction: food.specialInstruction,
					});
				}
				setTimeout(() => {
					setQuantity(food.quantity);
				}, 400);
			}
		} else {
			setError(true);
		}
	}, [carts]);

	useEffect(() => {
		if (food.price) setPrice(getPrice());
	}, [food.price, quantity]);

	const getFormItem = (addon) => {
		switch (addon.optionType) {
			case "single":
				return (
					<Radio.Group
						style={{
							width: "100%",
						}}
					>
						{addon.items.map((item) => (
							<Radio
								style={radioStyle}
								value={item._id}
								style={{
									display: "flex",
									flexDirection: "row",
									alignItems: "center",
								}}
							>
								<span
									style={{
										width: "100%",
										display: "flex",
										flexDirection: "row",
										justifyContent: "space-between",
										alignItems: "center",
									}}
								>
									<Col>{item.name}</Col>
									<Col>$ {item.extraPrice}</Col>
								</span>
							</Radio>
						))}
					</Radio.Group>
				);
			case "multiple":
				return (
					<Checkbox.Group
						style={{
							width: "100%",
						}}
					>
						{addon.items.map((item) => (
							<Checkbox
								style={radioStyle}
								value={item._id}
								style={{
									display: "flex",
									flexDirection: "row",
									alignItems: "center",
								}}
							>
								<span
									style={{
										width: "100%",
										display: "flex",
										flexDirection: "row",
										justifyContent: "space-between",
										alignItems: "center",
									}}
								>
									<Col>{item.name}</Col>
									<Col>$ {item.extraPrice}</Col>
								</span>
							</Checkbox>
						))}
					</Checkbox.Group>
				);
				break;

			default:
				break;
		}
	};

	const updatePrice = () => {
		const price = getPrice();
		setPrice(price);
	};

	const getProductPrice = () => {
		let productPrice = food.price;
		if (
			food.discountType === "percent" &&
			food.discountPercent >= 0 &&
			food.discountPercent <= 100
		) {
			productPrice = productPrice - (food.discountPercent / 100) * productPrice;
		} else if (
			food.discountType === "amount" &&
			food.discountAmount > 0 &&
			food.discountAmount <= food.price
		) {
			productPrice = productPrice - food.discountAmount;
		}
		return productPrice;
	};
	const getPrice = () => {
		let productPrice = getProductPrice();
		// add addon price
		if (food.addon && food.addon.length > 0 && form) {
			const values = form.getFieldsValue();

			for (const addon of food.addon) {
				const value = values[addon._id];
				if (value) {
					if (addon.optionType === "single") {
						const selectedItemId = value.selected;
						if (selectedItemId) {
							const selectedItem = addon.items.find(
								(item) => item._id.toString() === selectedItemId.toString()
							);
							productPrice += selectedItem.extraPrice;
						}
					} else if (addon.optionType === "multiple") {
						const selectedItemId = value.selected;
						if (selectedItemId) {
							const selectedItems = addon.items.filter((item) =>
								selectedItemId.includes(item._id.toString())
							);
							for (const selectedItem of selectedItems)
								productPrice += selectedItem.extraPrice;
						}
					}
				}
			}
		}
		return `$${productPrice.toFixed(2) * quantity}`;
	};

	const udpateCartAndFetch = (cart, idx) => {
		console.log("carts", cart, data);
		setTimeout(() => {
			setIsSubmitting(false);
			setSubmitted(true);
		}, 200);
	};
	const onUpdateCart = () => {
		if (form) {
			setIsSubmitting(true);
			const formValue = form.getFieldsValue();
			const foodTemp = {
				name: food.name,
				priceATM: getProductPrice(),
			};
			const specialInstruction = formValue.specialInstruction;
			delete formValue["specialInstruction"];
			const cart = {
				restaurantId: restaurantDetail._id,
				deliveryCharge: restaurantDetail.deliveryCharge,
				totalPrice: getPrice(),
				foodId: food._id,
				quantity,
				specialInstruction: specialInstruction,
				food: foodTemp,
				addon: formValue,
				status: "pending",
			};
			udpateCartAndFetch(cart);
		} else {
			notificationError("Please select Option to proceed");
		}
	};
	const ModalFooter = (
		<Row justify="space-between" align="middle" style={{}}>
			<Col
				style={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
				}}
			>
				<Button
					disabled={quantity <= food.minQuantity && isSubmitting}
					onClick={() => {
						if (quantity >= food.minQuantity) setQuantity(quantity - 1);
						else {
							message.warning(
								"You have to select " + food.minQuantity + " Quantity to order"
							);
						}
					}}
					shape="circle"
					icon={<MinusOutlined />}
				/>
				<Typography.Title
					level={2}
					style={{
						marginLeft: 10,
						marginRight: 10,
						marginBottom: 0,
					}}
				>
					{quantity}
				</Typography.Title>
				<Button
					disabled={isSubmitting}
					shape="circle"
					icon={<PlusOutlined />}
					onClick={() => {
						setQuantity(quantity + 1);
					}}
				/>
			</Col>
			<Col>
				<Button
					onClick={onUpdateCart}
					disabled={quantity < data.minQuantity && isSubmitting}
					style={{
						background: quantity < data.minQuantity ? "#424242" : "#000000",
						color: "#FFFFFF",
						WebkitBoxPack: "center",
						justifyContent: "center",
						minHeight: 56,
						cursor: quantity < data.minQuantity ? "not-allowed" : "#pointer",
						WebkitBoxAlign: "center",
						alignItems: "center",
						display: "flex",
						boxSizing: "border-box",
					}}
				>
					<Row
						gutter={24}
						align="middle"
						style={{
							margin: 0,
						}}
					>
						<div
							style={{
								// flex: 1,
								textAlign: "right",
								color: "#FFFFFF",
								// lineHeight: 24,
								fontSize: 16,
								paddingLeft: 40,
							}}
						>
							Update {quantity} to Order
						</div>
						<div
							style={{
								// flex: 1,
								textAlign: "right",
								color: "#FFFFFF",
								// lineHeight: 24,
								paddingLeft: 40,
								fontSize: 14,
							}}
						>
							{price}
						</div>
					</Row>
				</Button>
			</Col>
		</Row>
	);
	const removeItem = () => {
		// setRemoving(true);
		// let cartList = removeItemFromCart(itemId);
		// setCarts(cartList);
		// setTimeout(() => {
		// 	setRemoving(false);
		// 	setRemoved(true);
		// }, 1000);
	};

	return error ? (
		<Container>
			<Result
				status="404"
				title="Food Not Found"
				subTitle="Sorry, the food you added to cart does not exist."
				extra={[
					<Link to={routeURL.web.home()}>
						<Button type="primary">Back Home</Button>
					</Link>,
					!removed && (
						<Button onClick={removeItem} type="danger" loading={removing}>
							Remove Item From Cart
						</Button>
					),
				]}
			/>
		</Container>
	) : spinning ? (
		<Loader />
	) : submitted ? (
		<Result
			status="success"
			title="Successfully Updated Cart Item"
			subTitle="Please Login to Checkout your basket"
			extra={[
				<Link to={routeURL.web.home()}>
					<Button type="primary">Back Home</Button>
				</Link>,
			]}
		/>
	) : (
		<Container>
			<img
				style={{
					objectFit: "cover",
					width: "100%",
					height: 400,
				}}
				src={config.getImageHost(food.activeImage)}
				alt
			/>
			<Card>
				<Typography.Title level={5}>{food.name}</Typography.Title>
				{food.calorie > 0 && (
					<Typography.Text>{food.calorie} cal</Typography.Text>
				)}
				{food.addon && food.addon.length > 0 && (
					<Collapse
						defaultActiveKey={["1"]}
						// onChange={callback}
						expandIconPosition={"right"}
					>
						<Collapse.Panel
							key="1"
							header={
								<Typography.Text
									style={{
										fontWeight: 600,
									}}
								>
									Select Option
								</Typography.Text>
							}
						>
							<Form
								onFieldsChange={updatePrice}
								// wrapperCol={{
								// 	offset: 1,
								// }}
								// {...layout}
								// ref={formRef}
								form={form}
								layout="vertical"
								name="control-ref"
								onFinish={onUpdateCart}
								requiredMark={true}
								scrollToFirstError
							>
								{food.addon.map((addon, idx) => {
									return (
										<Row style={{ width: "100%" }}>
											{/* <Row>{addon.title}</Row> */}
											<Form.Item
												label={addon.title}
												style={{
													width: "100%",
												}}
												name={[
													addon._id,
													addon.optionType === "number"
														? "quantity"
														: "selected",
												]}
											>
												{getFormItem(addon)}
											</Form.Item>
											{idx < data.addon.length - 1 && <Divider />}
										</Row>
									);
								})}
								<Form.Item
									label={"Special Instruction (Optional)"}
									style={{
										width: "100%",
									}}
									name={"specialInstruction"}
								>
									<Input.TextArea placeholder="Special Instructions (optional)" />
								</Form.Item>
							</Form>
						</Collapse.Panel>
					</Collapse>
				)}
				{food.calorie > 0 && (
					<Typography.Paragraph>
						2,000 calories a day is used for general nutrition advice, but
						calorie needs vary. Additional nutrition information available upon
						request.
					</Typography.Paragraph>
				)}
			</Card>
			{ModalFooter}
		</Container>
	);
}
