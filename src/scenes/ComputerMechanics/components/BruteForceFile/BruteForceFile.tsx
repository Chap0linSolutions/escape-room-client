import React, { useEffect, useState } from "react";
import { Matrix } from "../Matrix/Matrix";
import exeFileImg from "../../../../assets/PCMechanics/tela-matrix.png";
import warningtIcon from "../../../../assets/PCMechanics/warning-icon.png";
import { delay } from "../../../../functions/Timers";

interface BruteForceFileProps {
  close: () => void;
}

export function BruteForceFile({ close }: BruteForceFileProps) {
  const [loadingBar, setLoadingBar] = useState(Array(14).fill(false));
  const [currentRequest, setCurrentRequest] = useState(0);
  const [warningWindow, setWarningWindow] = useState(false);

  useEffect( () => {
    const start = async () => {
      setLoadingBar(Array(14).fill(false));
      setCurrentRequest(0);
      for (let i =0 ; i < 5; i+=1){
        await delay();
        setLoadingBar(t => {
          const a = [...t];
          a[i] = true;
          return a;
        });
        setCurrentRequest((i+1)*20);
      }
      await delay(5000);
      setWarningWindow(true);
    }
    start();
  }, []);

  const closeWarningWindow = () => {
    setWarningWindow(false);
  }

  return(
    <div className="exeFile">
      <div className="closeExeFile" onClick={close} />
      <img src={exeFileImg} className="exeFileImg" />
      <div className="matrix-container" id="matrix">
        <Matrix />
      </div>

      <div className="loadingWindow">
        <p className="loadingTitle">Carregando</p>
        <p className="loadingStatus">Foram criadas {currentRequest} requisições...</p>
        <div className="loadingStatusContainer">
          {
            loadingBar.map((item, index) => {
              return (
                <div className="loadingItem" style={{background: item ? '#6DBB51' : '#B0B0B0'}} key={index} />
              );
            })
          }
        </div>
        <div className="cancelButton" onClick={close}>Cancelar</div>
      </div>

      { warningWindow && 
        <div className="warningWindow">
          <div className="containerMsg">
            <img src={warningtIcon} className="alertIcon" />
            <p className="errorMsg">Limite de requisições atingido para este computador!</p>
          </div>
          <div className="cancelButton" onClick={closeWarningWindow}>Fechar</div>
        </div>
      }
    </div>
  );
}