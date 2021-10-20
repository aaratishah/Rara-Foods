import React, { useState } from "react";
import { Tooltip } from "antd";
import config from "config";
import PreviewImage from "../previewImage";

const imageStyle = {
  cursor: "pointer",
  //   border: '1px solid',
};
export const ImagePreview = ({ src, width = 48, fallback }) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

    if(!src && fallback) return  <img
        style={imageStyle}
        width={width}
        src={fallback}
    />

    if(!src) return 'Image Not Available'

  return (
    <Tooltip title="">
      <PreviewImage
        previewImage={previewImage}
        previewVisible={previewVisible}
        setPreviewImage={setPreviewImage}
        setPreviewVisible={setPreviewVisible}
      />
      <img
        style={imageStyle}
        onClick={() => {
          setPreviewImage(config.getImageHost(src));
          setPreviewVisible(true);
        }}
        width={width}
        src={config.getImageHost(src)}
      />
    </Tooltip>
  );
};
