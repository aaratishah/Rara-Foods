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

const title = "Food";
const slug = "food";
const role = JwtService.getUserRole();
export default function Restaurant() {
	const [restaurants, setRestaurants] = useState([]);

	useEffect(() => {
		api.restaurant.readAll().then((res) => setRestaurants(res.data));
	}, []);

	const columns = [
		{
			hideColumn: role !== PRIVILEGE_ADMIN,
			title: "Restaurant",
			dataIndex: "restaurant",
			key: "restaurant",
			ellipsis: true,
			render: (columnData) => {
				const restaurantName = restaurants.find(
					(each) => each._id === columnData
				);
				if (restaurantName)
					return (
						<div
							style={{
								whiteSpace: "pre-line",
							}}
						>
							{restaurantName.name}
						</div>
					);
			},
		},
		{
			title: "Name",
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
			title: "Price",
			dataIndex: "price",
			key: "price",
			sorter: (a, b) => a.price.localeCompare(b.price),
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
			title: "Calorie",
			dataIndex: "calorie",
			key: "calorie",
			sorter: (a, b) => a.calorie.localeCompare(b.calorie),
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
