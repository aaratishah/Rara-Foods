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
const role = JwtService.getUserRole();
export default function FoodGroupRestaurant() {
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
			title: "Food Group",
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
	return (
		<Row style={{ ...rowStyle, padding: "24px 40px" }}>
			<ListTable
				title="Food Group"
				breadCrumb={[
					{
						title: "Home",
						url: routeURL.cms.home(),
					},
					{
						title: "Food Group",
						url: false,
					},
				]}
				addButton={{
					title: "Add Food Group",
					url: routeURL.cms.food_group_restaurant_add(),
				}}
				edit={{
					url: routeURL.cms.food_group_restaurant_edit,
				}}
				columnData={columns}
				apiURL={{
					get: api.food_group_restaurant.readAll,
					delete: api.food_group_restaurant.delete,
					deleteMany: api.food_group_restaurant.deleteMany,
					toggle: api.food_group_restaurant.toggle,
				}}
			></ListTable>
		</Row>
	);
}
