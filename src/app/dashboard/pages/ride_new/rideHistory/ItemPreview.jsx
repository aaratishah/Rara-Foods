import { Col, Collapse, Form, Row } from "antd";
import api from "app/dashboard/api";
import AddPageLayout from "app/dashboard/components/ListTable/AddPageLayout";
import routeURL from "config/routeURL";
import React, { useEffect, useRef, useState } from "react";
import { handleError } from "services/util";
import Spinner from "../../../components/Spinner";
import CustomerName from "../../../components/user/customer/CustomerName";
import RiderName from "../../../components/user/rider/RiderName";
import moment from "moment";

const rowStyle = {
  width: "100%",
};

const backUrl = routeURL.cms.commission();
const pageTitle = "Ride Detail";
let destination = { lat: 41.756795, lng: -78.954298 };
let origin = { lat: 40.756795, lng: -73.954298 };
const timeFormat = "DD/MM/YYYY hh:mm:ss a"

const getTime = (dateTime) => <>
    {moment(dateTime)?.format(timeFormat)}
    <br />
    <span>
        {moment(dateTime).fromNow()}
    </span>
</>
export default function ItemAdd(props) {
  const {
    match: {
      params: { itemId },
    },
  } = props;
  const formRef = useRef();
  const [spinning, setSpinning] = useState(false);
  const [data, setData] = useState(null);
  const title = data ? `#${data.rideID}` : "N/A";

  const Label = ({ label, children }) => (
    <Form.Item label={label}>{children || "N/A"}</Form.Item>
  );

  useEffect(() => {
    if (itemId) {
      setSpinning(true);
      api.ride
        .read(itemId)
        .then(({ data }) => setData(data))
        .catch(handleError)
        .finally(() => setSpinning(false));
    }
  }, [itemId]);

  function getCustomerDetail() {
    return (
      <Collapse.Panel key={1} header={"Customer Detail"}>
        <Row style={{ width: "100%" }}>
          <Col xs={24} lg={12}>
            <Label label="Name">
              <CustomerName customer={data?.customer} />
            </Label>
          </Col>
          <Col xs={24} lg={12}>
            <Label label="Gender">{data?.customer?.gender}</Label>
          </Col>
          <Col xs={24} lg={12}>
            <Label label="Phone">{data?.customer?.phone}</Label>
          </Col>
          <Col xs={24} lg={12}>
            <Label label="Email">{data?.customer?.email}</Label>
          </Col>
          <Col xs={24} lg={12}>
            <Label label="Joined At">
              {getTime(data?.customer?.joinDate)}
            </Label>
          </Col>
        </Row>
      </Collapse.Panel>
    );
  }

  function getTimeLocation(
      label1,
      value1,
      label2,
      value2,
                           ) {
    return <Row style={{ width: "100%" }}>
      <Col xs={24} lg={12}>
        <Label label={label1}>
          {getTime(value1)}
        </Label>
      </Col>
      <Col xs={24} lg={12}>
        <Label label={label2}>
          <>
            {value2?.address}
            <br />
            {!!value2?.latitude && `${parseFloat(value2?.latitude)?.toFixed(
                5
            )}, ${value2?.longitude ? parseFloat(value2?.longitude)?.toFixed(5) : ""}` ||
            "N/A"}
            {value2?.latitude && (
                <a
                    style={{ marginLeft: 8 }}
                    href={`https://maps.google.com/?q=${value2?.latitude},${value2?.longitude}`}
                    target="_blank"
                >
                  Map
                </a>
            )}
          </>
        </Label>
      </Col>
    </Row>
  }

  function getRideDetail() {
    return (
      <Collapse.Panel key={2} header={"Ride Detail"}>
        <Row style={{ width: "100%" }}>
          <Col xs={24} lg={12}>
            <Label label="Origin Address">
              <>
                {data?.origin?.address}
                <br />
                {`${parseFloat(data?.origin?.latitude)?.toFixed(
                  5
                )}, ${parseFloat(data?.origin?.longitude)?.toFixed(5)}` ||
                  "N/A"}
                {data?.origin?.latitude && (
                  <a
                    style={{ marginLeft: 8 }}
                    href={`https://maps.google.com/?q=${data?.origin?.latitude},${data?.origin?.longitude}`}
                    target="_blank"
                  >
                    Map
                  </a>
                )}
              </>
            </Label>
          </Col>

          <Col xs={24} lg={12}>
            <Label label="Destination Address">
              <>
                {data?.destination?.address}
                <br />
                {`${parseFloat(data?.destination?.latitude)?.toFixed(
                  5
                )}, ${parseFloat(data?.destination?.longitude)?.toFixed(5)}` ||
                  "N/A"}
                {data?.destination?.latitude && (
                  <a
                    style={{ marginLeft: 8 }}
                    href={`https://maps.google.com/?q=${data?.destination?.latitude},${data?.destination?.longitude}`}
                    target="_blank"
                  >
                    Map
                  </a>
                )}
              </>
            </Label>
          </Col>
        </Row>
        {getTimeLocation(
          "Ride Requested At",
          data?.startTime,
          "User Location when requested",
          data?.userLocation
        )}
        {getTimeLocation(
          "Ride Accepted At",
          data?.meetDateTime,
          "Ride Accepted Location",
          data?.riderLocation
        )}
        {!!data?.DroppedDateTime &&
          getTimeLocation(
            "Ride Dropped At",
            data?.DroppedDateTime,
            "Ride Dropped Location",
            data?.droppedLocation
          )}
        {!!data?.cancelledLocation &&
          getTimeLocation(
            "Ride Cancelled At",
            data?.cancelledDateTime,
            "Ride Cancelled Location",
            data?.cancelledLocation
          )}
        <Row style={{width: '100%'}}>
        <Col xs={24} lg={12}>
          <Label label="Total Estimated Distance">
            {data?.distance} Metre.
            {data?.distance > 500 && (
              <>
                <br />
                <span style={{ fontWeight: 600 }}>
                  {(data?.distance / 1000).toFixed(1)} K.M.
                </span>
              </>
            )}
          </Label>
        </Col>
        <Col xs={24} lg={12}>
          <Label label="Estimated Rider to Customer Distance">
            {data?.distanceRiderToCustomer} Metre
            {data?.distanceRiderToCustomer > 500 &&
              <>
                <br />
                <span style={{ fontWeight: 600 }}>
                  {(data?.distanceRiderToCustomer / 1000).toFixed(1)} K.M.
                </span>
              </>
            }
          </Label>
        </Col>
        <Col xs={24} lg={12}>
          <Label label="Total Estimated Ride Duration">
            {data?.estimatedRideDuration} seconds.
            <br />
            <span style={{ fontWeight: 600 }}>
              {(data?.estimatedRideDuration / 60).toFixed(1)} minutes.
            </span>
          </Label>
        </Col>
        <Col xs={24} lg={12}>
          <Label label="Estimated Rider Meet Customer Duration">
            {data?.estimatedRiderMeetCustomerDurationText}
          </Label>
        </Col>
        <Col xs={24} lg={12}>
          <Label label="Total Ride Duration">{data?.rideDurationText}</Label>
        </Col>
        </Row>
      </Collapse.Panel>
    );
  }

  function getRiderDetail() {
    return (
      <Collapse.Panel key={3} header={"Rider Detail"}>
        <Row style={{ width: "100%" }}>
          <Col xs={24} lg={12}>
            <Label label="Name">
              <RiderName rider={data?.rider} />
            </Label>
          </Col>
          <Col xs={24} lg={12}>
            <Label label="Gender">{data?.rider?.gender}</Label>
          </Col>
          <Col xs={24} lg={12}>
            <Label label="Phone">{data?.rider?.phone}</Label>
          </Col>
          <Col xs={24} lg={12}>
            <Label label="Email">{data?.rider?.email}</Label>
          </Col>
          <Col xs={24} lg={24}>
            <Label label="Joined At">{getTime(data?.rider?.joinDate)}</Label>
          </Col>
          <Col xs={24} lg={12}>
            <Label label="Vehicle Type">{data?.vehicleType?.name}</Label>
          </Col>
          <Col xs={24} lg={12}>
            <Label label="Vehicle Number">{data?.vehicle?.vehicleNumber}</Label>
          </Col>
          <Col xs={24} lg={12}>
            <Label label="Vehicle Model">{data?.vehicle?.model}</Label>
          </Col>
          <Col xs={24} lg={12}>
            <Label label="Vehicle Color">{data?.vehicle?.color}</Label>
          </Col>
        </Row>
      </Collapse.Panel>
    );
  }

  function getFareDetail() {
    return (
      <Collapse.Panel key={4} header={"Fare Detail"}>
        <Row style={{ width: "100%" }}>
          <Col xs={24} lg={12}>
            <Label label="Total Calculated Fare (HyreCash)">
              {data?.payment?.fare?.totalFare}
            </Label>
          </Col>
          <Col xs={24} lg={12}>
            <Label label="Coupon used">
              {data?.payment?.fare?.couponDiscountAmount > 0 ? "Yes" : "No"}
            </Label>
          </Col>

          <Col xs={24} lg={12}>
            <Label label="Coupon Discount">
              {data?.payment?.fare?.couponDiscountAmount}
            </Label>
          </Col>
          <Col xs={24} lg={12}>
            <Label label="Customer Wallet used">
              <span>
                Offer:
                <span style={{fontWeight: 600, marginLeft: 8}}>
                  {data?.payment?.fare?.offerAmount || "0"}
                </span>
              </span>
              <br/>
              <span>
                Bonus:
                <span style={{fontWeight: 600, marginLeft: 8}}>
                  {data?.payment?.fare?.bonusAmount || "0"}
                </span>
              </span>
              <br />
              <span>
                Main:
                <span style={{fontWeight: 600, marginLeft: 8}}>
                  {data?.payment?.fare?.mainBalance || "0"}
                </span>
              </span>

            </Label>
          </Col>

          <Col xs={24} lg={12}>
            <Label label="Rider Commission Percentage">
              {data?.payment?.commission?.charge || "0%"}
            </Label>
          </Col>
          <Col xs={24} lg={12}>
            <Label label="Rider Commission (SweatCoin)">
              {data?.payment?.commission?.fee || "0"}
            </Label>
          </Col>
          <Col xs={24} lg={12}>
            <Label label="Company Commission Percentage">
              {(100 - data?.payment?.commission?.charge) || "0%"}
            </Label>
          </Col>
          <Col xs={24} lg={12}>
            <Label label="Company Commission">
              {data?.payment?.commission?.companyCommission || "0"}
            </Label>
          </Col>
        </Row>
      </Collapse.Panel>
    );
  }

  return (
    <Row style={{ ...rowStyle, padding: "24px 40px" }}>
      <AddPageLayout
        title={title}
        breadCrumb={[
          {
            title: "Home",
            url: routeURL.cms.home(),
          },
          {
            title: pageTitle,
            url: backUrl,
          },
          {
            title: title,
            url: false,
          },
        ]}
        showActions={false}
        backUrl={backUrl}
      >
        {spinning ? (
          <Spinner />
        ) : (
          <Row
            style={{
              ...rowStyle,
              marginTop: 40,
            }}
            justify="center"
          >
            <Col
              xs={24}
              md={24}
              lg={20}
              style={{
                backgroundColor: "#fff",
                borderRadius: 8,
                boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
                padding: 30,
              }}
            >
              <Form
                // form={form}
                layout="vertical"
                name="control-ref"
              >
                <Row style={{ width: "100%" }}>
                  <Col xs={24} lg={12} style={{ marginBottom: 16 }}>
                    <Form.Item label="Ride Status">
                      {data?.status || "N/A"}
                    </Form.Item>
                  </Col>
                  <Col xs={24} lg={12} style={{ marginBottom: 16 }}>
                    <Form.Item label="Payment Medium">
                      {data?.paymentType || "N/A"}
                    </Form.Item>
                  </Col>

                  <Collapse
                    defaultActiveKey={[1,2, 3, 4, 5,6]}
                    style={{ width: "100%" }}
                  >
                    {getCustomerDetail()}
                    {getRideDetail()}

                    {getRiderDetail()}

                    {getFareDetail()}
                  </Collapse>

                  {/*    End*/}
                </Row>
              </Form>
            </Col>
          </Row>
        )}
      </AddPageLayout>
    </Row>
  );
}
