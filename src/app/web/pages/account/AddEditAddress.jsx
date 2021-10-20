import { AutoComplete, Button, Col, Form, Input, InputNumber, Modal, Row, Spin } from 'antd';
import MapViewer from 'app/dashboard/components/MapViewer';
import api from 'app/web/api';
import { notificationSuccess } from 'app/web/components/notification';
import { mapCenterDefault } from 'config';
import React, { useEffect, useState } from 'react';
import { handleError } from 'services/util';
import Geocode from 'react-geocode';
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';

const apiKey = process.env.REACT_APP_GOOGLE_MAP_KEY;

// Geocode.setApiKey(apiKey);
let isMapChange = true;
export default function AddEditAddress({
  item,
  preview,
  onCancel,
  fetchAddress,
}) {
  const {
    placesService,
    placePredictions,
    getPlacePredictions,
  } = usePlacesService({
    apiKey
  });
  const [searchText, setSearchText] = useState("");
  const [options, setOptions] = useState([]);

  const [location, setLocation] = useState(mapCenterDefault);
  const [spinning, setSpinning] = useState(false);
  const [form] = Form.useForm();

  const onSaveForm = (value) => {
    // validate here
    if (true) {
      var jsonData = {
        ...value,
        geo: location,
      };
      if (item) jsonData._id = item._id;
      setSpinning(true);
      api.deliveryAddress
        .save(jsonData)
        .then(({ message }) => {
          form.resetFields();
          notificationSuccess(message);
          onCancel();
          fetchAddress();
        })
        .catch(handleError)
        .finally(() => setSpinning(false));
    }
  };

  const fillForm = (data) => {
    // _id: data._id,
    // gps: data.gps,
    // activePhoto: data.activePhoto,
    form.setFieldsValue({
      addressline2: data.addressline2,
      label: data.label,
      phone: data.phone,
      // nearbyLocation: data.nearbyLocation,
      city: data.address && data.address.city,
      street: data.address && data.address.street,
      state: data.address && data.address.state,
      zipCode: data.address && data.address.zipCode,
    });
    if (data.gps) setLocation(data.gps);
  };

  useEffect(() => {
    // fetch place details for the first element in placePredictions array
    if (placePredictions.length) {
      setOptions(
        placePredictions?.map(prediction => ({
          key: prediction?.place_id,
          label: prediction?.description,
          value: prediction?.description,
        })),
      );
    } else if (placePredictions.length === 0 && options.length > 0) setOptions([])
  }, [placePredictions]);

  useEffect(() => {
    if (item) fillForm(item);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  const onLocChange = (latitude, longitude) => {
    Geocode.fromLatLng(latitude, longitude).then(
      (response) => {
        const street = response.results[0].formatted_address;
        let city, state, country, zipCode;
        for (
          let i = 0;
          i < response.results[0].address_components.length;
          i++
        ) {
          for (
            let j = 0;
            j < response.results[0].address_components[i].types.length;
            j++
          ) {
            switch (response.results[0].address_components[i].types[j]) {
              case 'locality':
                city = response.results[0].address_components[i].long_name;
                break;
              case 'administrative_area_level_1':
                state = response.results[0].address_components[i].long_name;
                break;
              case 'country':
                country = response.results[0].address_components[i].long_name;
                break;
              case 'postal_code':
                zipCode =
                  response.results[0].address_components[i].long_name;
                break;

              default:
                break;
            }
          }
        }
        form.setFieldsValue({
          street,
          city,
          state,
          country,
          zipCode,
        });
      },
      (error) => {
        console.error(error);
      }
    );

    setLocation({
      latitude,
      longitude,
    });
  };

  const onSearch = (searchText) => {
    setSearchText(searchText || "")
    getPlacePredictions({
      input: searchText || "",
    });

  };

  const onSelect = (data, option) => {
    // setValue(option);
    if (placePredictions.length) {
      const selectedPrediction = placePredictions?.find(eachNode => eachNode?.place_id === option?.key);
      if(selectedPrediction) {
        placesService?.getDetails(
          {
            placeId: placePredictions[0].place_id,
          },
          (placeDetails) => {
            const lat = placeDetails?.geometry?.location?.lat;
            const lng = placeDetails?.geometry?.location?.lng;
            if(lat && lng) {
              onLocChange(lat(),lng())
            }
          }
        );
      }
    }

  };

  return (
    <Modal
      className="food-detail-modal"
      title={item ? 'Edit Delivery Address' : 'Add Delivery Address'}
      style={{ top: 20 }}
      visible={preview}
      onCancel={() => {
        onCancel();
        form.resetFields();
      }}
      footer={null}
    >
      <>
        <Row key={options.length} style={{width: '100%'}} justify="center">
          <Col xs={24} lg={24}>
            <br/>
            <AutoComplete
              notFoundContent={searchText && <Spin />}
              autoFocus
              // value={value}
              options={options}
              style={{width: '100%'}}
              onSelect={onSelect}
              onSearch={onSearch}
              searchValue={searchText}
              placeholder="Search location..."
            />
          </Col>
        </Row>

        <Row style={{ height: 200, marginBottom: 20, marginTop: 20 }}>

          <MapViewer
            activeMarker={{
              ...location,
              name: form && form.getFieldValue('label'),
            }}
            markerAppendable
            height={400}
            onMapClick={onLocChange}
            options={{
              zoom: 7,
              disableDefaultUI: true,
            }}
          />
        </Row>
        <Form
          wrapperCol={{
            offset: 1,
          }}
          // {...layout}
          // ref={formRef}
          form={form}
          style={{
            padding: 16,
          }}
          layout="horizontal"
          name="control-ref"
          onFinish={onSaveForm}
          requiredMark={true}
          scrollToFirstError
        >
          {/*<SearchPlace />*/}
          <Form.Item
            style={{
              width: '100%',
              marginBottom: 4,
              marginTop: 16,
            }}
            label="Label"
            name="label"
          >
            <Input placeholder="Say Home Address" />
          </Form.Item>
          {/*<Form.Item*/}
          {/*  style={{*/}
          {/*    width: '100%',*/}
          {/*    marginBottom: 8,*/}
          {/*  }}*/}
          {/*  label="Phone number"*/}
          {/*  name="phone"*/}
          {/*  rules={[*/}
          {/*    {*/}
          {/*      validator: (rule, telNo) => {*/}
          {/*        if (!telNo) return Promise.resolve();*/}
          {/*        else if (telNo.length < 5 || telNo.length > 12)*/}
          {/*          return Promise.reject('Invalid Phone number');*/}
          {/*        const re = /^[+]?[\s./0-9]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/g;*/}
          {/*        if (re.test(telNo)) {*/}
          {/*          return Promise.resolve();*/}
          {/*        }*/}
          {/*        return Promise.reject('Invalid Phone number');*/}
          {/*      },*/}
          {/*    },*/}
          {/*  ]}*/}
          {/*>*/}
          {/*  <Input />*/}
          {/*</Form.Item>*/}
          <Form.Item
            style={{
              width: '100%',
              marginBottom: 4,
            }}
            label="Street Address"
            name="street"
            rules={[
              {
                required: true,
                message: 'Please input Street Address',
              },
            ]}
          >
            <Input onBlur={({ target: {value} })=>{
              if(value && value.length > 4){
                Geocode.fromAddress(value).then(
                  (response) => {
                    const { lat, lng } = response.results[0].geometry.location;
                    setLocation({ latitude: lat, longitude: lng })
                    if(isMapChange) {
                      isMapChange = false;
                      onLocChange(lat, lng);
                    }
                  },
                  (error) => {
                    console.error(error);
                  }
                );
              }
            }} />
          </Form.Item>
          <Form.Item
            style={{
              width: '100%',
              marginBottom: 4,
            }}
            label="Address line 2"
            name="addressline2"
          >
            <Input />
          </Form.Item>

          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Form.Item
                style={{
                  width: '100%',
                  marginBottom: 4,
                }}
                label="City"
                name="city"
                rules={[
                  {
                    required: true,
                    message: 'Please input City Address',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
              <Form.Item
                style={{
                  width: '100%',
                  marginBottom: 4,
                }}
                label="State"
                name="state"
                rules={[
                  {
                    required: true,
                    message: 'Please input State Address',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={10}>
              <Form.Item
                style={{
                  width: '100%',
                  marginBottom: 4,
                }}
                label="Zip Code"
                name="zipCode"
              >
                <InputNumber min={0} step={1} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button
              // onClick={() => form.submit()}
              htmlType="submit"
              className="main-btn float-right"
            >
              Save
            </Button>
          </Form.Item>
        </Form>
      </>
    </Modal>
  );
}
