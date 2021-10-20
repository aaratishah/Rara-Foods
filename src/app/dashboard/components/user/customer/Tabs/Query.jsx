import React, {useEffect, useState} from "react";
import {Card, Row} from "antd";
import Spinner from "../../../Spinner";
import api from "../../../../api";
import {handleError} from "../../../../../../services/util";
import moment from "moment";

const Item = ({query}) => (
  <Card
    style={{
      boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
    }}
  >
    <div className="col-md-12 media">
      <div className="media-body">
        <strong className="text-success">{query?.subject}</strong>
        <span className="text-muted pull-right">
            <span className='text-muted ml-2'>{moment(query?.createdDateTime).fromNow()}</span>
        </span>
        <p>
            {query?.message}
        </p>
          Responded: <span className="badge badge-info">{query?.hasResponded ? 'Yes' : "No"}</span>
      </div>
    </div>
  </Card>
);
const QueryTab = ({customer}) => {
    const [spinning, setSpinning] = useState(false);
    const [data, setData] = useState([]);
    useEffect(() => {
        if (customer) {
            setSpinning(true);
            api.client
                .query(customer)
                .then(({ data }) => setData(data))
                .catch(handleError)
                .finally(() => setSpinning(false));
        }
    }, [customer]);

  return  spinning ? <Spinner /> : (
    <div className="tab-pane fade show active" id="pills-review">
      <h6 className="view-title">Queries</h6>
        <Row gutter={[16,16]}>
            {(Array.isArray(data) && data.length > 0) ? data?.map(query => <Item query={query} />) : <span className='text-muted'>No Query Found</span>}
        </Row>
    </div>
  );
};

export default QueryTab;
