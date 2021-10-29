import { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import Icon, {
  BugFilled,
  CarOutlined,
  CheckSquareOutlined,
  CloseSquareOutlined,
  DollarOutlined,
  FieldTimeOutlined,
  HomeFilled,
  IssuesCloseOutlined,
  MobileOutlined,
  PayCircleOutlined,
  PlusSquareOutlined,
  PoundOutlined,
  RollbackOutlined,
  SendOutlined,
  TransactionOutlined,
  UserAddOutlined,
  UserOutlined,
  UserSwitchOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import logoImg from "image/logo.png";
import routeURL from "config/routeURL";
import {
  BrandIcon,
  community_icon,
  DietaryPlanIcon,
  EcommerceIcon,
  EmailOpenIcon,
  food_and_beverage_icon,
  RestaurantIcon,
  rider_icon,
  terms_and_condition_icon,
  WebIcon,
  BlogIcon,
  EditIcon,
  ActiveBlogIcon,
} from "image/icon-svg";
import { JwtService } from "services";
import { PRIVILEGE_ADMIN, PRIVILEGE_RESTAURANT } from "config";

const { Sider } = Layout;
const { SubMenu } = Menu;

const sidebar = [
  {
    key: "home",
    route: routeURL.cms.home(),
    label: "Dashboard",
    icon: <HomeFilled />,
    auth: true,
    // children: []
  },

  {
    key: "order",
    label: "Order",
    auth: true,
    icon: <Icon component={EcommerceIcon} />,
    children: [
      {
        key: "pending_order",
        route: routeURL.cms.pending_order(),
        label: "Pending Order",
        icon: <Icon component={BrandIcon} />,
        auth: true,
        // children: []
      },
      {
        key: "upcoming_order",
        route: routeURL.cms.upcoming_order(),
        label: "Upcoming Order",
        icon: <Icon component={BrandIcon} />,
        auth: true,
        // children: []
      },
      {
        key: "completed_order",
        route: routeURL.cms.completed_order(),
        label: "Completed Order",
        icon: <Icon component={BrandIcon} />,
        auth: true,
        // children: []
      },
    ],
  },
  {
    key: "restaurant-list",
    label: "Restaurants",
    icon: <Icon component={RestaurantIcon} />,
    auth: [PRIVILEGE_ADMIN],
    children: [
      {
        key: "region",
        route: routeURL.cms.region(),
        label: "Region",
        icon: <Icon component={WebIcon} />,
        auth: [PRIVILEGE_ADMIN],
      },
      {
        key: "active_restaurant",
        route: routeURL.cms.restaurant(),
        label: "Active Restaurant",
        icon: <Icon component={RestaurantIcon} />,
        auth: [PRIVILEGE_ADMIN],
      },
      {
        key: "rejected_restaurant",
        route: routeURL.cms.restaurant_rejected(),
        label: "Rejected Restuarant",
        icon: <IssuesCloseOutlined />,
        auth: [PRIVILEGE_ADMIN],
      },
      {
        key: "request_restaurant",
        route: routeURL.cms.restaurant_request(),
        label: "Restaurant Request",
        icon: <Icon component={RestaurantIcon} />,
        auth: [PRIVILEGE_ADMIN],
      },
    ],
  },
  {
    key: "rides",
    label: "Rides",
    icon: <CarOutlined />,
    auth: [PRIVILEGE_ADMIN],
    children: [
      {
        key: "pending_rides",
        route: routeURL.cms.pending_ride(),
        label: "Pending Rides",
        icon: <TransactionOutlined />,
        auth: [PRIVILEGE_ADMIN],
      },
      {
        key: "active_rides",
        route: routeURL.cms.active_ride(),
        label: "Active Rides",
        icon: <SendOutlined />,
        auth: [PRIVILEGE_ADMIN],
      },
      {
        key: "ride_history",
        route: routeURL.cms.ride_history(),
        label: "Ride History",
        icon: <FieldTimeOutlined />,
        auth: [PRIVILEGE_ADMIN],
      },
      {
        key: "cancel_rides",
        route: routeURL.cms.cancelled_ride(),
        label: "Cancelled Rides",
        icon: <IssuesCloseOutlined />,
        auth: [PRIVILEGE_ADMIN],
      },
    ],
  },
  {
    key: "rider",
    label: "Riders",
    auth: [PRIVILEGE_ADMIN],
    icon: <UserSwitchOutlined />,
    children: [
      {
        key: "active_riders",
        route: routeURL.cms.rider_active(),
        label: "Active Riders",
        icon: <SendOutlined />,
        auth: [PRIVILEGE_ADMIN],
      },
      {
        key: "rider_request",
        route: routeURL.cms.rider_request(),
        label: "Rider Request",
        icon: <UserAddOutlined />,
        auth: [PRIVILEGE_ADMIN],
      },
      {
        key: "rejected_rider",
        route: routeURL.cms.rider_rejected(),
        label: "Rejected Riders",
        icon: <IssuesCloseOutlined />,
        auth: [PRIVILEGE_ADMIN],
      },
      {
        key: "suspend_rider",
        route: routeURL.cms.rider_suspend(),
        label: "Suspended Riders",
        icon: <IssuesCloseOutlined />,
        auth: [PRIVILEGE_ADMIN],
      },
      {
        key: "expiring_licenses",
        route: routeURL.cms.expiring_document(),
        label: "Expiring Documents",
        icon: <IssuesCloseOutlined />,
        auth: [PRIVILEGE_ADMIN],
      },
    ],
  },
  // {
  //   key: 'delivery_and_tax',
  //   label: 'Settings',
  //   auth: [PRIVILEGE_ADMIN],
  //   icon: <Icon component={rider_icon}/>,
  //   children: [
  //     // {
  //     //   key: 'delivery',
  //     //   route: routeURL.cms.shipping_charge(),
  //     //   label: 'Shipping charge',
  //     //   icon: <Icon component={BrandIcon}/>,
  //     //   auth: [PRIVILEGE_ADMIN],
  //     //   // children: []
  //     // },
  //
  //     // {
  //     //   key: 'promote',
  //     //   route: routeURL.cms.promote(),
  //     //   label: 'Promote',
  //     //   icon: <Icon component={BrandIcon} />,
  //     //   // children: []
  //     // },
  //
  //   ],
  // },
  {
    key: "foods_and_restaurant",
    label: "Foods & Packages",
    icon: <Icon component={food_and_beverage_icon} />,
    auth: true,
    children: [
      {
        key: "dietary_plan",
        route: routeURL.cms.dietary_plan(),
        label: "Dietary Plan",
        icon: <Icon component={DietaryPlanIcon} />,
        auth: true,
      },
      {
        key: "speciality_food",
        route: routeURL.cms.food_speciality(),
        label: "Food Speciality",
        icon: <Icon component={DietaryPlanIcon} />,
        auth: true,
      },
      {
        key: "category_food",
        route: routeURL.cms.food_category(),
        label: "Food Category",
        icon: <Icon component={WebIcon} />,
        auth: true,
      },
      {
        key: "group_food",
        route: routeURL.cms.food_group_restaurant(),
        label: "Food Group",
        icon: <Icon component={food_and_beverage_icon} />,
        auth: true,
      },
      {
        key: "Foods",
        route: routeURL.cms.food(),
        label: "Food",
        icon: <Icon component={community_icon} />,
        auth: true,
      },
      {
        key: "restaurant_package",
        route: routeURL.cms.restaurant_package(),
        label: "Restaurant Package",
        icon: <Icon component={RestaurantIcon} />,
        auth: true,
      },
    ],
  },
  {
    key: "wallet",
    route: routeURL.cms.restaurant_earning(),
    label: "Wallet",
    icon: <WalletOutlined />,
    auth: [PRIVILEGE_RESTAURANT],
    // children: []
  },
  {
    key: "payment",
    label: "Payment",
    icon: <DollarOutlined />,
    auth: [PRIVILEGE_ADMIN],
    children: [
      {
        key: "ride-earning",
        route: routeURL.cms.earning_payment(),
        label: "Delivery Earning",
        icon: <TransactionOutlined />,
        auth: [PRIVILEGE_ADMIN],
      },
      {
        key: "rider_earning",
        route: routeURL.cms.sweat_coin_payment(),
        label: "Rider Wallet",
        icon: <PayCircleOutlined />,
        auth: [PRIVILEGE_ADMIN],
      },
    ],
  },
  {
    key: "restaurant-withdraws",
    label: "Restaurant Withdraw",
    icon: <RollbackOutlined />,
    auth: [PRIVILEGE_ADMIN],
    children: [
      {
        key: "restaurant_Withdraw_Request",
        route: routeURL.cms.restaurant_withdraw_request(),
        label: "Withdraw Request",
        icon: <PlusSquareOutlined />,
        auth: [PRIVILEGE_ADMIN],
      },
      {
        key: "restaurant_Successful_Withdraw",
        route: routeURL.cms.restaurant_successful_withdraw(),
        label: "Successful Withdraw",
        icon: <CheckSquareOutlined />,
        auth: [PRIVILEGE_ADMIN],
      },
      {
        key: "restaurant_Cancelled Withdraw",
        route: routeURL.cms.restaurant_cancelled_withdraw(),
        label: "Cancelled Withdraw",
        icon: <CloseSquareOutlined />,
        auth: [PRIVILEGE_ADMIN],
      },
    ],
  },
  {
    key: "rider-withdraws",
    label: "Rider Withdraw",
    icon: <RollbackOutlined />,
    auth: [PRIVILEGE_ADMIN],
    children: [
      {
        key: "Withdraw_Request",
        route: routeURL.cms.withdraw_request(),
        label: "Withdraw Request",
        icon: <PlusSquareOutlined />,
        auth: [PRIVILEGE_ADMIN],
      },
      {
        key: "Successful_Withdraw",
        route: routeURL.cms.successful_withdraw(),
        label: "Successful Withdraw",
        icon: <CheckSquareOutlined />,
        auth: [PRIVILEGE_ADMIN],
      },
      {
        key: "Cancelled Withdraw",
        route: routeURL.cms.cancelled_withdraw(),
        label: "Cancelled Withdraw",
        icon: <CloseSquareOutlined />,
        auth: [PRIVILEGE_ADMIN],
      },
    ],
  },
  {
    key: "reviews",
    label: "Reviews",
    icon: <Icon component={WebIcon} />,
    auth: [PRIVILEGE_ADMIN],
    children: [
      {
        key: "rider_review",
        route: routeURL.cms.rider_review(),
        label: "Rider Review",
        icon: <Icon component={terms_and_condition_icon} />,
        auth: [PRIVILEGE_ADMIN],
      },
      {
        key: "user_review",
        route: routeURL.cms.customer_review(),
        label: "Customer Review",
        icon: <Icon component={terms_and_condition_icon} />,
        auth: [PRIVILEGE_ADMIN],
      },
    ],
  },
  {
    key: "coupon_menu",
    label: "Coupon",
    icon: <Icon component={WebIcon} />,
    auth: [PRIVILEGE_ADMIN],
    children: [
      {
        key: "coupon_code",
        route: routeURL.cms.coupon_code(),
        label: "Coupon Code",
        icon: <Icon component={terms_and_condition_icon} />,
        auth: [PRIVILEGE_ADMIN],
      },
      {
        key: "coupon_usage",
        route: routeURL.cms.coupon_usage(),
        label: "Coupon Usage",
        icon: <Icon component={terms_and_condition_icon} />,
        auth: [PRIVILEGE_ADMIN],
      },
    ],
  },
  {
    key: "refer_earn",
    label: "Refer & Earn",
    icon: <Icon component={WebIcon} />,
    auth: [PRIVILEGE_ADMIN],
    children: [
      {
        key: "customer_refer",
        route: routeURL.cms.customer_refer(),
        label: "Customer",
        icon: <Icon component={terms_and_condition_icon} />,
        auth: [PRIVILEGE_ADMIN],
      },
      {
        key: "rider_refer",
        route: routeURL.cms.rider_refer(),
        label: "Rider",
        icon: <Icon component={terms_and_condition_icon} />,
        auth: [PRIVILEGE_ADMIN],
      },
    ],
  },
  {
    key: "push_notification",
    label: "Push Notification",
    icon: <Icon component={WebIcon} />,
    auth: [PRIVILEGE_ADMIN],
    children: [
      {
        key: "customer_push_notification",
        route: routeURL.cms.customer_notification(),
        label: "Customer",
        icon: <Icon component={terms_and_condition_icon} />,
        auth: [PRIVILEGE_ADMIN],
      },
      {
        key: "rider_push_notification",
        route: routeURL.cms.rider_notification(),
        label: "Rider",
        icon: <Icon component={terms_and_condition_icon} />,
        auth: [PRIVILEGE_ADMIN],
      },
    ],
  },
  {
    key: "query",
    label: "Query",
    icon: <Icon component={WebIcon} />,
    auth: [PRIVILEGE_ADMIN],

    children: [
      {
        key: "customer_query",
        route: routeURL.cms.customer_query(),
        label: "Customer",
        icon: <Icon component={terms_and_condition_icon} />,
        auth: [PRIVILEGE_ADMIN],
      },
      {
        key: "rider_query",
        route: routeURL.cms.rider_query(),
        label: "Rider",
        icon: <Icon component={terms_and_condition_icon} />,
        auth: [PRIVILEGE_ADMIN],
      },
    ],
  },
  {
    key: "contact-message",
    route: routeURL.cms.contact_message(),
    label: "Contact Messages",
    icon: <Icon component={EmailOpenIcon} />,
    auth: [PRIVILEGE_ADMIN],
    // children: []
  },
  {
    key: "user_management",
    route: routeURL.cms.user_management(),
    label: "User Management",
    icon: <UserOutlined />,
    auth: [PRIVILEGE_ADMIN],
  },
  {
    key: "client_list",
    route: routeURL.cms.client_list(),
    label: "Client List",
    icon: <UserOutlined />,
    auth: [PRIVILEGE_ADMIN],
  },
  {
    key: "campaign",
    label: "Campaign",
    icon: <UserOutlined />,
    auth: [PRIVILEGE_ADMIN],
    children: [
      {
        key: "sms",
        route: routeURL.cms.sms_campaign(),
        label: "SMS Campaign",
        icon: <MobileOutlined />,
        auth: [PRIVILEGE_ADMIN],
      },
      {
        key: "email",
        route: routeURL.cms.email_campaign(),
        label: "Email Campaign",
        icon: <Icon component={EmailOpenIcon} />,
        auth: [PRIVILEGE_ADMIN],
      },
      {
        key: "promotion",
        route: routeURL.cms.promotion(),
        label: "Promotion",
        icon: <Icon component={EmailOpenIcon} />,
        auth: [PRIVILEGE_ADMIN],
      },
    ],
  },
  {
    key: "blog",
    label: "Blog",
    icon: <Icon component={BlogIcon} />,
    auth: [PRIVILEGE_ADMIN],
    children: [
      {
        key: "active",
        route: routeURL.cms.blog_active(),
        label: "Active Blog",
        icon: <Icon component={ActiveBlogIcon} />,
        auth: [PRIVILEGE_ADMIN],
      },
      {
        key: "add",
        route: routeURL.cms.blog_add(),
        label: "Add New",
        icon: <Icon component={EditIcon} />,
        auth: [PRIVILEGE_ADMIN],
      },
    ],
  },
  {
    key: "log",
    route: routeURL.cms.log(),
    label: "Log Management",
    icon: <Icon component={BugFilled} />,
    auth: [PRIVILEGE_ADMIN],
  },

  {
    key: "community",
    route: routeURL.cms.community(),
    label: "Community",
    icon: <Icon component={community_icon} />,
    auth: [PRIVILEGE_ADMIN],
  },
  {
    key: "system-data",
    label: "System Data",
    icon: <Icon component={WebIcon} />,
    auth: [PRIVILEGE_ADMIN],
    children: [
      {
        key: "commission",
        route: routeURL.cms.commission(),
        label: "Commission",
        icon: <Icon component={EmailOpenIcon} />,
        auth: [PRIVILEGE_ADMIN],
      },
      {
        key: "fare-charge",
        route: routeURL.cms.fare(),
        label: "Fare ",
        icon: <Icon component={EmailOpenIcon} />,
        auth: [PRIVILEGE_ADMIN],
      },
      {
        key: "vehicle-type",
        route: routeURL.cms.vehicle_type(),
        label: "Vehicle Type",
        icon: <Icon component={EmailOpenIcon} />,
        auth: [PRIVILEGE_ADMIN],
      },
      {
        key: "tax",
        route: routeURL.cms.tax(),
        label: "Tax",
        icon: <Icon component={BrandIcon} />,
        auth: [PRIVILEGE_ADMIN],
        // children: []
      },
      {
        key: "terms_and_condition",
        route: routeURL.cms.terms_and_condition(),
        label: "Terms and Condition",
        icon: <Icon component={BrandIcon} />,
        auth: [PRIVILEGE_ADMIN],
        // children: []
      },
      {
        key: "pp",
        route: routeURL.cms.privacy_policy(),
        label: "Privacy Policy",
        icon: <Icon component={BrandIcon} />,
        auth: [PRIVILEGE_ADMIN],
        // children: []
      },
    ],
  },
];

// layout sidebar is rendered from here
const Sidebar = (props) => {
  const role = JwtService.getUserRole();

  const path = props.location.pathname; //pathname from the url
  const [activeKey, setActiveKey] = useState(""); // to check which sidebar is active

  useEffect(() => {
    if (path === routeURL.cms.home()) {
      // if path is homepage, simply active homepage
      props.setCollapsed(false);
      setActiveKey("home");
    } else {
      //   props.setCollapsed(true); //change
      sidebar.forEach((item) => {
        if (item.children) {
          item.children.forEach(setActive);
        } else {
          return setActive(item);
        }
      });
    }
  }, [path]);

  const setActive = ({ route, key }) => {
    if (path.startsWith(route)) {
      //if path startwith the route of the sidebar, active that sidebar
      setActiveKey(key);
    }
  };
  const expandedStyle = {
    flex: "0 0 200px !important",
    maxWidth: "200px !important",
    minWidth: "200px !important",
    width: "200px !important",
  };
  const collapsedStyle = {
    flex: "0 0 80px",
    maxWidth: 80,
    minWidth: 80,
    width: 80,
  };
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={props.collapsed}
      className="sidebar scrollbar"
      width={props.collapsed ? 80 : 250}
      style={{
        position: "sticky",
        top: 0,
        // padding: "0px 6px",
        // boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
        // overflow: "auto",
        // height: "100vh",
        // position: "fixed",
        // left: 0,
      }}
    >
      <div className="logo">
        <Link to={routeURL.cms.home()}>
          <img
            src={props.collapsed ? logoImg : logoImg}
            alt="logo"
            style={{
              height: 40,
            }}
          />
          {props.collapsed || (
            <span
              style={{
                fontWeight: 600,
                fontSize: 16,
                color: "#222",
              }}
            >
              RARA Foods
            </span>
          )}
        </Link>
      </div>
      <Menu
        selectedKeys={[activeKey]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        inlineCollapsed={props.collapsed}
      >
        {sidebar.map((item) => {
          const auth = item.auth;
          console.log(role, "auth", auth);
          if (
            (typeof auth === "boolean" && auth) ||
            (Array.isArray(auth) && auth.includes(role))
          ) {
            if (item.children) {
              return (
                <SubMenu key={item.key} icon={item.icon} title={item.label}>
                  {item.children.map((eachChild) => {
                    const child_auth = eachChild.auth;

                    if (
                      (typeof child_auth === "boolean" && child_auth) ||
                      (Array.isArray(child_auth) && child_auth.includes(role))
                    ) {
                      return (
                        <Menu.Item key={eachChild.key} icon={eachChild.icon}>
                          <Link
                            key={eachChild.key + "_link"}
                            to={eachChild.route}
                          >
                            {eachChild.label}
                          </Link>
                        </Menu.Item>
                      );
                    }
                  })}
                </SubMenu>
              );
            } else {
              return (
                <Menu.Item
                  key={item.key}
                  icon={item.icon}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Link key={item.key + "_link"} to={item.route}>
                    {" "}
                    {item.label}
                  </Link>
                </Menu.Item>
              );
            }
          }
        })}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
