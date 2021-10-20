import React from "react";
import profileImage from "image/user.png";
import {ImagePreview} from "../../../previewImage/ImagePreview";
import moment from "moment";

const DocumentTab = ({
                       insurance,
                       agreementDoc,
                       blueBook,
                       citizenship,
                       license,
                     }) => {
  return (
      <div className="tab-pane fade show active" id="pills-download">
        <div className="my-account-download account-wrapper">
          <h6 className="view-title">Rider's Bluebook Detail</h6>
          <hr/>
          <div className="row">
            <div className="col-sm-12">
              <div className="form-group">
                <label>Bluebook Scanned Photo :</label>
                <br/>
                <div className="head-widget vehicle-img">
                  <ImagePreview src={blueBook?.document} width={150} />
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="form-group">
                <label>Bluebook Number :</label>
                <p>{blueBook?.blueBookNumber || 'N/A'}</p>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="form-group">
                <label>Expire At : </label>
                <p>{blueBook?.expireDate ? moment(blueBook?.expireDate).format('DD/MM/YYYY') : 'N/A'}</p>
              </div>
            </div>
          </div>
          <h6 className="view-title">Rider's Licence Detail</h6>
          <hr/>
          <div className="row">
            <div className="col-sm-12">
              <div className="form-group">
                <label>License Scanned Photo :</label>
                <br/>
                <div className="head-widget vehicle-img">
                  <ImagePreview src={license?.document} width={150} />
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="form-group">
                <label>License Number :</label>
                <p>{license?.licenseNo || 'N/A'}</p>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="form-group">
                <label>Issued Place :</label>
                <p>{license?.issuedPlace || 'N/A'}</p>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="form-group">
                <label>Issued At :</label>
                <p>{license?.issuedDate ? moment(license?.issuedDate).format('DD/MM/YYYY') : 'N/A'}</p>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="form-group">
                <label>Expire At : </label>
                <p>{license?.expireDate ? moment(license?.expireDate).format('DD/MM/YYYY') : 'N/A'}</p>
              </div>
            </div>
          </div>
          <h6 className="view-title">Rider's Citizenship Detail</h6>
          <hr/>
          <div className="row">
            <div className="col-sm-12">
              <div className="form-group">
                <label>Citizenship Scanned Photo :</label>
                <br/>
                <div className="head-widget vehicle-img">
                  <ImagePreview src={citizenship?.document} width={150} />
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="form-group">
                <label>Citizenship Number :</label>
                <p>{citizenship?.citizenshipNo || 'N/A'}</p>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="form-group">
                <label>Issued Place :</label>
                <p>{citizenship?.issuedDate ? moment(citizenship?.issuedDate).format('DD/MM/YYYY') : 'N/A'}</p>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="form-group">
                <label>Issued At :</label>
                <p>{citizenship?.issuedPlace || 'N/A'}</p>
              </div>
            </div>
          </div>
          <h6 className="view-title">Aggreement Document</h6>
          <hr/>
          <div className="row">
            <div className="col-sm-12">
              <div className="form-group">
                <label>Agreement Scanned Photo :</label>
                <br/>
                <div className="head-widget vehicle-img">
                  <ImagePreview src={agreementDoc} width={150} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default DocumentTab;
