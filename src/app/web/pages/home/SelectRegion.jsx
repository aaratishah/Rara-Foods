import React, { useEffect, useState } from 'react';
import api from 'app/web/api';
import { handleError } from 'services/util';
import { Col, Modal, Row, Select, Spin, Typography } from 'antd';
import { JwtService } from 'services/jwtServiceClient';

const SelectRegion = ({ fetchPackage }) => {
  const [visible, setVisible] = useState(false);
  const [regions, setRegions] = useState([]);
  const [regionSpinning, setRegionSpinning] = useState(false);
  useEffect(() => {
    if (!JwtService.getRegion()) {
      setTimeout(()=>setVisible(true), 2000)
    } else {
      setVisible(false);
    }
  }, [JwtService.getRegion()]);

  useEffect(() => {
    setRegionSpinning(true);
    api.region
      .readAll()
      .then(({ data }) => {
        if(Array.isArray(data) && data.length > 0) {
          const rndInt = Math.floor(Math.random() * (data.length))
          JwtService.assignRegion(data[rndInt]?._id);
        fetchPackage();

        }
      })
      .catch(handleError)
      .finally(() => setRegionSpinning(false));
  }, []);

  return regionSpinning && <Row style={{ minHeight: 200 }} justify='center' align='middle'>
    <Col>
      <Spin/>
    </Col>
  </Row> ;
// : (
//     <Modal
//       title={<h6>Welcome to RARA Foods</h6>}
//       closable={false}
//       width={400} style={{
//       height: 500,
//       width: 300
//     }} visible={false} footer={null} maskClosable={false} keyboard={false}>
//       <Col xs={24}>
//         <Typography
//           style={{
//             marginBottom: 8,
//             color: '#272C34',
//           }}
//         >
//           Please select your Nearest Region.
//         </Typography>

//         <Select
//           style={{
//             width: '90%',
//           }}
//           size="large"
//           value={
//             regions && regions.length > 0
//               ? JwtService.getRegion()
//               : undefined
//           }
//           onChange={(value) => {
//             JwtService.assignRegion(value);
//             fetchPackage();
//           }}
//           showSearch
//           placeholder="Select region"
//           optionFilterProp="children"
//           filterOption={(input, option) =>
//             option.children
//               .toLowerCase()
//               .indexOf(input.toLowerCase()) >= 0
//           }
//         >
//           {regions &&
//           regions.length > 0 &&
//           regions.map((each) => (
//             <Select.Option value={each._id}>
//               {each.name}
//             </Select.Option>
//           ))}
//         </Select>

//         <Typography
//           className='text-muted'
//           style={{
//             marginTop: 16,
//             marginBottom: 8,
//             color: '#272C34',
//           }}
//         >
//          Your favorite food delivered with RARA
//         </Typography>
//       </Col>
//     </Modal>
//   );
};

export default SelectRegion;
