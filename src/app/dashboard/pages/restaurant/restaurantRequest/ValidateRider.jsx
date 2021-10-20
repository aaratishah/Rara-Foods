import React, { useEffect, useState } from "react";
import api from "../../../api";
import { handleError } from "../../../../../services/util";
import { Divider, Form, Modal, Row, Typography } from "antd";
import RiderName from "app/dashboard/components/user/rider/RiderName";
import Spinner from "../../../components/Spinner";
import { ImagePreview } from "../../../components/previewImage/ImagePreview";
import profileImage from "../../../../../image/user.png";

const ValidateRider = ({ rider, open, onClose }) => {
  const riderId = rider?._id;
  const [data, setData] = useState(null);
  const [validating, setValidating] = useState(false);

  useEffect(() => {
    if (riderId) {
      setValidating(true);
      api.rider
        .validate_rider(riderId)
        .then(({ data }) => setData(data))
        .catch(handleError)
        .finally(() => setValidating(false));
    }
  }, [riderId]);
  const arr = ["blueBook", "citizenship", "license", "vehicle"];

  return (
    <Modal
      className="ant-modal-launching-soon"
      title={null}
      keyboard={false}
      width={600}
      visible={open}
      footer={null}
      onCancel={onClose}
    >
      <Row justify="center">
        <Typography.Title level={5}>
          Validation of rider <RiderName rider={rider} />
        </Typography.Title>
        {validating ? (
          <Spinner />
        ) : (
          <Row
            style={{
              width: "100%",
            }}
          >
            <span
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 20,
              }}
            >
              Expiry Status
            </span>
            <Row>
              <Form.Item
                style={{
                  width: "100%",
                  marginBottom: 0,
                }}
                label="License Status"
              >
                {data?.expired?.license === null
                  ? "N/A"
                  : data?.expired?.license
                  ? "Expired"
                  : "Valid"}
              </Form.Item>
              <Form.Item
                style={{
                  width: "100%",
                  marginBottom: 0,
                }}
                label="BlueBook Status"
              >
                {data?.expired?.blueBook === null
                  ? "N/A"
                  : data?.expired?.blueBook
                  ? "Expired"
                  : "Valid"}
              </Form.Item>
              <Form.Item
                style={{
                  width: "100%",
                  marginBottom: 0,
                }}
                label="Insurance Status"
              >
                {data?.expired?.insurance === null
                  ? "N/A"
                  : data?.expired?.insurance
                  ? "Expired"
                  : "Valid"}
              </Form.Item>
            </Row>
            <Divider />
            <span
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  marginBottom: 20,
                }}
            >
              Document Duplicacy with other rider
            </span>
            {arr.map((each) => {
              if (!data?.duplicates) return null;
              const item = data?.duplicates[each];
              if (!item) return null;
              return (
                <Row>
                  <Typography
                    style={{
                      textTransform: "capitalize",
                      width: '100%',
                      fontSize: 20
                    }}
                  >
                    {each}
                  </Typography>
                  {item.length === 0 ? (
                    <Form.Item style={{
                      width: '100%'
                    }} label="Duplicate:">No duplicate found</Form.Item>
                  ) : (
                    <Row>
                      <Typography style={{
                        width: '100%'
                      }}>Match Cases: </Typography>
                      {item.map((profile) => {
                        return (
                          <div className="head-widget img-profile flex flex-row">
                            <ImagePreview
                              src={profile?.photo}
                              fallback={profileImage}
                              width={75}
                            />
                            <span>
                              <p>
                                <label className="text-mute">Name : </label>{" "}
                                <RiderName rider={profile} />
                              </p>
                              <p>
                                <label className="text-mute">Email : </label>{" "}
                                {profile?.email}
                              </p>
                              <p>
                                <label className="text-mute">Phone : </label>{" "}
                                {profile?.phone}
                              </p>
                              <p>
                                <label className="text-mute">Gender : </label>{" "}
                                {profile?.gender}
                              </p>
                            </span>
                          </div>
                        );
                      })}
                    </Row>
                  )}
                </Row>
              );
            })}
          </Row>
        )}
      </Row>
    </Modal>
  );
};

export default ValidateRider;
