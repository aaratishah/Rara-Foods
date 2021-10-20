import { Row } from "antd";
import api from "app/dashboard/api";
import ListTable from "app/dashboard/components/ListTable";
import routeURL from "config/routeURL";
import { useEffect, useState } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import moment from "moment";
import { JwtService } from "services";
import { PRIVILEGE_ADMIN } from "config";
const rowStyle = {
	width: "100%",
};
const title = "Dietary Plan";
const slug = "dietary_plan";
const columns = [
	{
		title: "Plan Name",
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
export default function DietaryPlan() {
	return (
		<Row style={{ ...rowStyle, padding: "24px 40px" }}>
			<ListTable
				title={title}
				breadCrumb={[
					{
						title: "Home",
						url: routeURL.cms.home(),
					},
					{
						title: title,
						url: false,
					},
				]}
				addButton={{
					title: `Add ${title}`,
					url: routeURL.cms[`${slug}_add`](),
				}}
				edit={{
					url: routeURL.cms[`${slug}_edit`],
				}}
				columnData={columns}
				apiURL={{
					get: api[slug].readAll,
					delete: api[slug].delete,
					deleteMany: api[slug].deleteMany,
					toggle: api[slug].toggle,
				}}
			></ListTable>
		</Row>
	);
}
