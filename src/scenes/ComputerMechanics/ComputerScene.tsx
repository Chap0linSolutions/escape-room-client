import React, { useState, useEffect } from "react";
import {
  ComputerFolder,
  NoPermissionAlert,
  TextFiles,
  BruteForceFile,
  PendriveFile,
  type TextTypes
} from "./components";

import pendriveIcon from "../../assets/PCMechanics/pendrive-icon.png";
import trashIcon from "../../assets/PCMechanics/trash-icon.png";
import explorerFolderIcon from "../../assets/PCMechanics/explorer-folder-icon.png";
import musicFolderIcon from "../../assets/PCMechanics/music-folder-icon.png";
import folderOpenedImg from "../../assets/PCMechanics/files-explorer.png";

import { miscFolder } from "./folderStructure";
import fileType from "./fileTypes";

import './ComputerScene.css';
import { State } from "../../gameLogic/state";

interface ComputerSceneProps {
  owner: string;
}

export function ComputerScene({ owner }: ComputerSceneProps) {
  const [folderOpened, setFolderOpened] = useState<boolean>(false);

  const [pathCurrentFolder, setPathCurrentFolder] = useState<number[]>([]);
  const [folderItems, setFolderItems] = useState(miscFolder);

  // janelas de erros e warnings
  const [noPermissionAlert, setNoPermissionAlert] = useState(false);

  // pendrive
  const [showPendrivePopup, setShowPendrivePopup] = useState(false);
  const [pendriveOpened, setPendriveOpened] = useState(false);

  // abrir arquivos
  const [textFileOpened, setTextFileOpened] = useState<TextTypes | null>(null);

  const [bruteForceFile, setBruteForceFile] = useState(false);

  const state = new State();
  const pendriveConnected = state.pendriveConnectedAt === owner;

  useEffect(() => {
    let currentFolderPath = miscFolder;
    for (let i = 0; i < pathCurrentFolder.length; i++) {
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

  const closeTextFile = () => {
    setTextFileOpened(null);
  }

  const handleExeFileClick = async () => {
    setBruteForceFile(true);
    setShowPendrivePopup(false);
  }

  const handleCopyFile = () => {
    // setCopyToPendrive(true);
    setShowPendrivePopup(false);
  }

  const handlePendrive = () => {
    setShowPendrivePopup(true);
  }

  const closeExeFile = () => {
    setBruteForceFile(false);
  }

  const backToFathersPath = () => {
    let updatedFolderPath = [...pathCurrentFolder];
    updatedFolderPath.splice(-1, 1);
    setPathCurrentFolder(updatedFolderPath);
  }

  return (
    <div className="screenContainer">
      {noPermissionAlert &&
        <NoPermissionAlert toggleShowNoPermission={toggleShowNoPermission} />
      }
      <div className="screenComponents">
        {folderOpened &&
          <>
            <div className="openWindow">
              <div className="closeWindow" onClick={toggleShowOpenWindow} />
              <div className="backToFathersPath" onClick={backToFathersPath} />
              <div className="sidebar" onClick={toggleShowNoPermission} />
              <img src={folderOpenedImg} />
              <div className="foldersInsideWindow">
                {
                  folderItems.map((item, index) => {
                    return (
                      <ComputerFolder
                        folderIcon={item.icon}
                        folderName={item.name}
                        smallSize={true}
                        key={index}
                        onFolderClick={() => {
                          switch (item.type) {
                            case fileType.folder:
                              handleFolderClick(index)
                              break;
                            case fileType.exe:
                              pendriveConnected ? handlePendrive() : handleExeFileClick()
                              break;
                            case fileType.text:
                              setTextFileOpened("instructions")
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

            {textFileOpened === "instructions" &&
              <TextFiles file="instructions" close={closeTextFile} />
            }

            {showPendrivePopup &&
              <div className="optionsBackdrop" onClick={() => setShowPendrivePopup(false)}>
                <div className="optionsContainer">
                  <div className="optionItem" onClick={handleExeFileClick}>Executar arquivo</div>
                  <div className="optionItem" onClick={handleCopyFile}>Copiar para Pendrive</div>
                </div>
              </div>
            }

            {bruteForceFile &&
              <BruteForceFile close={closeExeFile} />
            }
          </>
        }

        {pendriveOpened &&
          <PendriveFile
            close={toggleShowPendriveFolder}
            openReadme={() => setTextFileOpened("readme")}
            openBruteForceFile={handleExeFileClick}
            showPermissionAlert={toggleShowNoPermission}
          >
            {textFileOpened === "readme" &&
              <TextFiles file="readme" close={closeTextFile} />
            }

            {bruteForceFile &&
              <BruteForceFile close={closeExeFile} />
            }
          </PendriveFile>
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
          { pendriveConnected &&
            <ComputerFolder
              folderIcon={pendriveIcon}
              folderName={`Pendrive`}
              onFolderClick={toggleShowPendriveFolder}
            />
          }
          
        </div>

        <div className="taskBar">
          <div className="selectableArea" onClick={toggleShowNoPermission}></div>
        </div>

      </div>
    </div>
  );
}
