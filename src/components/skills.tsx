import { Billboard, Text, TrackballControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Vector3 } from "three";
import { wordCloudSkillsGrid } from "../utils/constants";

interface WordProps {
  children: string;
  position: Vector3;
  i: number;
  j: number;
  onClick: (position: Vector3) => void;
}

interface CloudProps {
  count: number;
  radius: number;
  onWordClick: (position: Vector3) => void;
}

const Word = ({ children, position, i, j, onClick }: WordProps) => {
  const fontSize = (wordCloudSkillsGrid[i - 1][j].radius - 3) / 6;

  const fontProps = {
    font: "/Inter-Bold.woff",
    fontSize,
    letterSpacing: -0.05,
    lineHeight: 1,
    "material-toneMapped": false,
  };
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const over = (e: any) => {
    e.stopPropagation();
    setHovered(true);
  };

  const out = () => setHovered(false);

  useFrame(() => {
    if (ref.current) {
      const targetScale = hovered ? 1.2 : 1;
      const currentScale = ref.current.scale.x;
      const lerpedScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.1);
      ref.current.scale.setScalar(lerpedScale);
    }
  });

  return (
    <Billboard position={position}>
      <Text
        ref={ref}
        onPointerOver={over}
        onPointerOut={out}
        onClick={(e) => {
          e.stopPropagation();
          onClick(position);
        }}
        {...fontProps}
      >
        {children}
      </Text>
    </Billboard>
  );
};

const Cloud = ({ count, radius, onWordClick }: CloudProps) => {
  const words = useMemo<[Vector3, string, number, number][]>(() => {
    const temp: [Vector3, string, number, number][] = [];
    const spherical = new THREE.Spherical();
    const phiSpan = Math.PI / (count + 1);
    const thetaSpan = (Math.PI * 2) / count;
    for (let i = 1; i < count + 1; i++) {
      for (let j = 0; j < count; j++) {
        const word = wordCloudSkillsGrid[i - 1][j];
        const position = new THREE.Vector3().setFromSpherical(
          spherical.set(radius, phiSpan * i, thetaSpan * j)
        );
        temp.push([position, word.name, i, j]);
      }
    }
    return temp;
  }, [count, radius]);

  return (
    <>
      {words.map(([pos, word, i, j], index) => (
        <Word
          key={index}
          position={pos}
          children={word}
          i={i}
          j={j}
          onClick={onWordClick}
        />
      ))}
    </>
  );
};

const RotatingGroup = () => {
  const groupRef = useRef<THREE.Group>(null);
  const targetQuaternion = useRef(new THREE.Quaternion());
  const [clickedPosition, setClickedPosition] = useState<THREE.Vector3 | null>(
    null
  );

  // For random smooth motion offsets
  const randomOffsets = useRef({
    x: Math.random() * 1000,
    y: Math.random() * 1000,
    z: Math.random() * 1000,
  });

  const handleWordClick = (wordPosition: THREE.Vector3) => {
    setClickedPosition(wordPosition.clone());
  };

  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    const elapsed = clock.getElapsedTime();

    const amplitude = 0.001;
    const frequency = 0.05;

    // Smooth random rotation offsets using sine waves
    const smoothX = Math.sin(elapsed + randomOffsets.current.x) * amplitude;
    const smoothY = Math.cos(elapsed + randomOffsets.current.y) * amplitude;
    const smoothZ = Math.sin(elapsed + randomOffsets.current.z) * amplitude;

    if (clickedPosition) {
      const wordDirection = clickedPosition.clone().normalize();
      const cameraPosition = new THREE.Vector3(0, 0, 38);
      const cameraVector = cameraPosition.clone().normalize();

      const q = new THREE.Quaternion().setFromUnitVectors(
        wordDirection,
        cameraVector
      );

      targetQuaternion.current.copy(q);
      // Slerp towards target quaternion with smooth random offsets applied
      groupRef.current.quaternion.slerp(targetQuaternion.current, frequency);

      // Apply small smooth rotation offsets for random motion
      groupRef.current.rotation.x += smoothX;
      groupRef.current.rotation.y += smoothY;
      groupRef.current.rotation.z += smoothZ;
    } else {
      // If no clicked word, just slowly rotate with smooth random offsets
      groupRef.current.rotation.x += smoothX;
      groupRef.current.rotation.y += smoothY;
      groupRef.current.rotation.z += smoothZ;
    }
  });

  return (
    <group ref={groupRef}>
      <Cloud count={8} radius={24} onWordClick={handleWordClick} />
    </group>
  );
};

export const WordCloud = () => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // When the component becomes visible via the observer, set visible to true
  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={ref}
      className={`h-screen ${
        isVisible ? "animate-fade-in" : "animate-fade-out"
      }`}
    >
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 38], fov: 90 }}
        className="cursor-pointer animate-fade-in py-10"
      >
        <fog attach="fog" args={["#202025", 0, 40]} />
        <Suspense fallback={null}>
          <RotatingGroup />
        </Suspense>
        <TrackballControls noZoom />
      </Canvas>
    </div>
  );
};
