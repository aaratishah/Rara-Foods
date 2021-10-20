import { Row, message } from "antd";
import { useEffect, useState } from "react";
import MyAccountContent from "./MyAccountContent";
import api from "app/dashboard/api";
import { JwtService } from "services";
import { PRIVILEGE_RESTAURANT, PRIVILEGE_ADMIN } from "config";

export default function MyAccountPage() {
	const [userId, setUserId] = useState("");

	useEffect(() => {
		api.auth[JwtService.isRestaurant() ? PRIVILEGE_RESTAURANT : PRIVILEGE_ADMIN]
			.currentUser()
			.then((data) => setUserId(data._id))
			.catch((err) => {
				console.log("error", err);
				if (err.response.data) message.error(err.response.data.message);
			});
	}, [userId]);
	return (
		<Row style={{ width: "100%", padding: "24px 40px" }}>
			<MyAccountContent userId={userId} />
		</Row>
	);
}
