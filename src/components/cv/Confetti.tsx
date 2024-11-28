import ReactConfetti from "react-confetti";
import { useState, useEffect } from "react";

interface ConfettiProps {
  duration?: number;
}

export function Confetti({ duration = 3000 }: ConfettiProps) {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!showConfetti) return null;

  return (
    <ReactConfetti
      width={window.innerWidth}
      height={window.innerHeight}
      recycle={false}
      numberOfPieces={200}
      gravity={0.2}
    />
  );
}