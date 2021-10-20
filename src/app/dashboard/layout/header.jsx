import { Layout } from "antd";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext, LOGOUT_USER } from "context";
import { Profile } from "app/dashboard/components";
import { JwtService } from "services/jwtService";
import { Row, Button, Col } from "antd";
import routeURL from "config/routeURL";
import { SearchOutlined } from '@ant-design/icons';
import { canIAccess } from 'config/role';
import CanI from 'app/dashboard/components/canI';
const { Header } = Layout;
const AppHeader = ({ children, ...props }) => {
	const { appDispatch } = useContext(AppContext);

	const onLogout = () => {
		JwtService.logout();
		appDispatch({ type: LOGOUT_USER });
	};


	return (
		<Header
			className="site-layout-background"
			style={{
				backgroundColor: "#fff",
			}}
		>
			{children}

			<div style={{ display: "inline-block", float: "right" }}>
				<Row gutter={8}>
					<Col>
						<Link target="_blank" to={routeURL.web.home()}>
							<Button type="primary" shape="round">
								Open App
							</Button>
						</Link>
					</Col>
					 <CanI access={"searchRider"}>
						 <Col>
							 <Link to={routeURL.cms.search_rider()}>
								 <Button icon={<SearchOutlined/>} type="primary" shape="round">
									 Rider
								 </Button>
							 </Link>
						 </Col>
					 </CanI>
					<Col>
						<Profile
							{...props}
							style={{ marginLeft: "30px" }}
							onLogout={onLogout}
						/>
					</Col>
				</Row>
			</div>
		</Header>
	);
};

export default AppHeader;
