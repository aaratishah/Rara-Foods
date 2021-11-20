import api from "app/web/api";
import { ShopContext, UserContext } from "context";
import { useContext, useEffect, useState } from "react";
import moment from "moment";
import { Button, Col, Modal, Row, Table, Tooltip } from "antd";
import { handleError, orderStatus } from "services/util";
import OrderPreview from "./component/OrderPreview";
import { BookOutlined, EyeFilled, ShoppingFilled } from "@ant-design/icons";
import routeURL from "config/routeURL";
import { useHistory } from "react-router-dom";
import PendingOrders from "app/web/pages/account/component/PendingOrderPreview";
import OrderAction from "app/web/pages/account/component/OrderAction";

export default function Order() {
  const [spinning, setSpinning] = useState(false);
  const [order, setOrder] = useState(null);
  const { clientStore } = useContext(UserContext);
  const isAuth = clientStore.isAuthenticated;
  const [orderId, setOrderId] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);

  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      width: 100,
      key: "orderId",
      sorter: (a, b) => a.orderId.localeCompare(b.orderId),
      sortDirections: ["descend", "ascend"],
      ellipsis: true,
      render: (columnData) => (
        <div
        // style={{
        //   whiteSpace: 'pre-line',
        // }}
        >
          {columnData}
        </div>
      ),
    },
    {
      title: "Restaurant",
      dataIndex: "restaurantId",
      width: 100,
      key: "restaurantId",
      sorter: (a, b) =>
        (a.restaurantId ? a.restaurantId.name : "").localeCompare(
          b.restaurantId ? b.restaurantId.name : ""
        ),
      sortDirections: ["descend", "ascend"],
      ellipsis: true,
      render: (restaurantId) => (
        <div
        // style={{
        //   whiteSpace: 'pre-line',
        // }}
        >
          {restaurantId ? restaurantId.name : "N/A"}
        </div>
      ),
    },
    {
      title: "Item",
      dataIndex: "food",
      width: 100,
      key: "food",
      sorter: (a, b) => a.food.length - b.food.length,
      sortDirections: ["descend", "ascend"],
      ellipsis: true,
      render: (food) => (
        <div
        // style={{
        //   whiteSpace: 'pre-line',
        // }}
        >
          {food.length}
        </div>
      ),
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      width: 100,
      key: "totalPrice",
      sorter: (a, b) => a.totalPrice - b.totalPrice,
      sortDirections: ["descend", "ascend"],
      ellipsis: true,
      render: (totalPrice) => (
        <div
        // style={{
        //   whiteSpace: 'pre-line',
        // }}
        >
          {process.env.REACT_APP_CURRENCY_SYMBOL}
          {totalPrice}
        </div>
      ),
    },
    // {
    //   title: 'Payment',
    //   dataIndex: 'paymentMode',
    //   key: 'paymentMode',
    //   sorter: (a, b) => a.paymentMode.localeCompare(b.paymentMode),
    //   sortDirections: ['descend', 'ascend'],
    //   ellipsis: true,
    //   render: (paymentMode) => (
    //     <div
    //       style={{
    //         whiteSpace: 'pre-line',
    //       }}
    //     >
    //       {paymentMode}
    //     </div>
    //   ),
    // },
    // {
    //   title: 'Payment Status',
    //   dataIndex: 'paymentStatus',
    //   key: 'paymentStatus',
    //   sorter: (a, b) => a.paymentStatus.localeCompare(b.paymentStatus),
    //   sortDirections: ['descend', 'ascend'],
    //   ellipsis: true,
    //   render: (paymentStatus) => (
    //     <div
    //       style={{
    //         whiteSpace: 'pre-line',
    //       }}
    //     >
    //       {paymentStatus}
    //     </div>
    //   ),
    // },
    {
      title: "Order Status",
      dataIndex: "status",
      width: 100,
      key: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
      sortDirections: ["descend", "ascend"],
      ellipsis: true,
      render: (status) => (
        <div
        // style={{
        //   whiteSpace: 'pre-line',
        // }}
        >
          {orderStatus[status]}
        </div>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdDateTime",
      width: 100,
      key: "createdDateTime",
      render: (data) => (
        <div
        // style={{
        //   whiteSpace: 'pre-line',
        // }}
        >
          {moment(data).fromNow()}
        </div>
      ),
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) =>
        moment(a.createdDateTime).unix() - moment(b.createdDateTime).unix(),
    },
    {
      title: "Preview",
      dataIndex: "_id",
      key: "_id",
      width: 130,
      fixed: "right",
      render: (orderId, order) => {
        return (
          <OrderAction
            order={order}
            onPreview={() => {
              setOrderId(orderId);
              setPreviewVisible(true);
            }}
          />
        );
      },
    },
  ];

  useEffect(() => {
    if (isAuth) {
      setSpinning(true);
      api.client
        .order()
        .then(({ data }) => setOrder(data))
        .catch(handleError)
        .finally(() => setSpinning(false));
    }
  }, [isAuth]);
  return (
    <div>
      <PendingOrders orders={order || []} />
      <OrderPreview
        orderId={orderId}
        previewVisible={previewVisible}
        setPreviewVisible={setPreviewVisible}
      />
      <div className="my-account-order account-wrapper">
        <h4 className="account-title">All Orders</h4>
        <div className="account-table text-center mt-30 table-responsive">
          <Table
            style={{ whiteSpace: "pre" }}
            columns={columns}
            dataSource={order}
          />
        </div>
      </div>
    </div>
  );
}
