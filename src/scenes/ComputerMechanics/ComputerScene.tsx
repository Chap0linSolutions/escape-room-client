import React, { useState, useEffect } from "react";
import ComputerFolder from "../../components/ComputerFolder/ComputerFolder";
import folderIcon from "../../assets/PCMechanics/folder-icon.png";
import pendriveIcon from "../../assets/PCMechanics/pendrive-icon.png";
import trashIcon from "../../assets/PCMechanics/trash-icon.png";
import explorerFolderIcon from "../../assets/PCMechanics/explorer-folder-icon.png";
import musicFolderIcon from "../../assets/PCMechanics/music-folder-icon.png";
import folderOpenedImg from "../../assets/PCMechanics/files-explorer.png";
import pendriveOpenedImg from "../../assets/PCMechanics/pendrive-folder.png";
import readmeFileImg from "../../assets/PCMechanics/readme-file.png";
import exeFileImg from "../../assets/PCMechanics/tela-matrix.png";
import noPermission from "../../assets/PCMechanics/no-permission.png";
import alertIcon from "../../assets/PCMechanics/alert-icon.png";
import warningtIcon from "../../assets/PCMechanics/warning-icon.png";
import { delay } from "../../functions/Timers";
import { miscFolder } from "./folderStructure";
import fileType from "./fileTypes";

import exeIcon from "../../assets/PCMechanics/console-icon-44.png";
import textIcon from "../../assets/PCMechanics/text-file-icon-44.png";
import generalControlImg from "../../assets/PCMechanics/GeneralControl.png";

import './ComputerScene.css';
import { Matrix } from "./Matrix";

export function ComputerScene() {
  const [folderOpened, setFolderOpened] = useState<boolean>(false);
  const [noPermissionAlert, setNoPermissionAlert] = useState(false);
  const [pathCurrentFolder, setPathCurrentFolder] = useState<number[]>([]);
  const [folderItems, setFolderItems] = useState(miscFolder);
  const [loadingBar, setLoadingBar] = useState(Array(14).fill(false));
  const [currentRequest, setCurrentRequest] = useState(0);
  const [errorWindow, setErrorWindow] = useState(false);
  const [warningWindow, setWarningWindow] = useState(false);
  
  const [pendriveInUse, setPendriveInUse] = useState(true);
  const [showPendrivePopup, setShowPendrivePopup] = useState(false);
  const [copyToPendrive, setCopyToPendrive] = useState(false);

  const [pendriveOpened, setPendriveOpened] = useState(false);
  const [textFileOpened, setTextFileOpened] = useState(false);
  const [exeFileOpened, setExeFileOpened] = useState(false);
  const [showReadmeTxt, setShowReadmeTxt] = useState(false);
  const [generalControlFile, setGeneralControlFile] = useState(false);
  const [temperature, setTemperature] = useState(22);


  useEffect(() => {
    let currentFolderPath = miscFolder;
    for(let i = 0; i < pathCurrentFolder.length; i++) {
      currentFolderPath = currentFolderPath[pathCurrentFolder[i]].children;
    }
    setFolderItems(currentFolderPath);
  }, [pathCurrentFolder]);

  const toggleShowNoPermission = () => {
    setNoPermissionAlert((previousValue) => !previousValue);
  }

  const toggleShowOpenWindow = () => {
    setFolderOpened((previousValue) => !previousValue);
  }

  const toggleShowPendriveFolder = () => {
    setPendriveOpened((previousValue) => !previousValue);
  }

  const handleFolderClick = (index: number) => {
    setPathCurrentFolder([...pathCurrentFolder, index]); 
  }

  const handleTextFileClick = () => {
    setTextFileOpened((previousValue) => !previousValue);
  }

  const handleExeFileClick = async () => {
    setLoadingBar(Array(14).fill(false));
    setShowPendrivePopup(false);
    setCurrentRequest(0);
    setExeFileOpened(true);
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

  const handleCopyFile = () => {
    setCopyToPendrive(true);
    setShowPendrivePopup(false);
  }

  const handlePendrive = () => {
    setShowPendrivePopup(true);
  }

  const closeExeFile = () => {
    setExeFileOpened(false);
  }

  const closeErrorWindow = () => {
    setErrorWindow(false);
  }

  const closeWarningWindow = () => {
    setWarningWindow(false);
  }

  const handleGeneralControlFile = () => {
    setGeneralControlFile((previousValue) => !previousValue);
  }

  const backToFathersPath = () => {
    let updatedFolderPath = [...pathCurrentFolder];
    updatedFolderPath.splice(-1,1);
    setPathCurrentFolder(updatedFolderPath);
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

  return(
    <div className="screenContainer">
      { noPermissionAlert &&
        <>
        <div className="noPermission">
          <img src={noPermission}/>
          <div className="closeButton" onClick={toggleShowNoPermission} />
        </div>
        </> 
      }

      <div className="screenComponents">
        { folderOpened &&
        <>
          <div className="openWindow">
            <div className="closeWindow" onClick={toggleShowOpenWindow} />
            <div className="backToFathersPath" onClick={backToFathersPath}/>
            <div className="sidebar" onClick={toggleShowNoPermission} />
            <img src={folderOpenedImg} />
            <div className="foldersInsideWindow">
              {
                folderItems.map((item, index) => {
                  return(
                    <ComputerFolder 
                      folderIcon={item.icon} 
                      folderName={item.name}
                      smallSize={true}
                      key={index}
                      onFolderClick={ () =>  {
                        switch (item.type) {
                          case fileType.folder:
                            handleFolderClick(index)
                            break;
                          case fileType.exe:
                            pendriveInUse ? handlePendrive() : handleExeFileClick()
                            break;
                          case fileType.text:
                            handleTextFileClick()
                            break;
                          case fileType.notAllowed:
                            toggleShowNoPermission()
                        }
                      }}
                    />
                  );
                })

              }
            </div>
          </div>
          
          { textFileOpened &&
            <>
              <div className="textFile">
                <div className="closeTextFile" onClick={handleTextFileClick} />
                <img src={readmeFileImg} className="textFileImg" />
                <div className="longText">
                  # Aplicação de Desativação do Sistema de Segurança Autônomo
                  <br/><br/>
                  ## Descrição <br/>
                  Esta aplicação foi desenvolvida para desativar o sistema de segurança autônomo da sala por meio de um overload de requisições no sistema intranet da empresa.
                  <br/>
                  A aplicação é capaz de estabelecer aproximadamente 100 conexões simultâneas por vez.
                  <br/>
                  Para sobrecarregar o sistema alvo (resultando em sua desativação temporária) serão necessárias pelo menos 300 conexões simultâneas.
                  <br/><br/>
                  ## Uso <br/>
                  Abra o terminal e navegue até o diretório raiz da aplicação;<br/>
                  Execute o programa BruteForceDisconect.exe
                  <br/><br/>
                  ## Requisitos<br/>
                  Linguagem Cobra 7.0<br/>
                  Biblioteca Cascavel API
                  <br/><br/>
                  ## Instalação<br/>
                  Certifique-se de ter o Cobra 7.0 instalado em seu sistema;<br/>
                  Faça o download ou clone deste repositório;<br/>
                  Navegue até o diretório raiz da aplicação;<br/>
                  Execute o programa BruteForceDisconect.exe<br/>
                </div>
              </div>
            </>
          }

          { showPendrivePopup ? 
            <>
              <div className="optionsContainer">
                <div className="optionItem" onClick={handleExeFileClick}>Executar arquivo</div>
                <div className="optionItem" onClick={handleCopyFile}>Copiar para Pendrive</div>
              </div>


              { exeFileOpened &&

                <div className="exeFile">
                  <div className="closeExeFile" onClick={closeExeFile} />
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
                    <div className="cancelButton" onClick={closeExeFile}>Cancelar</div>
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
              }
              
            </>
            :
            <>
              {exeFileOpened &&
                <div className="exeFile">
                  <div className="closeExeFile" onClick={closeExeFile} />
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
                    <div className="cancelButton" onClick={closeExeFile}>Cancelar</div>
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

              }
            </>
          }
          
        </>
        }

        { pendriveOpened && 
          <>
            <div className="pendrive-window">
              <div className="closePendriveFolder" onClick={toggleShowPendriveFolder} />
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

                { copyToPendrive &&
                  <ComputerFolder 
                    folderIcon={exeIcon} 
                    folderName={`BruteForce Disconnect.exe`}
                    onFolderClick={handleExeFileClick}
                    smallSize={true}
                  />
                }
                

              </div>
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

                  
                  {/* { errorWindow &&
                    <div className="errorWindow">
                      <div className="containerMsg">
                        <img src={alertIcon} className="alertIcon" />
                        <p className="errorMsg">Ocorreu um erro inesperado!</p>
                      </div>
                      <div className="cancelButton" onClick={closeWarningWindow}>Fechar</div>
                    </div>
                    <></>
                  } */}
                  
                  
                </div>
              </>
            }

            { exeFileOpened && 
                <div className="exeFile">
                  <div className="closeExeFile" onClick={closeExeFile} />
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
                    <div className="cancelButton" onClick={closeExeFile}>Cancelar</div>
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
            }
          </>
        }


        <div className="desktopIcons">
          <ComputerFolder
            folderIcon={trashIcon} 
            folderName={`Lixeira`}
            onFolderClick={toggleShowNoPermission}
          />
          <ComputerFolder 
            folderIcon={explorerFolderIcon} 
            folderName={`Explorador`}
            onFolderClick={toggleShowOpenWindow}
          />
          <ComputerFolder 
            folderIcon={musicFolderIcon} 
            folderName={`Músicas`}
            onFolderClick={toggleShowNoPermission}
          />
          <ComputerFolder 
            folderIcon={pendriveIcon} 
            folderName={`Pendrive`}
            onFolderClick={toggleShowPendriveFolder}
          />
          
        </div>

        <div className="taskBar">
          <div className="selectableArea" onClick={toggleShowNoPermission}></div>
        </div>
        
      </div>
    </div>
  );
}
