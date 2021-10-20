import {
	ArrowLeftOutlined,
	DownloadOutlined,
	ExclamationCircleOutlined,
	FileExcelOutlined,
	PlusOutlined,
	RightCircleOutlined,
} from "@ant-design/icons";
import {
	Breadcrumb,
	Col,
	Input,
	message,
	Row,
	Typography,
	Modal,
	Tooltip,
	Button,
} from "antd";
import OwnButton from "app/dashboard/components/Button";
import { useState } from "react";
import { CSVLink } from "react-csv";
import { Link } from "react-router-dom";
import "./index.css";
import moment from "moment";
const { Title } = Typography;
const { confirm } = Modal;
const rowStyle = {
	width: "100%",
};
const breadCrumbStyle = {
	color: "#9e9e9e",
	fontSize: 12,
};

export default function PageLayout({
	deleteRows = {},
	title,
	breadCrumb,
	addButton,
	children,
	onSearch,
	onReset,
	showActions = true,
	backUrl = false,
	getJSONData,
}) {
	const { selectedKeys, onDeleteRows } = deleteRows;
	const showDeleteConfirm = () => {
		confirm({
			title: `Are you sure delete selected ${
				selectedKeys.length == 1 ? " row" : " rows"
			} ?`,
			icon: <ExclamationCircleOutlined />,
			content: `Confirming will delete ${selectedKeys.length}${
				selectedKeys.length == 1 ? " row" : " rows"
			}`,
			okText: "Yes",
			okType: "danger",
			cancelText: "No",
			onOk() {
				return new Promise((resolve, reject) =>
					resolve(onDeleteRows(selectedKeys))
				).catch(() => console.log("Oops errors!"));
			},
		});
	};
	const [searchText, setSearchText] = useState("");
	return (
		<Row style={rowStyle}>
			<Row style={rowStyle} align="middle">
				{backUrl && (
					<Link to={backUrl}>
						<ArrowLeftOutlined
							style={{
								marginRight: 16,
								fontSize: 22,
								cursor: "pointer",
								color: "unset",
							}}
						/>
					</Link>
				)}
				<Title
					level={3}
					style={{
						marginBottom: 0,
						letterSpacing: 1,
					}}
				>
					{title}
				</Title>
			</Row>

			{breadCrumb && (
				<Row style={rowStyle}>
					<Breadcrumb separator=">">
						{breadCrumb.map((each) => {
							return (
								<Breadcrumb.Item key={each.title}>
									{each.url ? (
										<Link to={each.url} style={breadCrumbStyle}>
											{each.title}
										</Link>
									) : (
										<span style={breadCrumbStyle}>{each.title}</span>
									)}
								</Breadcrumb.Item>
							);
						})}
					</Breadcrumb>
				</Row>
			)}

			{showActions && (
				<Row style={{ ...rowStyle, marginTop: 40 }} justify="space-between">
					{addButton && (
						<Col>
							<Link to={addButton.url}>
								<OwnButton icon={<PlusOutlined />}>{addButton.title}</OwnButton>
							</Link>
						</Col>
					)}
					<Col>
						<Row gutter={16}>
							<Col>
								<Input.Search
									onSearch={onSearch}
									style={{
										width: 200,
										fontSize: 13,
										height: 37,
										borderRadius: 5,
									}}
									value={searchText}
									placeholder="Search..."
									onChange={({ target: { value } }) => setSearchText(value)}
								/>
							</Col>
							<Col>
								<OwnButton
									noElevation
									type="default"
									onClick={() => {
										onReset();
										setSearchText("");
									}}
								>
									Reset
								</OwnButton>
							</Col>
							<Col>
								<OwnButton
									onClick={showDeleteConfirm}
									noElevation
									type="default"
									disabled={selectedKeys.length < 1}
									danger
								>
									Delete selected Rows
								</OwnButton>
							</Col>
							<Col>
								<CSVLink
									data={typeof getJSONData === 'function' ? getJSONData() : []}
									filename={`${title}_${moment().format(
										"MMMM_Do_YYYY,__h:mm:ss_a"
									)}_export.csv`}
								>
									<Tooltip title="Export as CSV" placement="topLeft">
										<FileExcelOutlined
											style={{
												color: "#4caf50",
												cursor: "pointer",
												fontSize: 18,
											}}
											color="#4caf50"
										/>
									</Tooltip>
								</CSVLink>
							</Col>
						</Row>
					</Col>
				</Row>
			)}

			{children}
		</Row>
	);
}
