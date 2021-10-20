import { Row } from "antd";
import api from "app/dashboard/api";
import ListTable from "app/dashboard/components/ListTable";
import routeURL from "config/routeURL";
import "./index.css";
import { Link } from "react-router-dom";
import moment from "moment";
const rowStyle = {
	width: "100%",
};

const columns = [
	{
		title: "Region Code",
		dataIndex: "regionCode",
		key: "regionCode",
		sorter: (a, b) => a.regionCode.localeCompare(b.regionCode),
		sortDirections: ["descend", "ascend"],
		ellipsis: true,
	},
	{
		title: "Region Name",
		dataIndex: "name",
		key: "name",
		sorter: (a, b) => a.name.localeCompare(b.name),
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

export default function Region() {
	return (
		<Row style={{ ...rowStyle, padding: "24px 40px" }}>
			<ListTable
				title="Region"
				breadCrumb={[
					{
						title: "Home",
						url: routeURL.cms.home(),
					},
					{
						title: "Region",
						url: false,
					},
				]}
				addButton={{
					title: "Add Region",
					url: routeURL.cms.region_add(),
				}}
				edit={{
					url: routeURL.cms.region_edit,
				}}
				columnData={columns}
				apiURL={{
					get: api.region.readAll,
					delete: api.region.delete,
					deleteMany: api.region.deleteMany,
					toggle: api.region.toggle,
				}}
			></ListTable>
		</Row>
	);
}
