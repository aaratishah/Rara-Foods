// it returns the distance between two coordinates in meter.
export const getLocationDifference = (latitude1, longitude1, latitude2, longitude2) => {
  if (latitude1 == null || latitude2 == null || longitude1 == null || longitude2 == null) {
    return -1; // -1 means error
  }
  const p = 0.017453292519943295;
  const a = 0.5 - Math.cos((latitude2 - latitude1) * p) / 2 +
    Math.cos(latitude1 * p) * Math.cos(latitude2 * p) *
    (1 - Math.cos((longitude2 - longitude1) * p)) / 2;

  return 12742 * Math.asin(Math.sqrt(a));
};
export const getDistanceKM = (...args) => {
  const distanceInKM = getLocationDifference(...args);
  if (distanceInKM > 50) return '50+ K.M.';
  if (distanceInKM <= 1) {
    return parseInt(distanceInKM * 1000) + ' meter';
  }
  return distanceInKM.toFixed(1) + 'K.M.';
};

export const getDurationFromKM = (location1, location2) => {
  const distance = getLocationDifference(location1?.latitude, location1?.latitude, location2?.latitude, location2?.latitude) * 1000;
  if (distance < 0) return distance;
  let minimum = parseInt(distance / (60 * 20));
  let maximum = parseInt(distance / (60 * 10));
  if (minimum < 1) return '1 min';
  if (minimum > 60 && maximum > 60) {
    minimum = parseInt(minimum / 60);
    maximum = parseInt(maximum / 60);
    return `${minimum}-${maximum} hr`;
  }
  if (minimum < 60 && maximum > 60) {
    minimum = parseInt(minimum / 60);
    maximum = parseInt(maximum / 60);
    return `${minimum} min-${maximum} hr`;
  }
  return `${minimum}-${maximum} min`;
};
