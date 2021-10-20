import { SearchOutlined } from '@ant-design/icons';
import { Col, Row, Select, Slider, Typography, Form, Button } from 'antd';
import apiCMS from 'app/dashboard/api';
import { useEffect, useState } from 'react';
import { handleError } from 'services/util';

export default function SearchOption({ query, onSearch }) {
  const [dietaryplans, setDietaryPlans] = useState([]);
  useEffect(() => {
    apiCMS.dietary_plan
      .readAll()
      .then(({ data }) => {
        setDietaryPlans(data);
      })
      .catch(handleError);
  }, []);
  return (
    <Form layout="vertical">
      <Row
        gutter={[16, 16]}
        style={
          {
            // paddingTop: 90,
          }
        }
      >
        <Col xs={24} md={8}>
          <Form.Item
            label="Max. Price"
            style={{
              padding: '0px 25px',
              marginBottom: 0,
            }}
          >
            <Slider
              onChange={(value) => onSearch('price', parseInt(value / 33) + 1)}
              tooltipVisible={false}
              step={33}
              defaultValue={Math.ceil(query.price - 1) * 33.33 || 100}
              marks={{
                0: '$',
                33: '$$',
                66: '$$$',
                100: {
                  label: <strong>$$$$</strong>,
                },
              }}
            />
          </Form.Item>
        </Col>

        <Col xs={24} md={8}>
          <Form.Item
            style={{
              marginBottom: 0,
            }}
            label="Dietary"
          >
            <Select
              onChange={(value) => onSearch('dietary', value)}
              defaultValue={query.dietary || 'none'}
              style={{
                width: '100%',
              }}
            >
              <Select.Option value="none">
                <strong>None</strong>
              </Select.Option>

              {dietaryplans.map((each) => (
                <Select.Option value={each._id}>{each.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            style={{
              marginBottom: 0,
            }}
            label="Popularity"
          >
            <Select
              onChange={(value) => onSearch('popularity', value)}
              defaultValue={query.popularity || 'none'}
              style={{
                width: '100%',
              }}
            >
              <Select.Option value="none">
                <strong>None</strong>
              </Select.Option>

              {[
                'Less Popular',
                'Somewhat Popular',
                'Popular',
                'Highly Popular',
                'Extremely Popular',
              ].map((each, idx) => (
                <Select.Option value={idx + 1}>{each}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
