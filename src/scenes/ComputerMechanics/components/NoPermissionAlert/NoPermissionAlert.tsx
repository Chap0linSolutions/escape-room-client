import React from "react";
import noPermission from "../../../../assets/PCMechanics/no-permission.png";

interface NoPermissionAlertProps{
  toggleShowNoPermission: () => void;
}

export function NoPermissionAlert({ toggleShowNoPermission }: NoPermissionAlertProps) {
  return(
    <div className="noPermission">
      <img src={noPermission}/>
      <div className="closeButton" onClick={toggleShowNoPermission} />
    </div>
  );
}