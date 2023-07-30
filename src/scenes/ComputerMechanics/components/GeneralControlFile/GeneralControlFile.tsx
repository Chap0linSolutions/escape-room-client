import React, { useState } from "react";
import alertIcon from "../../../../assets/PCMechanics/alert-icon.png";
import generalControlImg from "../../../../assets/PCMechanics/general-control.png";

interface GeneralControlFileProps {
  close: () => void;
}

export function GeneralControlFile({ close }: GeneralControlFileProps) {
  const [temperature, setTemperature] = useState(22);
  const [errorWindow, setErrorWindow] = useState(false);

  const closeErrorWindow = () => {
    setErrorWindow(false);
  }

  const increaseTemperature = () => {
    let temp = temperature
    if (temp < 50) setTemperature(temp+=1);
  }

  const decreaseTemperature = () => {
    let temp = temperature
    if (temp > 0) setTemperature(temp-=1);
  }

  return(
    <div className="generalControlExe">
      <div className="closeGeneralControl" onClick={close} />
      <img src={generalControlImg} className="exeFileImg" />
      <div className="decreaseTemperature" onClick={decreaseTemperature}/>
      <div className="temperatureValue">{temperature.toString()}</div>
      <div className="increaseTemperature" onClick={increaseTemperature}/>
      <div className="temperatureBar" style={{height: `${(temperature*63)/25}px`}}/>

      { errorWindow &&
        <div className="errorWindow">
          <div className="containerMsg">
            <img src={alertIcon} className="alertIcon" />
            <p className="errorMsg">Ocorreu um erro inesperado!</p>
          </div>
          <div className="cancelButton" onClick={closeErrorWindow}>Fechar</div>
        </div>
      }
      
    </div>
  );
}