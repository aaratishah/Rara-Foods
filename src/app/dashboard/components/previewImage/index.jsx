import React from 'react';
import {Modal} from "antd";

const PreviewImage = ({previewImage, previewVisible,setPreviewVisible, setPreviewImage }) => {

    return (
        <Modal
            zIndex={9999}
            visible={previewVisible}
            // title={previewTitle}
            footer={null}
            onCancel={() => {
                setPreviewVisible(false);
                setPreviewImage('');
            }}
        >
            <img alt="example" style={{width: '100%'}} src={previewImage}/>
        </Modal>
    );
};

export default PreviewImage;
