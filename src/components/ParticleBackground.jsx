import { Canvas } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random";
import { useState, useRef } from "react";

export default function ParticleBackground({ darkMode }) {
  // Generate particles only once
  const [points] = useState(() =>
    random.inSphere(new Float32Array(3000), { radius: 1.8 })
  );

  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 75 }}
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <Points positions={points} stride={3}>
          <PointMaterial
            size={0.015}
            sizeAttenuation
            depthWrite={false}
            color={darkMode ? "#00eaff" : "#222222"}
          />
        </Points>
      </Canvas>
    </div>
  );
}
