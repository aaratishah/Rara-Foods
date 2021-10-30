import { Row } from 'antd';
import api from 'app/dashboard/api';
import ListTable from 'app/dashboard/components/ListTable';
import routeURL from 'config/routeURL';
import React from 'react';
import './index.css';
import { DateColumn, NumberColumn, StringColumn, BoolColumn} from 'app/dashboard/components/column/index';

const rowStyle = {
  width: "100%",
};

const title = "Promotion";
export default function Promotion() {
  const columns = [
    StringColumn("Name", "name"),
    StringColumn('Address','address',(address)=>`${address?.street}, ${address?.city}`),
    DateColumn("Created At", "createdDateTime"),
  ];
  return (
    <Row style={{ ...rowStyle, padding: "24px 40px" }}>
      <ListTable
        title={title}
        breadCrumb={[
          {
            title: "Home",
            url: routeURL.cms.home(),
          },
          {
            title: title,
            url: false,
          },
        ]}
        addButton={{
          title: `Add Promotion`,
          url: routeURL.cms.promotion_add,
        }}
        // edit={{
        //   url: (itemId) => routeURL.cms.promotion_edit(itemId),
        // }}
        columnData={columns}
        apiURL={{
          get: api.promotion.readPromotion,
          delete: api.promotion.deletePromotion,
          deleteMany: api.promotion.deleteManyPromotion,
          toggle: api.promotion.toggle
        }}
      />
    </Row>
  );
}