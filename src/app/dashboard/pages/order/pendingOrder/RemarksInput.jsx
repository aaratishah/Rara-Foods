import { Row, Typography } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import api from 'app/dashboard/api';
import { notificationError } from 'app/dashboard/components/notification';
import './index.css'
export default function RemarksInput({ orderId, remarks }) {
  const onRemarksChange = (value) => {
    api.order
      .addRemark(orderId,value )
      .then(({ data }) => {

      })
      .catch((error) => {
        if (error && error.response && error.response.data) {
          if (typeof error.response.data.message === 'string')
            return notificationError(error.response.data.message);
          let errors = error.response.data;
          if (errors && errors.errors) errors = errors.errors;
          Object.keys(errors).map((key) => notificationError(errors[key]));
        }
      });
  };

  return (
    <Row style={{ width: '100%' }} gutter={[16, 16]}>
      <Row style={{ width: '100%' }}>
        <Typography.Title level={5}>Remarks</Typography.Title>
      </Row>
      <Row className='order-textarea' style={{ width: '100%' }}>
        <TextArea
        style={{
          width: "100%"
        }}
          defaultValue={remarks}
          onBlur={({ target: { value } }) => {
            if (value) onRemarksChange(value);
          }}
          placeholder="Remarks..."
          autoSize={{ minRows: 3, maxRows: 5 }}
        />
      </Row>
    </Row>
  );
}
