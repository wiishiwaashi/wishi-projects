'use client';

import React, { useEffect, useRef } from 'react';

// Define the blueprint for a single Bubble object
class Bubble {
  x: number;
  y: number;
  radius: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
  ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) {
    this.ctx = ctx;
    this.radius = Math.random() * 80 + 10; // Bubble radius between 5 and 20
    this.x = Math.random() * canvasWidth;
    // Start bubbles just below the screen so they float up initially
    this.y = canvasHeight + Math.random() * 100; 
    this.speedX = Math.random() * 1 - 0.5; // Slight drift left/right
    this.speedY = Math.random() * -1.5 - 0.5; // Upward speed
    this.opacity = Math.random() * 0.3 + 0.1; // Transparency

    const colors = [
        `rgba(192, 132, 252, ${this.opacity})`, // Translucent Purple
        `rgba(34, 211, 238, ${this.opacity})`,  // Translucent Cyan
        `rgba(244, 114, 182, ${this.opacity})`, // Translucent Pink
        `rgba(255, 255, 255, ${this.opacity})`,
    ]

    this.color = colors[Math.floor(Math.random() * colors.length)]
  }

  update(canvasWidth: number, canvasHeight: number) {
    this.x += this.speedX;
    this.y += this.speedY;

    // Reset bubble to the bottom if it floats off the top or sides
    if (this.y + this.radius < 0 || this.x - this.radius > canvasWidth || this.x + this.radius < 0) {
      this.y = canvasHeight + this.radius;
      this.x = Math.random() * canvasWidth;
    }
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.closePath();
  }
}

export const BubbleBackground: React.FC = () => {
  // Use TypeScript generics to type the canvas reference
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let bubbles: Bubble[] = [];
    const bubbleCount = 40; // Adjust for more or fewer bubbles

    // Set canvas dimensions to fit the window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize bubbles
    for (let i = 0; i < bubbleCount; i++) {
      bubbles.push(new Bubble(ctx, canvas.width, canvas.height));
    }

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      bubbles.forEach((bubble) => {
        bubble.update(canvas.width, canvas.height);
        bubble.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Clean up event listeners and animation frames on unmount
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1, // Keep it behind your content
        background: 'linear-gradient(to bottom, #030712, #0b1329, #1e293b)', // Deep blue gradient
        pointerEvents: 'none', // Allows clicking through the background
      }}
    />
  );
};