import React, { ReactNode, useState } from "react";
import { GeneralControlFile } from "../GeneralControlFile/GeneralControlFile";
import { ComputerFolder } from "../ComputerFolder";
import pendriveOpenedImg from "../../../../assets/PCMechanics/pendrive-folder.png";
import exeIcon from "../../../../assets/PCMechanics/console-icon-44.png";
import textIcon from "../../../../assets/PCMechanics/text-file-icon-44.png";

interface PendriveFileProps {
  children: ReactNode;
  openReadme: () => void;
  openBruteForceFile: () => void;
  showPermissionAlert: () => void;
  close: () => void;
}

export function PendriveFile({ children, openReadme, openBruteForceFile, showPermissionAlert, close }: PendriveFileProps) {
  const [generalControlFile, setGeneralControlFile] = useState(false);
  const copiedToPendrive = true;

  const openGeneralControlFile = () => {
    setGeneralControlFile(true);
  }

  const closeGeneralControlFile = () => {
    setGeneralControlFile(false);
  }

  return(
    <>
      <div className="pendrive-window">
        <div className="closePendriveFolder" onClick={close} />
        <div className="sidebar" onClick={showPermissionAlert} />
        <img src={pendriveOpenedImg} className="pendrive-window-img"/>
        <div className="foldersInsideWindow">
          <ComputerFolder 
            folderIcon={exeIcon} 
            folderName={`General Control.exe`}
            onFolderClick={openGeneralControlFile}
            smallSize={true}
          />
          <ComputerFolder 
            folderIcon={textIcon} 
            folderName={`README.txt`}
            onFolderClick={ openReadme }
            smallSize={true}
          />
          { copiedToPendrive &&
            <ComputerFolder 
              folderIcon={exeIcon} 
              folderName={`BruteForce Disconnect.exe`}
              onFolderClick={openBruteForceFile}
              smallSize={true}
            />
          }
        </div>
      </div>


      { generalControlFile && 
        <GeneralControlFile close={closeGeneralControlFile}/>
      }

      { children }
    </>
  );
}