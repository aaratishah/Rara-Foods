import { Menu, Dropdown, Avatar } from "antd";
import { AvatarIcon } from "../../components";
import { CaretDownOutlined } from "@ant-design/icons";
import routeURL from "config/routeURL";
import CanI from 'app/dashboard/components/canI';
import { JwtService } from 'services';
import { canIAccess } from 'config/role';

export const Profile = ({ history, onLogout, ...props }) => {
	const onMenuClick = ({ key }) => {
		if (key === "logout" && onLogout) {
			onLogout();
		} else if (key === "my_account") {
			history.push(routeURL.cms.account());
		}
		else if (key === "restaurant_earning") {
			history.push(routeURL.cms.restaurant_earning());
		}else if (key === "company_earning") {
			history.push(routeURL.cms.company_earning());
		}
	};
	const clientRole = JwtService.getUserRole();

	const menu = (
		<Menu onClick={onMenuClick}>
			<Menu.Item key="logout">Logout</Menu.Item>
			<Menu.Item key="my_account">My Account</Menu.Item>
			{canIAccess('restaurantEarning', clientRole) && <Menu.Item key="restaurant_earning">Wallet </Menu.Item>}
			{/*{canIAccess('companyEarning', clientRole) && <Menu.Item key="company_earning">Earning</Menu.Item>}*/}
		</Menu>
	);

	return (
		<div style={{ display: "inline-block", ...props.style }}>
			<Dropdown overlay={menu} placement="topLeft">
				<a className="ant-dropdown-link" href="#">
					<Avatar
						size={32}
						icon={<AvatarIcon />}
						style={{ marginRight: "15px" }}
					/>
					<CaretDownOutlined />
				</a>
			</Dropdown>
		</div>
	);
};
