import { PRIVILEGE_ADMIN, PRIVILEGE_RESTAURANT } from 'config/index';

const role = {
  searchRider: [PRIVILEGE_ADMIN],
  restaurantEarning: [PRIVILEGE_RESTAURANT],
  companyEarning: [PRIVILEGE_ADMIN],
}
export const canIAccess = (module, jwtRole) => {
  return role[module] && ((typeof role[module] === 'boolean' && role[module] )|| role[module].includes(jwtRole))
}
export default role;
