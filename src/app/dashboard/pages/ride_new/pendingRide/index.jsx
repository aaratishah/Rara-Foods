import {Breadcrumb, Button, Col, Radio, Row, Spin, Table, Tooltip} from "antd";
import api from "app/dashboard/api";
import routeURL from "config/routeURL";
import React, { useContext, useEffect, useState } from "react";
import "./index.css";
import {
  BoolColumn,
  DateColumn,
  NumberColumn,
  StringColumn,
} from "app/dashboard/components/column/index";
import CustomerName from "app/dashboard/components/user/customer/CustomerName";
import { Link } from "react-router-dom";
import { EyeFilled, RedoOutlined } from "@ant-design/icons";
import { handleError } from "../../../../../services/util";
import moment from "moment";
import Title from "antd/lib/typography/Title";
import { useHotkeys } from "react-hotkeys-hook";
import { SocketContext } from "../../../../../context/socketContext";
import {mapCenterDefault, rideStatus as activeRideStatus, socketEvents} from "../../../../../config";
import MapView from "./MapView";

const rowStyle = {
  width: "100%",
};

const title = "Pending Rides";

export default function RideHistory() {
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    if (socket) {
      socket.on(socketEvents.RIDE_STATUS_ADMIN, ({ ride, rideStatus }) => {
        console.log('status data',ride, rideStatus)
        if(!ride) return;

        // if ([rideStatus.REQUEST_PENDING].includes(status)) setRefreshData(data => !data)
        setRowsData((rows) => {
          let tempData = [...rows];
          const index = tempData.findIndex(
              (each) => each?._id?.toString() === ride?._id?.toString()
          );
          const isPending = rideStatus === activeRideStatus.REQUEST_PENDING;
          const isExist = index >= 0;
          console.log('status ride inside', isExist, isPending);
          if (!isExist && isPending) {
            tempData.push(ride);
          }else if(isExist && !isPending) {
            tempData.splice(index, 1);
          }
          tempData = tempData.map((each, idx) => ({ key: idx, ...each }))
              .sort(
                  (a, b) =>
                      moment(b.createdDateTime).unix() - moment(a.createdDateTime).unix()
              )
          syncData(tempData);
          return tempData;
        });
      });
      return ()=>socket.off(socketEvents.RIDE_STATUS_ADMIN);
    }
  }, [socket]);

  const [view, setView] = useState("map");
  const [rowsData, setRowsData] = useState([]);
  const [spinning, setSpinning] = useState(false);
  const [refreshData, setRefreshData] = useState(false);
  useHotkeys("r", () => setRefreshData((value) => !value));

  const columns = [
    // StringColumn("Partner", "rider", (rider) => <RiderName rider={rider} />),
    StringColumn("Customer", "customer", (customer) => (
      <CustomerName customer={customer} />
    )),
    StringColumn("Vehicle", "vehicleType", (vehicleType) => {
      return <span>{vehicleType?.name || "N/A"}</span>;
    }),
    StringColumn("Origin", "origin", (origin) => {
      return <span>{origin?.address || "N/A"}</span>;
    }),
    StringColumn("Destination", "destination", (destination) => {
      return <span>{destination?.address || "N/A"}</span>;
    }),
    NumberColumn("Delivery Charge", "fareAmount", 60),
    NumberColumn("Distance (m)", "distance"),
    // BoolColumn("Coupon", "coupon", null, 65),
    DateColumn("Date", "createdDateTime"),
    // {
    //   title: "Actions",
    //   width: 150,
    //   dataIndex: "_id",
    //   render: (rowId, row) => (
    //     <Row gutter={16} align="middle">
    //       <Col>
    //         <Link to={"/"}>
    //           <div
    //             style={{
    //               display: "flex",
    //               flexDirection: "row",
    //               alignItems: "center",
    //               cursor: "pointer",
    //               color: "#40a9ff",
    //             }}
    //           >
    //             <EyeFilled style={{ marginRight: 5 }} />
    //             View
    //           </div>
    //         </Link>
    //       </Col>
    //     </Row>
    //   ),
    // },
  ];

  const syncData = (data) => {
    setRowsData(
      data
        .map((each, idx) => ({ key: idx, ...each }))
        .sort(
          (a, b) =>
            moment(b.createdDateTime).unix() - moment(a.createdDateTime).unix()
        )
    );
  };

  useEffect(() => {
    setSpinning(true);
    api.ride.pending
      .readAll()
      .then(({ data }) => syncData(data))
      .catch(handleError)
      .finally(() => setSpinning(false));
  }, [refreshData]);

  const [center, setCenter] = useState({
    lat: mapCenterDefault.latitude,
    lng: mapCenterDefault.longitude,
  });
  const resetCenter = () => setCenter({
    lat: mapCenterDefault.latitude,
    lng: mapCenterDefault.longitude,
  });
  const handleCenter = (lat, lng) => {
    setCenter({lat, lng})
  }

  return (
    <Row style={{ ...rowStyle, padding: "24px 40px" }}>
      <Row style={rowStyle} align="middle" justify="space-between">
        <Col>
          <Title
            level={3}
            style={{
              marginBottom: 0,
              letterSpacing: 1,
            }}
          >
            {title}
          </Title>
        </Col>

        <Col>
          <Radio.Group
            onChange={({ target: { value } }) => setView(value)}
            value={view}
            buttonStyle="solid"
          >
            <Radio.Button value="table">Table</Radio.Button>
            <Radio.Button value="map">Map</Radio.Button>
          </Radio.Group>
          <Button disabled={view==='table'} type="link" onClick={resetCenter}>Reset ViewBox</Button>
        </Col>
        <Col></Col>
        <Col>
          <Tooltip title="Refresh (press r to refresh)">
            <RedoOutlined
                style={{
                  fontSize: 30,
                }}
                onClick={() => setRefreshData((value) => !value)}
                spin={spinning}
            />
          </Tooltip>
        </Col>

      </Row>

      <Row style={rowStyle}>
        <Breadcrumb separator="">
          <Breadcrumb.Item>
            Pending Ride: {rowsData?.length || 0}
          </Breadcrumb.Item>
        </Breadcrumb>
      </Row>

      {/*    Table  Start here*/}
      <Row style={{ ...rowStyle, marginTop: 40 }}>
        {view === "table" ? (
          <Spin spinning={spinning}>
            <Table
              style={{ whiteSpace: "pre" }}
              columns={columns}
              dataSource={rowsData}
            />
          </Spin>
        ) : (
            <MapView center={center} handleCenter={handleCenter} markers={rowsData} />
        )}
      </Row>
      {/*    Table Ends here*/}
    </Row>
  );
}
