import { Row } from "antd";
import ItemAddForm from "app/dashboard/components/Campaign/ItemAddForm";
// import AddPageLayout from 'app/dashboard/components/ListTable/AddPageLayout';
// import { notificationError } from 'app/dashboard/components/notification';

const rowStyle = {
  width: "100%",
};
const pageTitle = "Send Email";

export default function ItemAdd(props) {
  const {
    match: {
      params: { itemId },
    },
    history,
  } = props;

  return (
    <Row
      style={{
        ...rowStyle,
        padding: "24px 40px",
      }}
    >
      <ItemAddForm
        ItemId={itemId}
        pageTitle={pageTitle}
        history={history}
        rowStyle={rowStyle}
      />
    </Row>
  );
}
