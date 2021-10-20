import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';
import routeURL from 'config/routeURL';
import { SearchOutlined } from '@ant-design/icons';
import $ from 'jquery';

export default function NoSearchQuery() {
  return (
    <Result
      status="404"
      title="Please search Something..."
      extra={[
        <Link to={routeURL.web.home()}>
          <Button type="primary">Back Home</Button>
        </Link>,
        <Button
          onClick={() => {
            $('.search-wrapper').addClass('open');
          }}
          type="primary"
        >
          Search
        </Button>,
      ]}
    />
  );
}
