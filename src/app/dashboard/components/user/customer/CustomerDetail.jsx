import React, { useEffect, useState } from "react";
import api from "app/dashboard/api";
import { handleError } from "services/util";
import ProfileOverview from "./ProfileOverview";
import { Col, Row, Tabs } from "antd";
import ProfileTab from "./Tabs/Profile";
import ReviewTab from "./Tabs/ReviewTab";
import CustomerWalletLoadTab from "./Tabs/CustomerWalletLoadTab";
import WalletTab from "./Tabs/Wallet";
import QueryTab from "./Tabs/Query";
import SavedAddress from "./Tabs/SavedAddressTab";

const CustomerDetail = ({ customer }) => {
    const [spinning, setSpinning] = useState(false);
    const [profile, setProfile] = useState({});
    const [customerReview, setReview] = useState({});
    useEffect(() => {
        if (customer) {
            setSpinning(true);
            api.client
                .read(customer)
                .then(({ data }) => setProfile(data))
                .catch(handleError)
                .finally(() => setSpinning(false));
            api.client
                .review(customer)
                .then(({ data }) => setReview(data))
                .catch(handleError)
                .finally(() => setSpinning(false));
        }
    }, [customer]);

    const tabs = [
        {
            icon: "fa-tachometer-alt-fast",
            title: "Profile",
            key: "home",
            content: <ProfileTab profile={profile} />,
        },
        {
            icon: "fa-tachometer-alt-fast",
            title: "Reviews",
            key: "review",
            content: <ReviewTab reviews={customerReview?.reviews} />,
        },
        {
            icon: "fa-tachometer-alt-fast",
            title: "Saved Address",
            key: "payment method",
            content: <SavedAddress customer={customer} />,
        },
        {
            icon: "fa-tachometer-alt-fast",
            title: "Wallet",
            key: "Wallet",
            content: <WalletTab customer={customer} />,
        },
        {
            icon: "fa-tachometer-alt-fast",
            title: "Deposits",
            key: "earning",
            content: <CustomerWalletLoadTab customer={customer} />,
        },

        {
            icon: "fa-tachometer-alt-fast",
            title: "Rides",
            key: "Rides",
            content: <ProfileOverview customer={customer} />,
        },
        {
            icon: "fa-tachometer-alt-fast",
            title: "Queries",
            key: "Queries",
            content: <QueryTab customer={customer} />,
        },

    ];
    const [activeKey, setActiveKey] = useState(tabs[0].key);
    const getTabName = (key) => tabs.find((tab) => tab.key === key).title;

    return (
        <section className="my-account-page pt-50 pb-80">
            <div className="container">
                <ProfileOverview profile={profile} customerReview={customerReview} onRateClick={()=>setActiveKey('review')} />
                <div className="row">
                    <div className="col-md-12 mt-3 ">
                        <div className="my-account-menu mt-10">
                            <ul
                                className="nav account-menu-list view-list"
                                style={{
                                    backgroundColor: "unset",
                                }}
                            >
                                <Col xs={0} sm={24}>
                                    <Tabs
                                        onChange={setActiveKey}
                                        activeKey={activeKey}
                                        tabPosition={"left"}
                                        // style={{ height: 220 }}
                                    >
                                        {tabs.map((tab, idx) => (
                                            <Tabs.TabPane
                                                tab={
                                                    <li
                                                        className={tab.key === activeKey && "active"}
                                                        style={{
                                                            width: "100%",
                                                            backgroundColor:
                                                                tab.key === activeKey && "#ef5619",
                                                            color: tab.key === activeKey && "#fff",
                                                            padding: "10px 30px",
                                                            fontSize: 14,
                                                        }}
                                                    >
                                                        <i className={`far ${tab.icon}`} /> {tab.title}
                                                    </li>
                                                }
                                                key={tab.key}
                                            >
                                                {tab.content}
                                            </Tabs.TabPane>
                                        ))}
                                    </Tabs>
                                </Col>
                                <Col sm={0} xs={24}>
                                    <Tabs
                                        onChange={setActiveKey}
                                        activeKey={activeKey}
                                        tabPosition={"top"}
                                        // style={{ height: 220 }}
                                    >
                                        {tabs.map((tab, idx) => (
                                            <Tabs.TabPane
                                                tab={
                                                    <li
                                                        className={tab.key === activeKey && "active"}
                                                        style={{ width: "100%" }}
                                                    >
                                                        <i className={`far ${tab.icon}`} /> {tab.title}
                                                    </li>
                                                }
                                                key={tab.key}
                                            >
                                                <Row justify="center">
                                                    <Col xs={23}>{tab.content}</Col>
                                                </Row>
                                            </Tabs.TabPane>
                                        ))}
                                    </Tabs>
                                </Col>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CustomerDetail;
