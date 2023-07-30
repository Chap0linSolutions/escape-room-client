import React from "react";
import readmeFileImg from "../../../../assets/PCMechanics/readme-file.png";

export type TextTypes = "instructions" | "readme";

interface TextFilesProps{
  close: () => void;
  file: TextTypes;
}

export function TextFiles({close, file}: TextFilesProps) {
  return(
    <div className="textFile">
      <div className="closeTextFile" onClick={close} />
      <img src={readmeFileImg} className="textFileImg" />
      <div className="longText">
        { file === "instructions" ?
          <>
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
          </>
          :
          <>
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
          </>
        } 
      </div>
    </div>
  );
}