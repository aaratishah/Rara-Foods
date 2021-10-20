import React, {useState} from 'react';
import MultiMarkerMap from "app/dashboard/components/MapViewer/MutiMarkerMap";
import CustomerName from 'app/dashboard/components/user/customer/CustomerName'
import RiderName from 'app/dashboard/components/user/rider/RiderName'
import moment from "moment";
import {mapCenterDefault} from "config";

const MapView = ({markers, center, handleCenter}) => {

    return (
        <div style={{
            width: '100%',
            height: 480
        }
        }>
            <MultiMarkerMap
                center={center}
                handleCenter={handleCenter}
                markerWindowUI={function (activeRide){
                return <div>

                    <p className='mt-0 mb-0'><label className="text-mute">Customer : </label> <CustomerName customer={activeRide?.customer}/> </p>
                    <p className='mt-0 mb-0'><label className="text-mute">Partner : </label> <RiderName rider={activeRide?.rider}/> </p>
                    <p className='mt-0 mb-0'><label className="text-mute">Ride Status : </label> {activeRide?.status} </p>
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
                    latitude: data?.rider?.location?.coordinates[1],
                    longitude: data?.rider?.location?.coordinates[0],
                    name: data?.origin?.address,
                    vehicleType: data?.vehicleType?.drivingMode,
                }))}
            />
        </div>
    );
};

export default MapView;
