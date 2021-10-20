import React, { useEffect, useState } from 'react';
import { AutoComplete, Col, Row, Spin } from 'antd';
import MapViewer from 'app/dashboard/components/MapViewer';
import Geocode from 'react-geocode';
import { mapCenterDefault } from 'config';
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';

const apiKey = process.env.REACT_APP_GOOGLE_MAP_KEY;
const PlacePredict = () => {
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
        // form.setFieldsValue({
        //   street,
        //   city,
        //   state,
        //   country,
        //   zipCode,
        // });
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
          activeMarker={location}
          markerAppendable
          height={400}
          onMapClick={onLocChange}
          options={{
            zoom: 7,
            disableDefaultUI: true,
          }}
        />
      </Row>
    </>
  );
};

export default PlacePredict;
