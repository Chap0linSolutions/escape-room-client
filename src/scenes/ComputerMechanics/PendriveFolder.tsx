import React, { useState, useEffect } from 'react';
import ComputerFolder from '../../components/ComputerFolder/ComputerFolder';

import pendriveOpenedImg from "../../assets/PCMechanics/pendrive-folder.png";
import exeIcon from "../../assets/PCMechanics/console-icon-44.png";
import textIcon from "../../assets/PCMechanics/text-file-icon-44.png";
import generalControlImg from "../../assets/PCMechanics/GeneralControl.png";
import readmeFileImg from "../../assets/PCMechanics/readme-file.png";
import alertIcon from "../../assets/PCMechanics/alert-icon.png";


export function PendriveFolder() {
  const [showReadmeTxt, setShowReadmeTxt] = useState(false);
  const [generalControlFile, setGeneralControlFile] = useState(false);
  const [temperature, setTemperature] = useState(22);
  const [errorWindow, setErrorWindow] = useState(false);
  const [noPermissionAlert, setNoPermissionAlert] = useState(false);
  const [warningWindow, setWarningWindow] = useState(false);



  const toggleShowNoPermission = () => {
    setNoPermissionAlert((previousValue) => !previousValue);
  }

  const handleGeneralControlFile = () => {
    setGeneralControlFile((previousValue) => !previousValue);
  }

  const handleReadmeTxt = () => {
    setShowReadmeTxt((previousValue) => !previousValue);
  }

  const increaseTemperature = () => {
    let temp = temperature
    if (temp < 50) setTemperature(temp+=1);
  }

  const decreaseTemperature = () => {
    let temp = temperature
    if (temp > 0) setTemperature(temp-=1);
  }

  const closeErrorWindow = () => {
    setErrorWindow(false);
  }

  return(
    <div className="pendrive-window">
      {/* <div className="closePendriveFolder" onClick={toggleShowPendriveFolder} /> */}
      <div className="sidebar" onClick={toggleShowNoPermission} />
      <img src={pendriveOpenedImg} className="pendrive-window-img"/>
      <div className="foldersInsideWindow">
        <ComputerFolder 
          folderIcon={textIcon} 
          folderName={`README.txt`}
          onFolderClick={handleReadmeTxt}
          smallSize={true}
        />
        <ComputerFolder 
          folderIcon={exeIcon} 
          folderName={`General Control.exe`}
          onFolderClick={handleGeneralControlFile}
          smallSize={true}
        />

        {/* { copyToPendrive &&
          <ComputerFolder 
            folderIcon={exeIcon} 
            folderName={`BruteForce Disconnect.exe`}
            onFolderClick={handleExeFileClick}
            smallSize={true}
          />
        } */}
        

      </div>

        { showReadmeTxt &&
          <>
            <div className="textFile">
              <div className="closeTextFile" onClick={handleReadmeTxt} />
              <img src={readmeFileImg} className="textFileImg" />
              <div className="longText">
                # Sistema Supervisório
                <br/><br/>
                ## Descrição <br/>
                O arquivo GeneralControl.exe é um sistema supervisório responsável pelo controle de toda automação existente na sala;
                <br/>
                A aplicação é capaz de controlar o modo de operação, as lâmpadas, a porta principal e a temperatura da sala;
                <br/>
                Para alterar algum parâmetro, basta selecionar o que deseja.
                <br/><br/>
                ## Uso <br/>
                Abra o diretório do pendrive;<br/>
                Execute o programa GeneralControl.exe
                <br/><br/>
              </div>
            </div>
          </>
        }

        { generalControlFile && 
          <>
            <div className="generalControlExe">
              <div className="closeExeFile" onClick={handleGeneralControlFile} />
              <div className="closeGeneralControl" onClick={handleGeneralControlFile} />
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
                  {/* <div className="cancelButton" onClick={closeWarningWindow}>Fechar</div> */}
                </div>
              }
              
              
            </div>
          </>
        }

    </div>

      
  );

}