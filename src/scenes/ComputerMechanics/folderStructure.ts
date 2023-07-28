import smallFolderIcon from "../../assets/PCMechanics/smallFolderIcon.png";
import textIcon from "../../assets/PCMechanics/text-file-icon-44.png";
import imgIcon from "../../assets/PCMechanics/img-file-icon-44.png";
import pdfIcon from "../../assets/PCMechanics/pdf-icon-44.png";
import exeIcon from "../../assets/PCMechanics/console-icon-44.png";
import fileType from "./fileTypes";

export const miscFolder = [
  {
    name: 'Arq importante',
    icon: smallFolderIcon,
    type: fileType.folder,
    children: [
      {
        name: 'Emp 001',
        icon: smallFolderIcon,
        type: fileType.folder,
        children: []
      },
      {
        name: 'Emp 002',
        icon: smallFolderIcon,
        type: fileType.folder,
        children: [
          {
            name: 'requisitos',
            icon: smallFolderIcon,
            type: fileType.folder,
            children: [
              {
                name: 'Propostas iniciais',
                icon: textIcon,
                type: fileType.text,
                children: [],
              },
              {
                name: 'Requisitos',
                icon: pdfIcon,
                type: fileType.notAllowed,
                children: [],
              }
            ]
          },
          {
            name: 'infos clientes',
            icon: smallFolderIcon,
            type: fileType.folder,
            children: [
              {
                name: 'Dados sensíveis',
                icon: pdfIcon,
                type: fileType.notAllowed,
                children: [],
              }
            ]
          },
          {
            name: 'arquitetura',
            icon: smallFolderIcon,
            type: fileType.folder,
            children: [
              {
                name: 'esquemático',
                icon: imgIcon,
                type: fileType.notAllowed,
                children: [],
              },
              {
                name: 'documentação',
                icon: pdfIcon,
                type: fileType.notAllowed,
                children: [],
              },
            ]
          },
        ]
      },
      {
        name: 'Emp 003',
        icon: smallFolderIcon,
        type: fileType.folder,
        children: []
      },
      {
        name: 'Emp 004',
        icon: smallFolderIcon,
        type: fileType.folder,
        children: []
      },
      {
        name: 'Emp 005',
        icon: smallFolderIcon,
        type: fileType.folder,
        children: []
      },
    ]
  },
  {
    name: 'Arquivo 1',
    icon: smallFolderIcon,
    type: fileType.folder,
    children: []
  },
  {
    name: 'Arquivo 2',
    icon: smallFolderIcon,
    type: fileType.folder,
    children: [
      {
        name: 'Não olhe',
        icon: smallFolderIcon,
        type: fileType.folder,
        children: [
          {
            name: 'viagem',
            icon: imgIcon,
            type: fileType.notAllowed,
            children: []
          },
        ]
      },
      {
        name: 'Quando der ruim',
        icon: smallFolderIcon,
        type: fileType.folder,
        children: [
          {
            name: 'instruções',
            icon: textIcon,
            type: fileType.text,
            children: []
          },
          {
            name: 'BruteForce Disconnect.exe',
            icon: exeIcon,
            type: fileType.exe,
            children: []
          },
        ]
      },
    ]
  },
  {
    name: 'Projeto_git',
    icon: smallFolderIcon,
    type: fileType.folder,
    children: [
      {
        name: '.git',
        icon: smallFolderIcon,
        type: fileType.folder,
        children: [
          {
            name: 'workflows',
            icon: smallFolderIcon,
            type: fileType.folder,
            children: []
          },
        ]
      },
      {
        name: 'node_modules',
        icon: smallFolderIcon,
        type: fileType.folder,
        children: []
      },
      {
        name: 'public',
        icon: smallFolderIcon,
        type: fileType.folder,
        children: []
      },
      {
        name: 'src',
        icon: smallFolderIcon,
        type: fileType.folder,
        children: []
      },
    ]
  },
  {
    name: 'Projeto final',
    icon: smallFolderIcon,
    type: fileType.folder,
    children: [
      {
        name: 'doc final',
        icon: smallFolderIcon,
        type: fileType.folder,
        children: []
      },
      {
        name: 'entregaveis',
        icon: smallFolderIcon,
        type: fileType.folder,
        children: []
      },
      {
        name: 'requisitos atendidos',
        icon: smallFolderIcon,
        type: fileType.folder,
        children: []
      },
    ]
  },
  {
    name: 'release',
    icon: smallFolderIcon,
    type: fileType.folder,
    children: []
  },
  {
    name: 'zip',
    icon: smallFolderIcon,
    type: fileType.notAllowed,
    children: []
  },
]