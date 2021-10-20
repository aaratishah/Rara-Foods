import React from 'react';
import MultiMarkerMap from "app/dashboard/components/MapViewer/MutiMarkerMap";
import CustomerName from 'app/dashboard/components/user/customer/CustomerName'
import moment from "moment";

const MapView = ({markers, center, handleCenter}) => {
    console.log('markers', markers)
    return (
        <div style={{
            width: '100%',
            height: 500
        }
        }>
            <MultiMarkerMap
                center={center}
                handleCenter={handleCenter}
                markerWindowUI={function (activeRide){
                return <div>

                    <p className='mt-0 mb-0'><label className="text-mute">Ride Requested By : </label> <CustomerName customer={activeRide?.customer}/> </p>
                    <p className='mt-0 mb-0'><label className="text-mute">Origin : </label> {activeRide?.origin?.address} </p>
                    <p className='mt-0 mb-0'><label className="text-mute">Destination : </label> {activeRide?.destination?.address} </p>
                    <p className='mt-0 mb-0'><label className="text-mute">Distance : </label> {activeRide?.distance}m </p>
                    <p className='mt-0 mb-0'><label className="text-mute">Fare : </label> {activeRide?.fareAmount} </p>
                    <p className='mt-0 mb-0'><label className="text-mute">Time : </label> {moment(activeRide?.createdDateTime).fromNow()} </p>
                </div>
                }
                }
                options={{
                    zoom: 14,
                }}
                markers={markers.map((data) => ({
                    ...data,
                    latitude: data?.origin?.latitude,
                    longitude: data?.origin?.longitude,
                    name: data?.origin?.address,
                    vehicleType: data?.vehicleType?.drivingMode,
                }))}
            />
        </div>
    );
};

export default MapView;
