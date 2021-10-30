import {useEffect} from 'react'
import { Row } from "antd";
import PromotionAddForm from "app/dashboard/components/Campaign/PromotionAddForm";
// import AddPageLayout from 'app/dashboard/components/ListTable/AddPageLayout';
// import { notificationError } from 'app/dashboard/components/notification';

const rowStyle = {
  width: "100%",
};
const pageTitle = "Add Promotion";

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
      <PromotionAddForm
        ItemId={itemId}
        pageTitle={pageTitle}
        history={history}
        rowStyle={rowStyle}
      />
    </Row>
  );
}