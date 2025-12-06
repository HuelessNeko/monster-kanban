import { useEffect, useRef } from "react";

export default function Monster({ color, height = "h-24" }) {
  const eyesRef = useRef([]);
  const pupilsRef = useRef([]);
  const maxMove = 5; // smaller = subtler movement

  // Track mouse and move pupils
  useEffect(() => {
    const handleMove = (e) => {
      eyesRef.current.forEach((eye, index) => {
        const pupil = pupilsRef.current[index];
        if (!eye || !pupil) return;

        const rect = eye.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const angle = Math.atan2(dy, dx);
        const x = Math.cos(angle) * maxMove;
        const y = Math.sin(angle) * maxMove;

        pupil.style.transform = `translate(${x}px, ${y}px)`;
      });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  // utility functions to register eyes/pupils
  const setEyeRef = (el) => {
    if (el && !eyesRef.current.includes(el)) eyesRef.current.push(el);
  };

  const setPupilRef = (el) => {
    if (el && !pupilsRef.current.includes(el)) pupilsRef.current.push(el);
  };

  return (
    <div
      className={`${height} relative rounded-t-full rounded-b-md flex justify-center items-start pt-2 mb-4`}
      style={{ width: "5rem", backgroundColor: `var(--monster-${color})` }}
    >
  
      {/* Eyes */}
      <div className="flex space-x-1 mt-2">
        <div
          className="relative w-5 h-5 rounded-full overflow-hidden"
          ref={setEyeRef}
          style={{ backgroundColor: "var(--card-bg)" }}
        >
          <div
            ref={setPupilRef}
            className="absolute w-2 h-2 rounded-full top-1.5 left-1.5 transition-transform duration-75 ease-linear"
            style={{ backgroundColor: "var(--pupil)" }}
          />
        </div>
        <div
          className="relative w-5 h-5 rounded-full overflow-hidden"
          ref={setEyeRef}
          style={{ backgroundColor: "var(--card-bg)" }}
        >
          <div
            ref={setPupilRef}
            className="absolute w-2 h-2 rounded-full top-1.5 left-1.5 transition-transform duration-75 ease-linear"
            style={{ backgroundColor: "var(--pupil)" }}
          />
        </div>
      </div>

      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full"
        style={{ backgroundColor: "var(--pupil)" }}
      />
    </div>
  );
}
