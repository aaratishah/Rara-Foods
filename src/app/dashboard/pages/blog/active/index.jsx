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

export default function ActiveBlog(props) {
  const columns = [
    StringColumn("Title", "title"),
    StringColumn("Author", "author"),
    StringColumn("Link", "links", (url) => (
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
          get: api.blog.read_active,
          delete: api.blog.delete,
          deleteMany: api.blog.deleteMany,
          toggle: api.blog.toggle,
        }}
      />
    </Row>
  );
}
