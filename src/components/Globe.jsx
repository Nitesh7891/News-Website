import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";

const Globe = () => {
  return (
    <div className="w-full h-72 sm:h-96 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 4, 5]} intensity={1} />
        <OrbitControls enableZoom={false} />

        <Sphere args={[1, 64, 64]} scale={1.7}>
          <MeshDistortMaterial
            color="#38bdf8"
            distort={0.4}
            speed={1.5}
            roughness={0.2}
          />
        </Sphere>
      </Canvas>
    </div>
  );
};

export default Globe;
