import { AutoComplete, Col, Form, Input, Row, Spin } from "antd";
import React, { useEffect, useState } from "react";
import MapViewer from "app/dashboard/components/MapViewer";
import Geocode from "react-geocode";
import "./index.css";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";

const apiKey = process.env.REACT_APP_GOOGLE_MAP_KEY;

// Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAP_KEY);
export default function GuestShippingAddress({
  isDisabled,
  location,
  locationForm,
  setLocation,
}) {
  const { placesService, placePredictions, getPlacePredictions } =
    usePlacesService({
      apiKey,
    });

  const [searchText, setSearchText] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    console.log(placePredictions, ".....");
    // fetch place details for the first element in placePredictions array
    if (placePredictions.length) {
      console.log(
        "place ",
        placePredictions.map((each) => each.description)
      );
      setOptions(
        placePredictions?.map((prediction) => ({
          key: prediction?.place_id,
          label: prediction?.description,
          value: prediction?.description,
        }))
      );
    } else if (placePredictions.length === 0 && options.length > 0)
      setOptions([]);
  }, [placePredictions]);

  const onLocChange = (latitude, longitude) => {
    Geocode.fromLatLng(latitude, longitude).then(
      (response) => {
        const street = response.results[0].formatted_address;
        let city, state, country;
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
              case "locality":
                city = response.results[0].address_components[i].long_name;
                break;
              case "administrative_area_level_1":
                state = response.results[0].address_components[i].long_name;
                break;
              case "country":
                country = response.results[0].address_components[i].long_name;
                break;
              default:
                break;
            }
          }
        }
        locationForm.setFieldsValue({
          street,
          city,
          state,
          country,
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
    setSearchText(searchText || "");
    getPlacePredictions({
      input: searchText || "",
    });
  };
  console.log("placePredictions.length", placePredictions);
  const onSelect = (data, option) => {
    // setValue(option);
    if (placePredictions.length) {
      const selectedPrediction = placePredictions?.find(
        (eachNode) => eachNode?.place_id === option?.key
      );
      if (selectedPrediction) {
        placesService?.getDetails(
          {
            placeId: placePredictions[0].place_id,
          },
          (placeDetails) => {
            const lat = placeDetails?.geometry?.location?.lat;
            const lng = placeDetails?.geometry?.location?.lng;
            if (lat && lng) {
              onLocChange(lat(), lng());
            }
          }
        );
      }
    }
  };

  return (
    <Row
      style={{
        width: "100%",
      }}
      className="shipping-address-guest"
      // gutter={[16, 16]}
    >
      <>
        <Row
          style={{
            width: "100%",
            marginTop: 32,
          }}
          //   gutter={[16, 16]}
        >
          <Col
            xs={24}
            lg={12}
            style={{
              width: "100%",
              maxHeight: "100%",
              height: 400,
              marginBottom: 20,
            }}
          >
            {isDisabled ? (
              <Spin
                spinning={isDisabled}
                indicator={null}
                style={{
                  width: "100%",
                  maxHeight: "100%",
                  height: 400,
                  marginBottom: 20,
                }}
              >
                <MapViewer
                  activeMarker={{
                    ...location,
                    name: "Restaurant Address",
                  }}
                  markerAppendable
                  height={400}
                  onMapClick={onLocChange}
                  options={{
                    zoom: 7,
                    disableDefaultUI: true,
                  }}
                />
              </Spin>
            ) : (
              <MapViewer
                activeMarker={{
                  ...location,
                  name: "Restaurant Address",
                }}
                markerAppendable
                height={400}
                onMapClick={onLocChange}
                options={{
                  zoom: 8,
                  disableDefaultUI: true,
                }}
              />
            )}
          </Col>
        </Row>
      </>
    </Row>
  );
}
