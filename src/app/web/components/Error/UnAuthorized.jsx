import { useContext } from "react";
import { Result, Button } from "antd";
import Container from "app/web/components/Container";
import routeURL from "config/routeURL";
import { Link, useHistory } from "react-router-dom";
import { UserLoginContext } from "context/";

export default function UnAuthorized() {
	const [isVisible, setVisible, tab, setTab] = useContext(UserLoginContext);
	const history = useHistory();

	return (
		<>
			<div
				style={{
					padding: "70px 0px",
				}}
				className="content-wrap wrapper-content bg-gray-04 pb-0"
			>
				<section
					style={{
						paddingTop: "5rem",
					}}
					id="section-03"
				>
					<Container>
						<Result
							status="500"
							title="Un-Authorized access"
							subTitle="Please Login to continue"
							extra={[
								<Link key="home" to={routeURL.web.home()}>
									<Button type="primary">Back Home</Button>
								</Link>,
								<Button
									key="login"
									onClick={() => history.push(routeURL.web.client_login())}
								>
									Login
								</Button>,
							]}
						/>
					</Container>
				</section>
			</div>
		</>
	);
}
