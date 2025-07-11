import React, { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const CanvasBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const nodesRef = useRef<Node[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createNodes = () => {
      const nodeCount = Math.min(50, Math.floor((canvas.width * canvas.height) / 15000));
      nodesRef.current = [];
      
      for (let i = 0; i < nodeCount; i++) {
        nodesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
        });
      }
    };

    const drawNode = (node: Node) => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(79, 209, 199, 0.6)';
      ctx.fill();
    };

    const drawConnection = (node1: Node, node2: Node, distance: number, maxDistance: number) => {
      const opacity = 1 - (distance / maxDistance);
      ctx.strokeStyle = `rgba(79, 209, 199, ${opacity * 0.3})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(node1.x, node1.y);
      ctx.lineTo(node2.x, node2.y);
      ctx.stroke();
    };

    const drawMouseConnection = (node: Node, mouseDistance: number) => {
      if (mouseDistance < 150) {
        const opacity = 1 - (mouseDistance / 150);
        ctx.strokeStyle = `rgba(99, 179, 237, ${opacity * 0.5})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
        ctx.stroke();
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      nodesRef.current.forEach((node, i) => {
        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x <= 0 || node.x >= canvas.width) node.vx *= -1;
        if (node.y <= 0 || node.y >= canvas.height) node.vy *= -1;

        // Keep within bounds
        node.x = Math.max(0, Math.min(canvas.width, node.x));
        node.y = Math.max(0, Math.min(canvas.height, node.y));

        // Draw node
        drawNode(node);

        // Check mouse distance
        const mouseDistance = Math.sqrt(
          Math.pow(node.x - mouseRef.current.x, 2) + 
          Math.pow(node.y - mouseRef.current.y, 2)
        );
        drawMouseConnection(node, mouseDistance);

        // Draw connections to other nodes
        for (let j = i + 1; j < nodesRef.current.length; j++) {
          const otherNode = nodesRef.current[j];
          const distance = Math.sqrt(
            Math.pow(node.x - otherNode.x, 2) + 
            Math.pow(node.y - otherNode.y, 2)
          );

          if (distance < 100) {
            drawConnection(node, otherNode, distance, 100);
          }
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    const handleResize = () => {
      resizeCanvas();
      createNodes();
    };

    resizeCanvas();
    createNodes();
    animate();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ background: 'linear-gradient(135deg, #1a202c 0%, #2d3748 100%)' }}
    />
  );
};

export default CanvasBackground;
