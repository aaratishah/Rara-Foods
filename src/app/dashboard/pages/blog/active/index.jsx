import { Row } from "antd";
import api from "app/dashboard/api";
import ListTable from "app/dashboard/components/ListTable";
import routeURL from "config/routeURL";
import "./index.css";
import { Link } from "react-router-dom";
import { DateColumn, StringColumn } from "app/dashboard/components/column";

const rowStyle = {
  width: "100%",
};

export default function ActiveBlog() {
  const columns = [
    StringColumn("Title", "name"),
    StringColumn("Author", "author"),
    StringColumn("Link", "website", (url) => (
      <div
        style={{
          whiteSpace: "pre-line",
        }}
      >
        <Link
          target="_blank"
          to={url}
          style={{
            color: "#40a9ff",
            textDecoration: "none",
          }}
        >
          {url}
        </Link>
      </div>
    )),
    // StringColumn(
    //   "Address",
    //   "address",
    //   (address) => `${address?.street}, ${address?.city}`
    // ),
    DateColumn("Created At", "createdDateTime"),
  ];
  return (
    <Row
      style={{
        ...rowStyle,
        padding: "24px 40px",
      }}
    >
      <ListTable
        title="Active Blog"
        breadCrumb={[
          {
            title: "Home",
            url: routeURL.cms.home(),
          },
          {
            title: "Active",
            url: false,
          },
        ]}
        edit={{
          url: routeURL.cms.blog_edit,
        }}
        columnData={columns}
        apiURL={{
          get: api.restaurant.readAll,
          delete: api.restaurant.delete,
          deleteMany: api.restaurant.deleteMany,
          toggle: api.restaurant.toggle,
        }}
      />
    </Row>
  );
}
