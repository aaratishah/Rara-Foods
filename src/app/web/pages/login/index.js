import ClientLoginLayout from "app/web/layout/ClientLoginLayout";
import { UserLoginContextProvider, UserProvider } from "context/";
import AccountModal from "../../components/Account/";

import "./index.css";

const ClientLogin = (props) => {
  return (
    <UserLoginContextProvider>
      <ClientLoginLayout>
        <AccountModal history={props.history} />
      </ClientLoginLayout>
    </UserLoginContextProvider>
  );
};

const Application = (props) => (
  <UserProvider>
    <ClientLogin {...props} />
  </UserProvider>
);

export default Application;
