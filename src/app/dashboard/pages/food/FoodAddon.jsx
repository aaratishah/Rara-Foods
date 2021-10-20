import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
	Button,
	Col,
	Divider,
	Form,
	Input,
	InputNumber,
	Row,
	Select,
	Space,
	Switch,
} from "antd";
const rowStyle = { width: "100%" };

const selectionTypes = ["single", "multiple", "number"];
export default function FoodAddon() {
	return (
		<Form.List name="addon">
			{(fields, { add, remove }) => (
				<>
					{fields.map((field) => {
						return (
							<>
								<Row
									key={field.key}
									style={{
										...rowStyle,
										padding: 10,
										borderRadius: 5,
										backgroundColor: "#e3f2fd",
									}}
								>
									<Row
										style={{
											...rowStyle,
										}}
										gutter={24}
									>
										<Col xs={24}>
											<Form.Item
												{...field}
												label="Addon Title"
												name={[field.name, "title"]}
												fieldKey={[field.fieldKey, "title"]}
												rules={[{ required: true, message: "Missing Title" }]}
											>
												<Input placeholder="Addon Title" />
											</Form.Item>
										</Col>
										<Col xs={22} md={13}>
											<Form.Item
												{...field}
												label="Addon Selection"
												name={[field.name, "optionType"]}
												fieldKey={[field.fieldKey, "optionType"]}
												rules={[
													{
														required: true,
														message: "Missing selection type",
													},
												]}
											>
												<Select
													style={{ width: "100%" }}
													placeholder="Select Food Category"
												>
													{selectionTypes.map((selection) => (
														<Select.Option value={selection}>
															{selection}
														</Select.Option>
													))}
												</Select>
											</Form.Item>
										</Col>
										<Col xs={22} md={8}>
											<Form.Item
												{...field}
												initialValue={false}
												label="Is Required?"
												name={[field.name, "isRequired"]}
												fieldKey={[field.fieldKey, "isRequired"]}
											>
												<Switch />
											</Form.Item>
										</Col>
										<Col xs={1}>
											<Form.Item {...field} label=" ">
												<MinusCircleOutlined
													style={{
														color: "red",
													}}
													onClick={() => remove(field.name)}
												/>
											</Form.Item>
										</Col>
									</Row>
									<Row style={rowStyle}>
										{/* Item start */}
										<Form.List name={[field.name, "items"]}>
											{(items, { add, remove }) => (
												<>
													{items.map((item) => {
														return (
															<>
																<Row
																	key={item.key}
																	style={{
																		...rowStyle,
																		padding: 10,
																		borderRadius: 5,
																		backgroundColor: "#f0f4c3",
																	}}
																>
																	<Row
																		style={{
																			...rowStyle,
																		}}
																		gutter={12}
																	>
																		<Col xs={24} md={11}>
																			<Form.Item
																				{...field}
																				label="Item Title"
																				name={[item.name, "name"]}
																				name={[item.name, "name"]}
																				rules={[
																					{
																						required: true,
																						message: "Missing Item Name",
																					},
																				]}
																			>
																				<Input placeholder="Item Title" />
																			</Form.Item>
																		</Col>
																		<Col xs={22} md={11}>
																			<Form.Item
																				{...field}
																				label="Item Price"
																				initialValue={0}
																				name={[item.name, "extraPrice"]}
																				name={[item.name, "extraPrice"]}
																				rules={[
																					{
																						required: true,
																						message: "Missing Item Price",
																					},
																				]}
																			>
																				<Input placeholder="Item Price (0 For Free)" />
																			</Form.Item>
																		</Col>
																	</Row>
																	<Row style={rowStyle} gutter={24}>
																		<Col xs={24} md={11}>
																			<Form.Item
																				{...field}
																				initialValue={false}
																				label="Item default Checked (selection: single/multiple)"
																				name={[item.name, "isCheckDefault"]}
																				name={[item.name, "isCheckDefault"]}
																			>
																				<Switch />
																			</Form.Item>
																		</Col>
																		<Col xs={22} md={11}>
																			<Form.Item
																				{...field}
																				label="Minimm quantity (Selection: number)"
																				initialValue={0}
																				name={[item.name, "quantity"]}
																				name={[item.name, "quantity"]}
																				rules={[
																					{
																						required: true,
																						message:
																							"Missing minimum  Quantity",
																					},
																				]}
																			>
																				<InputNumber
																					style={{
																						width: "100%",
																					}}
																					placeholder="Minimum Quantity"
																					min={1}
																				/>
																			</Form.Item>
																		</Col>
																	</Row>
																	<Row style={rowStyle} gutter={24}>
																		<Col xs={24} md={20}>
																			<Form.Item
																				{...field}
																				label="Item Description"
																				name={[item.name, "extra"]}
																				name={[item.name, "extra"]}
																			>
																				<Input placeholder="Item Description" />
																			</Form.Item>
																		</Col>
																		<Col xs={1}>
																			<Form.Item {...field} label=" ">
																				<MinusCircleOutlined
																					style={{
																						color: "red",
																					}}
																					onClick={() => remove(field.name)}
																				/>
																			</Form.Item>
																		</Col>
																	</Row>
																</Row>
																<Divider />
															</>
														);
													})}
													<Row>
														<Form.Item>
															<Button
																type="dashed"
																onClick={() => add()}
																block
																icon={<PlusOutlined />}
															>
																Add Item
															</Button>
														</Form.Item>
													</Row>
												</>
											)}
										</Form.List>
										{/* Item Close */}
									</Row>
								</Row>
								<Divider />
							</>
						);
					})}
					<Row>
						<Form.Item>
							<Button
								type="dashed"
								onClick={() => add()}
								block
								icon={<PlusOutlined />}
							>
								Add Addon
							</Button>
						</Form.Item>
					</Row>
				</>
			)}
		</Form.List>
	);
}
