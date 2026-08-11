import { useState } from 'react';

interface Point {
  x: number;
  y: number;
}

export function usePanZoom(
  pan: Point,
  setPan: (val: Point | ((prev: Point) => Point)) => void,
  setZoom: (val: number | ((prev: number) => number)) => void,
) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<Point>({ x: 0, y: 0 });
  const [touchDistanceStart, setTouchDistanceStart] = useState<number | null>(
    null,
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      // Single finger touch pan
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - pan.x,
        y: e.touches[0].clientY - pan.y,
      });
      setTouchDistanceStart(null);
    } else if (e.touches.length === 2) {
      // Two finger pinch to zoom
      setIsDragging(false);
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY,
      );
      setTouchDistanceStart(dist);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && isDragging) {
      setPan({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      });
    } else if (e.touches.length === 2 && touchDistanceStart !== null) {
      const currentDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY,
      );
      const scale = currentDist / touchDistanceStart;
      setZoom((prevZoom) =>
        Math.min(Math.max(prevZoom * (scale > 1 ? 1.03 : 0.97), 0.4), 3.5),
      );
      setTouchDistanceStart(currentDist);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setTouchDistanceStart(null);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomDelta = e.deltaY < 0 ? 0.05 : -0.05;
    setZoom((prev) => Math.min(Math.max(prev + zoomDelta, 0.4), 3.5));
  };

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleWheel,
  };
}
