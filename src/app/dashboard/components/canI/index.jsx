import React from 'react';
import { JwtService } from 'services';
import role from 'config/role';

const CanI = ({access, children}) => {
  const clientRole = JwtService.getUserRole();
  const canIAccess = role[access] && ((typeof role[access] === 'boolean' && role[access] )|| role[access].includes(clientRole))

  return canIAccess ? <>{children}</> : <></>;
};

export default CanI;
