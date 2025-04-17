'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import RINGS from 'vanta/dist/vanta.rings.min';

export default function VantaRingsPage() {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        RINGS({
          el: vantaRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          touchControls: true,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div ref={vantaRef} className="w-full h-screen">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com"/>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Doto:wght@100..900&family=Fira+Code:wght@300..700&family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Jersey+10&family=Julius+Sans+One&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Playwrite+MX+Guides&family=Prata&family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"></link>
      <div className="text-white z-10 relative p-10">
        <h1 className="lg:text-12xl text-7xl ml-4 mt-40 lg:mt-24 lg:ml-36 font-bold urbanist-400">Resumer</h1>
        <a href="/main"><p className='urbanist-400 text-4xl ml-4 mt-10 lg:ml-126 font-extralight'>start building your resume</p></a>
      </div>
    </div>
  );
}

