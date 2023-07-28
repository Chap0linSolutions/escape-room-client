import React from "react";
import { FolderContainer, FolderIcon, SmallFolderIcon, FolderName } from "./ComputerFolder.style";

interface ComputerFolderProps {
  folderIcon: string;
  folderName: string;
  smallSize?: boolean;
  onFolderClick?: () =>void;
}

export default function ComputerFolder({
  folderIcon,
  folderName,
  smallSize,
  onFolderClick
}: ComputerFolderProps ) {

  return(
    <FolderContainer onClick={onFolderClick}>
      { smallSize ? 
        <SmallFolderIcon src={folderIcon}/>
        :
        <FolderIcon src={folderIcon}/>      
      }
      <FolderName>{folderName}</FolderName>
    </FolderContainer>
  );
}