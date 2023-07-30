import React, { useRef, useLayoutEffect, RefObject } from "react";

const useMatrixLoop = () => {
  let ctx: CanvasRenderingContext2D;
  let x = 0;
  let y = 0;
  let vetorPalavras = Array(24).fill(0).map((_i) => {
    let wordLenght = Math.floor(Math.random() * 15) + 5;
    return ({
      word: Array(wordLenght).fill(0).map((_l) => {
        let letterVariations = Math.floor(Math.random() * 5) + 1;
        let letter = Math.random().toString(36).substring(2, letterVariations+2).split("")
        return {
          letter,
          currentIndex: 0
        }
      }),
      speed: Math.random()*4 + 1,
      startY: -wordLenght*30
    }) 
  })

  const loop = () => {
    ctx.clearRect(0, 0, 686, 401)
    ctx.font = "30px Arial";
    ctx.fillStyle = "green"
    x = 5
    vetorPalavras.forEach(palavra => {
      y = palavra.startY;
      palavra.word.forEach((letra, i) => {
        if (Math.random() < 0.02) {
          letra.currentIndex = Math.floor(Math.random()*letra.letter.length)
        }
        if (i === palavra.word.length - 1){
          // ctx.fillStyle = "#12fe12"
          ctx.fillText(letra.letter[letra.currentIndex],x,y);
          ctx.fillStyle = "green"
        } else {
          ctx.fillText(letra.letter[letra.currentIndex],x,y);
        }
        y+=35;
      })
      if(palavra.startY > 401){
        palavra.startY = palavra.word.length * -30;
      } else {
        palavra.startY += palavra.speed
      }
      x += 30
    })

    requestAnimationFrame(loop);
  };

  const startMatrix = (ref: RefObject<HTMLCanvasElement>) => {
    if (!ref.current) return null;
    const gameCtx = ref.current.getContext('2d');
    if (!gameCtx) return null;
    ctx = gameCtx;
    requestAnimationFrame(loop);
  };

  return {
    startMatrix,
  };
};

export const Matrix = () => {
  const matrixRef = useRef<HTMLCanvasElement>(null);
  const { startMatrix } = useMatrixLoop();

  useLayoutEffect(() => {
    startMatrix(matrixRef);
  }, []);


  return (
    <canvas ref={matrixRef} width="686px" height="401px"></canvas>
  )
}