import { DownloadOutlined } from "@ant-design/icons";
import { Row, Tooltip } from "antd";
import api from "app/dashboard/api";
import ListTable from "app/dashboard/components/ListTable";
import routeURL from "config/routeURL";
import jsFileDownloader from "js-file-downloader";
import moment from "moment";
import { JwtService } from "services";
import config from "config";
import "./index.css";
const rowStyle = {
	width: "100%",
};
const role = JwtService.getUserRole();
export default function Riders() {
	const columns = [
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
			sortDirections: ["descend", "ascend"],
			sorter: (a, b) => a.name.localeCompare(b.name),
			ellipsis: true,
			render: (columnData) => (
				<div
					style={{
						whiteSpace: "pre-line",
					}}
				>
					{columnData}
				</div>
			),
		},
		{
			title: "Age",
			dataIndex: "dob",
			key: "dob",
			// sorter: (a, b) => a.age.localeCompare(b.name),
			// sortDirections: ["descend", "ascend"],
			ellipsis: true,
			render: (columnData) => (
				<div
					style={{
						whiteSpace: "pre-line",
					}}
				>
					{moment().diff(columnData, "years")}
				</div>
			),
		},
		{
			title: "License",
			dataIndex: "license",
			key: "license",
			sorter: (a, b) => a.license.licenseNo.localeCompare(b.license.licenseNo),
			sortDirections: ["descend", "ascend"],
			ellipsis: true,
			render: (columnData) => (
				<div
					style={{
						whiteSpace: "pre-line",
					}}
				>
					{columnData && columnData.licenseNo}
					<Tooltip title="Download License Copy">
						<DownloadOutlined
							style={{
								marginLeft: 8,
							}}
							onClick={() => {
								new jsFileDownloader({
									url: `${config.API_HOST}/api/imageUpload/image/${columnData.document}`,
									// headers: [
									// 	{
									// 		name: "Authorization",
									// 		value: "Bearer " + JwtService.getAccessToken(),
									// 	},
									// ],
									filename: columnData.document,
								})
									.then(function () {
										console.log("downloaded");
									})
									.catch((err) => console.log("error on file download", err));
							}}
						></DownloadOutlined>
					</Tooltip>
				</div>
			),
		},
		{
			title: "Phone",
			dataIndex: "primaryPhone",
			key: "primaryPhone",
			sorter: (a, b) => a.primaryPhone.localeCompare(b.primaryPhone),
			sortDirections: ["descend", "ascend"],
			ellipsis: true,
			render: (columnData) => (
				<div
					style={{
						whiteSpace: "pre-line",
					}}
				>
					{columnData}
				</div>
			),
		},
		{
			title: "Address",
			dataIndex: "address",
			key: "address",
			sorter: (a, b) => a.address.localeCompare(b.address),
			sortDirections: ["descend", "ascend"],
			ellipsis: true,
			render: (address) => (
				<div
					style={{
						whiteSpace: "pre-line",
					}}
				>
					{address && address.street}
				</div>
			),
		},
		{
			title: "Bike Number",
			dataIndex: "vehicle",
			key: "vehicle",
			sorter: (a, b) =>
				a.vehicle.vehicleNumber.localeCompare(b.vehicle.vehicleNumber),
			sortDirections: ["descend", "ascend"],
			ellipsis: true,
			render: (columnData) => (
				<div
					style={{
						whiteSpace: "pre-line",
					}}
				>
					{columnData.vehicleNumber}
				</div>
			),
		},
		{
			title: "Created At",
			dataIndex: "createdDateTime",
			key: "createdDateTime",
			render: (data) => (
				<div
					style={{
						whiteSpace: "pre-line",
					}}
				>
					{moment(data).fromNow()}
				</div>
			),
			sortDirections: ["ascend", "descend"],
			sorter: (a, b) =>
				moment(a.createdDateTime).unix() - moment(b.createdDateTime).unix(),
		},
	];
	return (
		<Row style={{ ...rowStyle, padding: "24px 40px" }}>
			<ListTable
				title="Riders"
				breadCrumb={[
					{
						title: "Home",
						url: routeURL.cms.home(),
					},
					{
						title: "Riders",
						url: false,
					},
				]}
				addButton={{
					title: "Add Riders",
					url: routeURL.cms.rider_add(),
				}}
				edit={{
					url: routeURL.cms.rider_edit,
				}}
				columnData={columns}
				apiURL={{
					get: api.rider.readAcceptedAll,
					delete: api.rider.delete,
					deleteMany: api.rider.deleteMany,
					toggle: api.rider.toggle,
				}}
			></ListTable>
		</Row>
	);
}
