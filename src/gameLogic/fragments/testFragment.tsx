import React from 'react';

export const TestFragment = () => {
  return (
    <div>
      <p
        style={{
          color: "blue",
        }}
      >My Hero:</p>
      <img 
        src="https://img.olhardigital.com.br/wp-content/uploads/2023/05/super-homem-nicolas-cage-1024x576.png"
        style={{
          width: "300px",
          height: "300px",
          objectFit: "cover"
        }}
      />
    </div>
  )
}