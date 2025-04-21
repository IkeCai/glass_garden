import React, { useEffect, useRef } from 'react';

const MicVisualizer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let audioContext: AudioContext;
    let analyser: AnalyserNode;
    let dataArray: Uint8Array;
    let animationId: number;

    const draw = () => {
        const canvas = canvasRef.current;
        if (!canvas || !analyser) return;
      
        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;
      
        const width = canvas.width;
        const height = canvas.height;
      
        ctx.clearRect(0, 0, width, height);
        analyser.getByteTimeDomainData(dataArray);
      
        // 🌈 Vertical gradient stroke (top → bottom)
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0.4, 'rgba(85, 82, 250, 0.25)');   
        gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.5)');  
        gradient.addColorStop(0, 'rgba(85, 82, 250, 0.75)');  
        ctx.strokeStyle = gradient;

      
        // 💫 Glow
        ctx.lineWidth = 10;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.2)';
        ctx.shadowBlur = 40;
      
        ctx.beginPath();
      
        const desiredCycles = 4;
        const pointsPerCycle = 100;
        const totalPoints = desiredCycles * pointsPerCycle;
        const sliceWidth = width / totalPoints;
        let x = 0;
      
        for (let i = 0; i < totalPoints; i++) {
          const index = Math.floor((i / totalPoints) * dataArray.length);
          const v = dataArray[index] / 128.0;
          const y = (v * height) / 2;
      
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
      
          x += sliceWidth;
        }
      
        ctx.stroke();
        animationId = requestAnimationFrame(draw);
      };

    const init = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;
      dataArray = new Uint8Array(analyser.frequencyBinCount);

      source.connect(analyser);
      draw();
    };

    init();

    return () => {
      cancelAnimationFrame(animationId);
      audioContext?.close();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={300}
      style={{  backgroundColor: 'transparent' }}
    />
  );
};

export default MicVisualizer;
