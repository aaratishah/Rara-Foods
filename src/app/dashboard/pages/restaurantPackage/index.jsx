import { Row } from "antd";
import api from "app/dashboard/api";
import ListTable from "app/dashboard/components/ListTable";
import routeURL from "config/routeURL";
import moment from "moment";
import { JwtService } from "services";
import "./index.css";
const rowStyle = {
	width: "100%",
};
const role = JwtService.getUserRole();
export default function RestaurantPackage() {
	// const [restaurants, setRestaurants] = useState([]);

	// useEffect(() => {
	// 	api.restaurant.readAll().then((res) => setRestaurants(res.data));
	// }, []);

	const columns = [
		{
			title: "Total Count",
			dataIndex: "restaurants",
			key: "restaurants",
			ellipsis: true,
			render: (columnData) => (
				<div
					style={{
						whiteSpace: "pre-line",
					}}
				>
					{columnData.length}
				</div>
			),
		},
		{
			title: "Package Name",
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
		{
			title: "Expired At",
			dataIndex: "expiredAt",
			key: "expiredAt",
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
			sorter: (a, b) => moment(a.expiredAt).unix() - moment(b.expiredAt).unix(),
		},
	];
	return (
		<Row style={{ ...rowStyle, padding: "24px 40px" }}>
			<ListTable
	title="Restaurant Package"
	breadCrumb={[
		{
			title: 'Home',
			url: routeURL.cms.home(),
		},
		{
			title: 'Restaurant Package',
			url: false,
		},
	]}
	addButton={{
		title: 'Add Restaurant Package',
		url: routeURL.cms.restaurant_package_add(),
	}}
	edit={{
		url: routeURL.cms.restaurant_package_edit,
	}}
	columnData={columns}
	apiURL={{
		get: api.restaurant_package.readAll,
		delete: api.restaurant_package.delete,
		deleteMany: api.restaurant_package.deleteMany,
		toggle: api.restaurant_package.toggle,
	}}
	/>
		</Row>
	);
}
