/* eslint-disable import/no-anonymous-default-export */
import commissionConfig from "./commission/route";
import fareConfig from "./fare/route";
import vehicleTypeConfig from "./vehicle_type/route";
import settingsConfig from "./settings/route";

export default [
  commissionConfig,
  fareConfig,
  vehicleTypeConfig,
  settingsConfig,
];
