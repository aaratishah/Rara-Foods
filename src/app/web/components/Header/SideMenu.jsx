import { Drawer, Button, Radio, Space, Row, Col } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { useState } from 'react';
import logoImage from 'image/logo.png';
import { Link } from 'react-router-dom';
import routeURL from 'config/routeURL';


const appLinkStyle = {
  padding: 12,
  backgroundColor: '#EEEEEE',
  borderRadius: 500,
  fontSize: 14,
  color: '#000',
  textDecoration: 'none',
};

export const AndroidLink = () => <a target="_blank" href={process.env.REACT_APP_ANDROID_APP_LINK} style={appLinkStyle} >
  <svg style={{
    marginRight: 8
  }} width={16} height={16} aria-hidden="true" focusable="false" viewBox="0 0 24 24"
       className="cm e6 c7 c8">
    <g>
      <path
        d="M15.297 3.415l-.233.343c1.77.804 2.97 2.326 2.97 4.069H6.341c0-1.743 1.199-3.265 2.97-4.069l-.234-.343-.233-.338-.52-.761a.2.2 0 01.058-.282.214.214 0 01.29.057l.793 1.157.238.348a7.035 7.035 0 012.484-.444c.888 0 1.729.16 2.484.444l1.032-1.505a.21.21 0 01.288-.057.198.198 0 01.059.282l-.52.76-.234.339zm-1.23 2.176c0 .337.28.61.626.61a.618.618 0 00.627-.61.617.617 0 00-.627-.61.617.617 0 00-.627.61zm-4.385.61a.618.618 0 01-.627-.61c0-.338.28-.61.627-.61.346 0 .627.272.627.61 0 .337-.28.61-.627.61z"/>
      <path
        d="M6.342 8.639h11.692v8.942c0 .71-.592 1.288-1.322 1.288h-.956c.033.107.052.22.052.338v2.574c0 .673-.562 1.22-1.254 1.22s-1.253-.547-1.253-1.22v-2.574c0-.119.018-.23.05-.338h-2.327c.032.107.051.22.051.338v2.574c0 .673-.562 1.22-1.253 1.22-.692 0-1.254-.547-1.254-1.22v-2.574c0-.119.018-.23.05-.338h-.953c-.73 0-1.323-.578-1.323-1.288V8.639zm-2.089 0C3.561 8.639 3 9.185 3 9.858v5.216c0 .673.56 1.22 1.253 1.22.692 0 1.253-.547 1.253-1.22V9.858c0-.673-.561-1.219-1.253-1.219zM18.87 9.858c0-.673.56-1.219 1.253-1.219.691 0 1.252.546 1.252 1.219v5.216c0 .673-.56 1.22-1.252 1.22-.693 0-1.254-.547-1.254-1.22V9.858z"/>
    </g>
  </svg>

  Android
</a>;

export const AppleLink = () => <a target="_blank" href={process.env.REACT_APP_APPLE_APP_LINK}  style={appLinkStyle} >
  <svg width={16} height={16} aria-hidden="true" focusable="false" viewBox="0 0 24 24"
       className="cm e6 c7 c8">
    <path d="M14.268 4.231c.649-.838 1.14-2.022.963-3.231-1.061.074-2.301.752-3.025 1.637-.66.802-1.201 1.994-.99 3.152 1.16.036 2.357-.66 3.052-1.558zM20 15.602c-.464 1.035-.688 1.497-1.285 2.413-.834 1.28-2.01 2.872-3.47 2.884-1.294.014-1.628-.849-3.385-.838-1.758.01-2.124.854-3.421.841-1.458-.013-2.572-1.45-3.406-2.729-2.334-3.574-2.58-7.769-1.14-10C4.916 6.587 6.53 5.66 8.048 5.66c1.543 0 2.515.852 3.793.852 1.24 0 1.995-.854 3.78-.854 1.352 0 2.784.74 3.803 2.018-3.34 1.842-2.8 6.642.576 7.925z"/>
  </svg> iPhone
</a>

const SideMenu = () => {
  const [visible, setVisible] = useState(false);

  const toogle = () => {
    setVisible(value => !value);
  };


    return (
      <>
        <span style={{
          cursor: 'pointer'
        }} onClick={toogle}>
          <svg width='20px' height='20px' aria-hidden="true" focusable="false" viewBox="0 0 20 20" className="c5 c6 c7 c8"><path
          d="M19.167 3.333H.833v2.5h18.334v-2.5zm0 5.834H.833v2.5h18.334v-2.5zM.833 15h18.334v2.5H.833V15z"/></svg>
        </span>
        <Drawer
          width={300}
          placement={'left'}
          closable={false}
          onClose={()=>setVisible(false)}
          visible={visible}
          key={"right"}
        >
          <Row>
           <div style={{
             width: '100%',
             backgroundColor: '#000',
             color: '#fff',
             padding: '12px 16px',
             textAlign: 'center',
             fontSize: 18,
             cursor: 'pointer',
             fontWeight: 600,
           }}>
              Sign in
           </div>
          </Row>

          <Row style={{
            marginTop: 24
          }}>
            <Row style={{width: '100%'}}>
              <Col xs={24}>
                <Link to={routeURL?.web?.restaurant_request()}  style={{
                  color: '#000',
                  fontWeight: 600,
                  fontSize: 15,
                }}>Add your restaurant</Link>
              </Col>
            </Row >
            <Row style={{width: '100%', marginTop: 12}}>
              <Col xs={24}>
              <Link to={routeURL?.web?.rider_request()}  style={{
                color: '#000',
                fontWeight: 600,
                fontSize: 15,
              }} >Sign up as rider</Link>
              </Col>
            </Row>
            {/*<Row>*/}
            {/*  <Button type='ghost'>Create a business account</Button>*/}
            {/*</Row>*/}
          </Row>

          <Row style={{
            position: 'absolute',
            bottom: 32,
          }}>
            <Row align='middle'>
              <Col xs={6}>
                <img style={{
                  marginRight: 8,
                  marginLeft: 8,
                  width: '100%'
                }} src={logoImage} alt={'logo RaraFoods rara foods'} />
              </Col>

              <Col offset={2} xs={24-8}>
                <span style={{
                  fontWeight: 600,
                  fontSize: 16,
                  paddingRight: 8
                }}>
                  There's more to love in the app.
                </span>
              </Col>
            </Row >
            <Row gutter={8} style={{
              marginTop: 16
            }}>
           <Col><AppleLink /></Col>
            <Col>
              <AndroidLink />
            </Col>
            </Row>
          </Row>
        </Drawer>
      </>
    );
}

export default SideMenu;
