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
		title: "Food Category",
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
		title: "Description",
		dataIndex: "extra",
		key: "extra",
		sorter: (a, b) => a.extra.localeCompare(b.extra),
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
				title="Food Category"
				breadCrumb={[
					{
						title: "Home",
						url: routeURL.cms.home(),
					},
					{
						title: "Food Category",
						url: false,
					},
				]}
				addButton={{
					title: "Add Food Category",
					url: routeURL.cms.food_category_add(),
				}}
				edit={{
					url: routeURL.cms.food_category_edit,
				}}
				columnData={columns}
				apiURL={{
					get: api.food_category.readAll,
					delete: api.food_category.delete,
					deleteMany: api.food_category.deleteMany,
					toggle: api.food_category.toggle,
				}}
			></ListTable>
		</Row>
	);
}
