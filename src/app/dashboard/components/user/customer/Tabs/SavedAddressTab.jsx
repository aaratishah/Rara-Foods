import React, {useEffect, useState} from "react";
import {Card, Row} from "antd";
import api from "../../../../api";
import {handleError} from "../../../../../../services/util";
import Spinner from "../../../Spinner";
import MapViewer from 'app/dashboard/components/MapViewer';
import moment from "moment";

const Item = ({item}) => {
    if (!item?.geo) return <label>Invalid Address :</label>
    return <Card
        style={{
            width: '100%',
            boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
        }}
    >
        <div className="col-md-12">
            <div
                className='col-md-12'
                style={{
                    width: '100%',
                    height: 300,
                    marginBottom: 10,
                }}
            >
                <MapViewer
                    activeMarker={{
                        ...item.geo,
                        name: item.name,
                    }}
                    height={400}
                    options={{
                        zoom: 13,
                        disableDefaultUI: true,
                    }}
                />
            </div>
                <Row justify='space-between'>

                    <div className="col-sm-4">
                        <div className="form-group">
                            <label>Address Type :</label>
                            <p>{item.isWork ? 'Work Address' : item.isHome ? 'Home Address' : item?.name}</p>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="form-group">
                            <label>Latitude :</label>
                            <p>{item?.geo?.latitude || 'N/A'}</p>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="form-group">
                            <label>Longitude :</label>
                            <p>{item?.geo?.longitude || 'N/A'}</p>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="form-group">
                            <label>Created Date : </label>
                            <p>{item?.createdDateTime ? moment(item?.createdDateTime).format('DD/MM/YYYY') : 'N/A'}</p>
                        </div>
                    </div>
                    <div className="col-sm-8">
                        <div className="form-group">
                            <label>Address :</label>
                            <p>{item?.address || 'N/A'}</p>
                        </div>
                    </div>

                </Row>
        </div>
    </Card>
};
const SavedAddress = ({customer}) => {
    const [spinning, setSpinning] = useState(false);
    const [data, setData] = useState([]);
    useEffect(() => {
        if (customer) {
            setSpinning(true);
            api.client
                .savedAddress(customer)
                .then(({ data }) => setData(data))
                .catch(handleError)
                .finally(() => setSpinning(false));
        }
    }, []);

    return  spinning ? <Spinner /> : (
        <div className="tab-pane fade show active" id="pills-review">
            <h6 className="view-title">Customer's Saved Address</h6>
            <Row gutter={[16,16]}>
                {(Array.isArray(data) && data.length > 0) ? data?.map(item => <Item item={item} />) : <span className='text-muted'>No saved address found!</span>}
            </Row>
        </div>
    );
};

export default SavedAddress;
