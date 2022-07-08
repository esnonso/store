import React from "react";

import "./MobileToggle.css";

const MobileToggle = (props) => {
  return (
    <div className="mobile-toggle" onClick={props.showSidebar}>
      <span className="mobile-toggle__bar" />
      <span className="mobile-toggle__bar" />
      <span className="mobile-toggle__bar" />
    </div>
  );
};

export default MobileToggle;
