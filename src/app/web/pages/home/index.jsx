import { Select, Row, Col, Typography, Spin, message } from 'antd';
import api from 'app/web/api';
import Container from 'app/web/components/Container';
import { notificationError } from 'app/web/components/notification';
// import HeroImage from 'image/banner/home_bg.png';
import { useEffect, useState } from 'react';
import { geolocated } from 'react-geolocated';
import { JwtService } from 'services/jwtServiceClient';
import { handleError } from 'services/util';
import '../../layout/style.css';
import Category from './Category';
import FoodCategoryCarousel from './FoodCategoryCarousel';
import FoodCategoryItem from './FoodCategoryItem';
import FoodProduct from './FoodProduct';
import { getSVGImage, svgImage } from './hero_image';
import './index.css';
import './dummy.css';
import AllRestaurant from './AllRestaurant'
import RestaurantByLocation from './RestaurantByLocation';
import SelectRegion from 'app/web/pages/home/SelectRegion';
import HeroImage from 'image/demo/hero-002.jpg';
import PromoteBusiness from 'app/web/pages/home/PromoteBusiness';

function randomRange(myMin, myMax) {
  return Math.floor(
    Math.random() * (Math.ceil(myMax) - Math.floor(myMin) + 1) + myMin
  );
}
const heroImageIndex = randomRange(0, svgImage.length - 1);

const HeroSection = ({ fetchPackage }) => {
  const [regions, setRegions] = useState([]);
  const [regionSpinning, setRegionSpinning] = useState(false);

  useEffect(() => {
    setRegionSpinning(true);
    api.region
      .readAll()
      .then(({ data }) => {
        if(Array.isArray(data) && data.length > 0) {
          const selected = JwtService.getRegion();
          const isSelectedExist = data?.find(each => each._id?.toString() === selected?.toString());
          if(!isSelectedExist) {
            const rndInt = Math.floor(Math.random() * (data.length))
            JwtService.assignRegion(data[rndInt]?._id);
          }
        }
        setRegions(data);
      })
      .catch(handleError)
      .finally(() => setRegionSpinning(false));
  }, []);

  // return <div className="hero-section">
  //   <div className="hero-content-wrapper">
  //     <img src={HeroImage} alt="" />
  //       <div className="form-wrapper">
  //         <div className="container">
  //           <h1>Your favorite food, delivered with RARA</h1>
  //           <form action="" className="search-form form-inline">
  //             <input type="search" className="form-control" placeholder="Enter delivery address" />
  //               <button type="submit" className="btn btn-lg btn-dark">Find Food</button>
  //           </form>
  //         </div>
  //       </div>
  //   </div>
  // </div>

  return (
    <div
      className="hero-section"
      style={{
        backgroundColor: '#FFF',
      }}
    >
      {!!JwtService.getRegion() || <SelectRegion fetchPackage={fetchPackage}/>}
      <div className="hero-content-wrapper">
        <Container
          outerStyle={{
            width: '100%',
            height: '100%',
          }}
        >
          <Row
            style={{
              width: '100%',
              height: '100%',
            }}
          >
            <Col
              xs={24}
              md={12}
              lg={12}
              style={{
                height: '100%',
              }}
            >
              <Row
                style={{
                  height: '100%',
                }}
                justify="center"
                align="middle"
              >
                <Col xs={24}>
                  <h1
                    style={{
                      color: '#424242',
                      fontSize: 'min(6vw, 48px)',
                    }}
                  >
                    Your favorite food, delivered with RARA
                  </h1>
                  <Col xs={24} sm={20} md={18} lg={16}>
                    <Typography
                      style={{
                        marginTop: 16,
                        marginBottom: 8,
                        color: '#272C34',
                      }}
                    >
                      Select your nearest region
                    </Typography>

                    <Select
                      style={{
                        width: '90%',
                      }}
                      size="large"
                      value={
                        regions && regions.length > 0
                          ? JwtService.getRegion()
                          : undefined
                      }
                      onChange={(value) => {
                        JwtService.assignRegion(value);
                        fetchPackage();
                      }}
                      showSearch
                      placeholder="Select region"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {regions &&
                        regions.length > 0 &&
                        regions.map((each) => (
                          <Select.Option value={each._id}>
                            {each.name}
                          </Select.Option>
                        ))}
                    </Select>
                  </Col>
                </Col>
              </Row>
            </Col>
            <Col xs={0} md={12} lg={12}>
              <Row
                style={{
                  width: '100%',
                  height: '100%',
                }}
                justify="end"
                align="bottom"
              >
                <Col
                  style={{
                    scale: 'scaleXY(1.5)',
                  }}
                >
                  {getSVGImage(heroImageIndex)}
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>

      {/* <form action className="search-form form-inline">
						<input
							type="search"
							className="form-control"
							placeholder="Enter delivery address"
						/>
						<button type="submit" className="btn btn-lg btn-dark">
							Find Food
						</button>
					</form> */}
    </div>
  );
};
let promoIndex = 0;

function HomePage({ isGeolocationAvailable, coords, location }) {
  const [packages, setPackages] = useState([]);
  const [spinning, setSpinning] = useState(false);
  const [foodCategory, setFoodCategory] = useState([]);
  useEffect(() => {
    setSpinning(true);
    api.restaurant_package
      .readAll()
      .then(({ data }) => {
        console.log('data',data);
        // promoIndex = data?.length >= 2 ? Math.floor(data?.length/2) :
        if(data.length > 1) {
          const tempData = [...data];
          tempData.splice(1,0,1);
          setPackages(tempData);
        }else {
          setPackages([0]);
        }
      })
      .catch(handleError);
    api.food_category
      .readAll()
      .then(({ data }) => setFoodCategory(data))
      .catch(handleError)
      .finally(() => setSpinning(false));
  }, []);

  const fetchPackage = () => {
    setSpinning(true);
    api.restaurant_package
      .readAll()
      .then(({ data }) => setPackages(data))
      .catch(handleError)
      .finally(() => setSpinning(false));
  };
  console.log('promoo ', packages);
  return (
    <>
      <HeroSection fetchPackage={fetchPackage} />
      {spinning ? (
        <Row
          style={{
            height: 300,
          }}
          justify="center"
          align="middle"
        >
          <Col>
            <Spin />
          </Col>
        </Row>
      ) : (
        packages?.map((each,index) => {
          console.log('packagessss ', each, index, promoIndex)
          //
          if(!each?.restaurants) return <PromoteBusiness />;
          return (
            <>
              <Category items={each.restaurants} title={each.name}>
                {(item, key) => (
                  <FoodProduct
                    location={isGeolocationAvailable && coords}
                    item={item}
                    itemKey={key}
                  />
                )}
              </Category>
              {/*<hr />*/}
            </>
          );
        })
      )}
      <AllRestaurant location={location} />
      <RestaurantByLocation />
      <hr />

      <FoodCategoryCarousel
        items={foodCategory}
        // title="Pizza Delivery in San Francisco Bay Area"
      >
        {(item, key) => <FoodCategoryItem item={item} key={key} />}
      </FoodCategoryCarousel>
    </>
  );
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 10000,
})(HomePage);
