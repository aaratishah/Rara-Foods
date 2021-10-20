import React, { useEffect, useState } from "react";
import api from "app/dashboard/api";
import { handleError } from "services/util";
import ProfileOverview from "./ProfileOverview";
import { Col, Row, Tabs } from "antd";
import ProfileTab from "./Tabs/Profile";
import VehicleTab from "./Tabs/Vehicle";
import DocumentTab from "./Tabs/DocumentTab";
import ReviewTab from "./Tabs/ReviewTab";
import RiderEarningTab from "./Tabs/RiderEarning";
import WalletTab from "./Tabs/Wallet";
import WithdrawTab from "./Tabs/Withdraw";
import QueryTab from "./Tabs/Query";
import PaymentMethodTab from "./Tabs/PaymentMethodTab";

const RiderDetail = ({ rider }) => {
  const [spinning, setSpinning] = useState(false);
  const [profile, setProfile] = useState({});
  const [riderReview, setReview] = useState({});
  useEffect(() => {
    if (rider) {
      setSpinning(true);
      api.rider
        .read(rider)
        .then(({ data }) => setProfile(data))
        .catch(handleError)
        .finally(() => setSpinning(false));
      api.rider
          .review(rider)
          .then(({ data }) => setReview(data))
          .catch(handleError)
          .finally(() => setSpinning(false));
    }
  }, [rider]);

  const tabs = [
    {
      icon: "fa-tachometer-alt-fast",
      title: "Profile",
      key: "home",
      content: <ProfileTab profile={profile} />,
    },
    {
      icon: "fa-tachometer-alt-fast",
      title: "Vehicle",
      key: "hom32323e",
      content: <VehicleTab vehicle={profile?.vehicle} />,
    },
    {
      icon: "fa-tachometer-alt-fast",
      title: "Document",
      key: "h232ome",
      content: (
        <DocumentTab
          insurance={profile?.insurance}
          aggreementDoc={profile?.agreementDoc}
          blueBook={profile?.blueBook}
          citizenship={profile?.citizenship}
          license={profile?.license}
        />
      ),
    },
    {
      icon: "fa-tachometer-alt-fast",
      title: "Reviews",
      key: "review",
      content: <ReviewTab reviews={riderReview?.reviews} />,
    },
    {
      icon: "fa-tachometer-alt-fast",
      title: "Payment Method",
      key: "payment method",
      content: <PaymentMethodTab rider={rider} />,
    },
    {
      icon: "fa-tachometer-alt-fast",
      title: "Wallet",
      key: "Wallet",
      content: <WalletTab customer={rider} />,
    },
    {
      icon: "fa-tachometer-alt-fast",
      title: "Earnings",
      key: "earning",
      content: <RiderEarningTab rider={rider} />,
    },
    {
      icon: "fa-tachometer-alt-fast",
      title: "Withdraws",
      key: "withdraw",
      content: <WithdrawTab rider={rider} />,
    },
    // {
    //   icon: "fa-tachometer-alt-fast",
    //   title: "Rides",
    //   key: "Rides",
    //   content: <ProfileOverview rider={rider} />,
    // },
    // {
    //   icon: "fa-tachometer-alt-fast",
    //   title: "Queries",
    //   key: "Queries",
    //   content: <QueryTab rider={rider} />,
    // },
    // {
    //   icon: "fa-tachometer-alt-fast",
    //   title: "Location",
    //   key: "Location",
    //   content: <ProfileOverview profile={profile} />,
    // },
  ];
  const [activeKey, setActiveKey] = useState(tabs[0].key);
  const getTabName = (key) => tabs.find((tab) => tab.key === key).title;

  return (
    <section className="my-account-page pt-50 pb-80">
      <div className="container">
        <ProfileOverview profile={profile} customerReview={riderReview} onRateClick={()=>setActiveKey('review')} />
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

export default RiderDetail;
