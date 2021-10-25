import React from "react";
import { AppleFilled } from "@ant-design/icons";

const AppleLogin = () => {
  return (
    <div className="auth-login apple-login">
      <AppleFilled style={{ fontSize: "24px", verticalAlign: 3 }} />
      <span style={{ marginLeft: "8px" }}>Apple Id</span>
    </div>
  );
};

export default AppleLogin;
