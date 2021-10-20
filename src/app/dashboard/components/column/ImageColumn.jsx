import React, { useState } from "react";
import { Tooltip } from "antd";
import config from "config";
import PreviewImage from "../previewImage";

const imageStyle = {
  cursor: "pointer",
  //   border: '1px solid',
};
export const ImageColumn = (dataIndex) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  return {
    title: "",
    dataIndex: dataIndex,
    width: 60,
    key: dataIndex + "_key",
    render: (columnData) =>
      columnData && (
        <Tooltip title="Click to preview image">
          <PreviewImage
            previewImage={previewImage}
            previewVisible={previewVisible}
            setPreviewImage={setPreviewImage}
            setPreviewVisible={setPreviewVisible}
          />
          <img
            style={imageStyle}
            onClick={() => {
              setPreviewImage(config.getImageHost(columnData));
              setPreviewVisible(true);
            }}
            width={48}
            src={config.getImageHost(columnData)}
          />
        </Tooltip>
      ),
  };
};

