import { Tabs } from "antd";
import Riders from "./Riders";
import Request from "./RiderRequest";

const { TabPane } = Tabs;

export default function RiderPage() {
	return (
		<Tabs defaultActiveKey="1" centered size="large">
			<TabPane tab="Riders" key="1">
				<Riders />
			</TabPane>
			<TabPane tab="Requests" key="2">
				<Request />
			</TabPane>
		</Tabs>
	);
}
