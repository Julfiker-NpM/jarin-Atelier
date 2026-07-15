/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { GALLERY_ITEMS } from '../data';
import { GalleryItem } from '../types';
import { 
  ZoomIn, 
  RotateCcw, 
  HelpCircle, 
  Sparkles, 
  Play, 
  Pause, 
  ChevronRight, 
  Info,
  Maximize2,
  X,
  Compass,
  ArrowRight,
  Layers
} from 'lucide-react';

// Radius of the circular gallery hall
const GALLERY_RADIUS = 7.0;

// Vertical center of every artwork. The wall group is nested inside an outer
// group offset by this amount (see the circular arrangement below), so the
// artwork's world-space center sits at exactly this Y. The camera controller
// and the arrangement MUST agree on this value or pieces render off-center.
const ARTWORK_Y = 2.6;

// Camera Controller that smoothly glides the camera + orbit target WHILE a
// focus transition is active. Outside of a transition it intentionally does
// nothing, leaving OrbitControls (manual drag) and AutoOrbit in full
// control of the camera — this prevents the two writers from fighting.
interface CameraControllerProps {
  selectedItem: GalleryItem | null;
  items: GalleryItem[];
  controlsRef: React.RefObject<any>;
  isTransitioning: boolean;
  setIsTransitioning: (value: boolean) => void;
}

function CameraController({
  selectedItem,
  items,
  controlsRef,
  isTransitioning,
  setIsTransitioning,
}: CameraControllerProps) {
  const { camera } = useThree();

  useFrame(() => {
    // OrbitControls (drag) and AutoOrbit own the camera unless we are
    // actively gliding to or from a focused masterpiece.
    if (!isTransitioning) return;

    const targetCamPos = new THREE.Vector3();
    const targetLookAt = new THREE.Vector3();

    if (selectedItem) {
      const index = items.findIndex(item => item.id === selectedItem.id);
      if (index !== -1) {
        const theta = (index / items.length) * Math.PI * 2;
        const ax = GALLERY_RADIUS * Math.cos(theta);
        const az = GALLERY_RADIUS * Math.sin(theta);

        // Stand straight-on at the artwork's vertical center (ARTWORK_Y) so the
        // piece is framed dead-center rather than above/below the crosshair.
        const focusDistanceRatio = 0.55; // ~55% of the radius from center
        targetCamPos.set(ax * focusDistanceRatio, ARTWORK_Y, az * focusDistanceRatio);
        targetLookAt.set(ax, ARTWORK_Y, az);
      } else {
        targetCamPos.set(0, 3.2, 9.5);
        targetLookAt.set(0, 1.2, 0);
      }
    } else {
      // Default cinematic panoramic bird's-eye view
      targetCamPos.set(0, 3.2, 9.5);
      targetLookAt.set(0, 1.2, 0);
    }

    // Smooth lerping (damping factor ~0.08 for a soft, cinematic glide)
    camera.position.lerp(targetCamPos, 0.08);

    if (controlsRef.current) {
      controlsRef.current.target.lerp(targetLookAt, 0.08);
      controlsRef.current.update();
    }

    // Hand control back to OrbitControls/AutoOrbit once the glide settles
    if (camera.position.distanceTo(targetCamPos) < 0.05) {
      setIsTransitioning(false);
    }
  });

  return null;
}

// Automatic slow orbital camera glide when idle
interface AutoOrbitProps {
  active: boolean;
  selectedItem: GalleryItem | null;
  isTransitioning: boolean;
}

function AutoOrbit({ active, selectedItem, isTransitioning }: AutoOrbitProps) {
  const { camera } = useThree();
  const angleRef = useRef(0);

  useFrame((state) => {
    // Pause while a focus glide is running so the two writers never fight.
    if (active && !selectedItem && !isTransitioning) {
      angleRef.current += 0.0015; // ultra-slow cinematic rotation
      const radius = 9.5;
      camera.position.x = radius * Math.sin(angleRef.current);
      camera.position.z = radius * Math.cos(angleRef.current);
      camera.position.y = 3.2 + Math.sin(state.clock.getElapsedTime() * 0.3) * 0.3; // gentle bobbing
    }
  });

  return null;
}

// 3D Spot Light Fixture and SpotLight Source pointing to the artwork
interface SpotlightFixtureProps {
  position: [number, number, number];
  rotationY: number;
}

function SpotlightFixture({ position, rotationY }: SpotlightFixtureProps) {
  const [x, y, z] = position;
  
  // Spotlight is placed slightly forward and pointing down at the painting
  const lightOffsetRadius = 1.2;
  const lx = x - lightOffsetRadius * Math.cos(rotationY);
  const lz = z - lightOffsetRadius * Math.sin(rotationY);
  const ly = y + 2.4; // Hanging from ceiling level

  return (
    <group position={[lx, ly, lz]} rotation={[0, -rotationY + Math.PI / 2, 0]}>
      {/* Spotlight arm / rod hanging from ceiling */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.8]} />
        <meshStandardMaterial color="#8C6B2E" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Spotlight fixture head pointing down-forward */}
      <group rotation={[Math.PI / 6, 0, 0]}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.08, 0.06, 0.25]} />
          <meshStandardMaterial color="#C8A15A" metalness={0.85} roughness={0.2} />
        </mesh>
        
        {/* Real spotlight light source */}
        <spotLight
          color="#FFEDB3"
          intensity={6.0}
          distance={6.5}
          angle={Math.PI / 4}
          penumbra={0.7}
          castShadow
          target-position={[0, -2.5, -0.6]}
        />
      </group>
    </group>
  );
}

// Central Exhibition Bench (Walnut Top with Gold legs)
function CentralBench() {
  return (
    <group position={[0, 0, 0]}>
      {/* Bench Plinth / Floor platform */}
      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[1.5, 1.6, 0.04, 32]} />
        <meshStandardMaterial color="#0b0b0b" roughness={0.8} metalness={0.2} />
      </mesh>

      {/* Bench wood top */}
      <mesh position={[0, 0.42, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.0, 0.1, 0.7]} />
        <meshStandardMaterial color="#2d1c10" roughness={0.5} />
      </mesh>

      {/* Bench legs (Gold) */}
      <group position={[0, 0, 0]}>
        {/* Leg 1 */}
        <mesh position={[-0.8, 0.2, -0.25]}>
          <cylinderGeometry args={[0.03, 0.02, 0.4]} />
          <meshStandardMaterial color="#C8A15A" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Leg 2 */}
        <mesh position={[0.8, 0.2, -0.25]}>
          <cylinderGeometry args={[0.03, 0.02, 0.4]} />
          <meshStandardMaterial color="#C8A15A" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Leg 3 */}
        <mesh position={[-0.8, 0.2, 0.25]}>
          <cylinderGeometry args={[0.03, 0.02, 0.4]} />
          <meshStandardMaterial color="#C8A15A" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Leg 4 */}
        <mesh position={[0.8, 0.2, 0.25]}>
          <cylinderGeometry args={[0.03, 0.02, 0.4]} />
          <meshStandardMaterial color="#C8A15A" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>

      {/* Decorative center accent vase on the bench */}
      <group position={[0, 0.55, 0]}>
        <mesh position={[0, 0.08, 0]}>
          <cylinderGeometry args={[0.08, 0.15, 0.16, 16]} />
          <meshStandardMaterial color="#111111" metalness={0.95} roughness={0.05} />
        </mesh>
        <mesh position={[0, 0.18, 0]}>
          <cylinderGeometry args={[0.04, 0.06, 0.05, 16]} />
          <meshStandardMaterial color="#C8A15A" metalness={0.95} roughness={0.05} />
        </mesh>
      </group>
    </group>
  );
}

// Individual Exhibition Wall supporting the artwork
interface GalleryWallProps {
  item: GalleryItem;
  position: [number, number, number];
  rotationY: number;
  isSelected: boolean;
  onSelect: () => void;
}

// In-scene textured artwork plane (reliable alternative to HTML-in-3D)
function ArtworkPlane({ item, isSelected, hovered, onSelect }: {
  item: GalleryItem;
  isSelected: boolean;
  hovered: boolean;
  onSelect: () => void;
}) {
  const texture = useTexture(item.imageUrl);
  texture.colorSpace = THREE.SRGBColorSpace;
  const scale = isSelected ? 1.04 : hovered ? 1.02 : 1.0;

  return (
    <group position={[0, 0, 0.15]} scale={scale}>
      {/* Gilded frame backing */}
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[3.92, 3.92]} />
        <meshStandardMaterial
          color={isSelected ? '#E4C886' : '#C8A15A'}
          metalness={0.85}
          roughness={0.25}
        />
      </mesh>
      {/* Artwork surface (unlit so the piece reads at full fidelity) */}
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'default';
        }}
      >
        <planeGeometry args={[3.55, 3.55]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
    </group>
  );
}

function GalleryWall({ item, position, rotationY, isSelected, onSelect }: GalleryWallProps) {
  const wallRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  return (
    <group
      ref={wallRef}
      position={position}
      rotation={[0, -rotationY, 0]}
    >
      {/* Physical Partition Wall Mesh */}
      <mesh
        castShadow
        receiveShadow
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
          document.body.style.cursor = 'default';
        }}
      >
        <boxGeometry args={[4.2, 5.2, 0.25]} />
        <meshStandardMaterial
          color={isSelected ? "#101010" : "#141414"}
          roughness={0.8}
          metalness={0.15}
        />
      </mesh>

      {/* Gilded architectural gold border lining the wall */}
      <mesh position={[0, 0, 0.13]}>
        <boxGeometry args={[4.22, 5.22, 0.01]} />
        <meshStandardMaterial
          color="#C8A15A"
          metalness={0.8}
          roughness={0.3}
          wireframe={true}
        />
      </mesh>

      {/* Spotlighting unit */}
      <SpotlightFixture position={position} rotationY={rotationY} />

      {/* Interactive 3D Artwork Plane */}
      <Suspense fallback={null}>
        <ArtworkPlane item={item} isSelected={isSelected} hovered={hovered} onSelect={onSelect} />
      </Suspense>

      {/* Wall Shadow Plane */}
      <mesh position={[0, -2.59, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.2, 0.6]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.65} />
      </mesh>
    </group>
  );
}

// main component implementation
interface ThreeGalleryProps {
  onOpenFullResolution: (item: GalleryItem) => void;
}

export default function ThreeGallery({ onOpenFullResolution }: ThreeGalleryProps) {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [autoTour, setAutoTour] = useState(true);
  const [showHelp, setShowHelp] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const lastItemRef = useRef<GalleryItem | null>(null);
  const controlsRef = useRef<any>(null);

  // Turn off auto-tour once the user manually focuses on a masterpiece
  useEffect(() => {
    if (selectedItem) {
      setAutoTour(false);
    }
  }, [selectedItem]);

  const handleResetView = () => {
    // Glide back to the panoramic view; the camera controller
    // owns the return animation, so we just flag the transition.
    setSelectedItem(null);
    setIsTransitioning(true);
  };

  const handleSelectArtwork = (item: GalleryItem) => {
    setSelectedItem(item);
    lastItemRef.current = item;
    setIsTransitioning(true);
  };

  const handleNextArtwork = () => {
    const base = lastItemRef.current ?? GALLERY_ITEMS[0];
    const idx = GALLERY_ITEMS.findIndex(item => item.id === base.id);
    const nextIdx = (idx + 1) % GALLERY_ITEMS.length;
    handleSelectArtwork(GALLERY_ITEMS[nextIdx]);
  };

  const handlePrevArtwork = () => {
    const base = lastItemRef.current ?? GALLERY_ITEMS[GALLERY_ITEMS.length - 1];
    const idx = GALLERY_ITEMS.findIndex(item => item.id === base.id);
    const prevIdx = (idx - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
    handleSelectArtwork(GALLERY_ITEMS[prevIdx]);
  };

  // Keep the last focused piece visible while the panel slides out,
  // so its content doesn't vanish a frame before the animation finishes.
  const shown = selectedItem ?? lastItemRef.current;

  return (
    <div className="relative w-full h-[78vh] bg-[#080808] border border-white/5 rounded-2xl overflow-hidden shadow-[inset_0_4px_30px_rgba(0,0,0,0.9)] group/gallery">
      {/* ThreeJS Canvas */}
      <Canvas
        id="three-canvas-root"
        shadows
        camera={{ position: [0, 3.2, 9.5], fov: 48 }}
        gl={{ antialias: true, alpha: false, preserveDrawingBuffer: true }}
      >
        <color attach="background" args={['#060606']} />
        
        {/* Soft Ambient Fog for dramatic depth */}
        <fog attach="fog" args={['#060606', 7, 18]} />

        {/* Global Lights */}
        <ambientLight intensity={1.5} color="#0c0d12" />
        <directionalLight 
          position={[5, 10, 5]} 
          intensity={0.4} 
          color="#a3b8cc" 
          castShadow 
          shadow-mapSize={[1024, 1024]}
        />
        
        {/* Glowing concentric decorative rings representing light on the ground */}
        <group position={[0, 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <mesh>
            <ringGeometry args={[1.9, 1.93, 64]} />
            <meshBasicMaterial color="#C8A15A" transparent opacity={0.16} side={THREE.DoubleSide} />
          </mesh>
          <mesh>
            <ringGeometry args={[3.8, 3.84, 64]} />
            <meshBasicMaterial color="#C8A15A" transparent opacity={0.1} side={THREE.DoubleSide} />
          </mesh>
          <mesh>
            <ringGeometry args={[6.4, 6.45, 64]} />
            <meshBasicMaterial color="#C8A15A" transparent opacity={0.06} side={THREE.DoubleSide} />
          </mesh>
        </group>

        {/* Polished Black Obsidian Museum Floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0, 0]}>
          <planeGeometry args={[35, 35]} />
          <meshStandardMaterial 
            color="#080808" 
            roughness={0.18} 
            metalness={0.9} 
          />
        </mesh>

        {/* Central Pedestal / Bench */}
        <CentralBench />

        {/* Circular Arrangement of Artworks */}
        <group position={[0, ARTWORK_Y, 0]}>
          {GALLERY_ITEMS.map((item, index) => {
            const theta = (index / GALLERY_ITEMS.length) * Math.PI * 2;
            const x = GALLERY_RADIUS * Math.cos(theta);
            const z = GALLERY_RADIUS * Math.sin(theta);
            
            return (
              <GalleryWall
                key={item.id}
                item={item}
                position={[x, 0, z]}
                rotationY={theta}
                isSelected={selectedItem?.id === item.id}
                onSelect={() => handleSelectArtwork(item)}
              />
            );
          })}
        </group>

        {/* Camera gliding controller (only active during a focus transition) */}
        <CameraController
          selectedItem={selectedItem}
          items={GALLERY_ITEMS}
          controlsRef={controlsRef}
          isTransitioning={isTransitioning}
          setIsTransitioning={setIsTransitioning}
        />

        {/* Auto rotating script */}
        <AutoOrbit active={autoTour} selectedItem={selectedItem} isTransitioning={isTransitioning} />

        {/* Standard Interactive Orbit Controls (manual drag/zoom) */}
        <OrbitControls
          ref={controlsRef}
          enabled={!isTransitioning}
          enableDamping
          dampingFactor={0.05}
          maxPolarAngle={Math.PI / 2 - 0.05} // prevent going underneath floor
          minDistance={1.8}
          maxDistance={12.0}
        />
      </Canvas>

      {/* ==================== FRONTEND HUD INTERFACE OVERLAYS ==================== */}

      {/* Gallery Title Block */}
      <div className="absolute top-4 left-4 bg-brand-black/80 backdrop-blur-md border border-white/10 px-4 py-3 rounded-xl flex items-center space-x-3 pointer-events-auto">
        <div className="w-9 h-9 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-brand-gold animate-pulse">
          <Compass size={18} />
        </div>
        <div>
          <span className="text-[9px] text-brand-gold tracking-[0.3em] uppercase block font-semibold leading-none mb-1">
            Jarin Atelier Virtual Showroom
          </span>
          <h3 className="font-serif text-sm text-white font-medium">
            3D Immersive Salon
          </h3>
        </div>
      </div>

      {/* Help Instructions Overlay */}
      {showHelp && (
        <div className="absolute top-20 right-4 max-w-xs bg-brand-black/90 backdrop-blur-md border border-white/10 p-4 rounded-xl text-xs space-y-3 pointer-events-auto shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <span className="font-serif text-brand-gold uppercase tracking-widest font-semibold text-[10px]">
              How to Navigate
            </span>
            <button 
              onClick={() => setShowHelp(false)}
              className="text-gray-500 hover:text-white"
            >
              <X size={14} />
            </button>
          </div>
          
          <ul className="space-y-2 text-gray-300 font-light text-[11px]">
            <li className="flex items-center space-x-2">
              <span className="text-brand-gold">🖱️</span>
              <span><strong>Drag</strong> left/right to rotate view</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-brand-gold">🛞</span>
              <span><strong>Scroll</strong> or pinch to zoom in/out</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-brand-gold">👆</span>
              <span><strong>Click any Painting</strong> to step closer & focus</span>
            </li>
          </ul>
        </div>
      )}

      {/* Floating HUD Controls Bar (Center-Bottom) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-3 bg-brand-black/90 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-full pointer-events-auto shadow-2xl">
        <button
          id="hud-autotour-toggle"
          onClick={() => setAutoTour(!autoTour)}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-[11px] tracking-wider uppercase font-medium transition-all ${
            autoTour 
              ? 'bg-brand-gold/20 text-brand-gold border border-brand-gold/30' 
              : 'bg-white/5 text-gray-300 hover:text-white border border-transparent'
          }`}
          title="Slowly orbit the gallery"
        >
          {autoTour ? <Pause size={12} /> : <Play size={12} />}
          <span>Auto Tour</span>
        </button>

        <div className="h-5 w-[1px] bg-white/10" />

        <button
          id="hud-reset-view"
          onClick={handleResetView}
          className="p-1.5 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          title="Reset to Panoramic View"
        >
          <RotateCcw size={15} />
        </button>

        <button
          id="hud-help-toggle"
          onClick={() => setShowHelp(!showHelp)}
          className={`p-1.5 rounded-full transition-colors ${
            showHelp ? 'bg-brand-gold/10 text-brand-gold' : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
          }`}
          title="Toggle Navigation Guide"
        >
          <HelpCircle size={15} />
        </button>
      </div>

      {/* Masterpiece Showcase Panel (Launches when active painting is selected) */}
      <div className="absolute right-4 top-4 bottom-4 w-80 max-w-[85vw] bg-brand-black/95 backdrop-blur-lg border border-brand-gold/20 rounded-2xl p-5 flex flex-col justify-between pointer-events-auto transition-all duration-500 shadow-2xl translate-x-0 overflow-y-auto"
        style={{ transform: selectedItem ? 'translateX(0)' : 'translateX(calc(100% + 24px))' }}
      >
        {shown && (
          <div className="flex-1 flex flex-col justify-between space-y-4">
            
            {/* Header / Dismiss */}
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div>
                <span className="text-[9px] text-brand-gold tracking-[0.25em] uppercase block font-semibold">
                  ACTIVE EXHIBITION
                </span>
                <span className="text-[10px] text-gray-400 font-sans tracking-widest uppercase">
                  {shown.imageLabel}
                </span>
              </div>
              <button 
                id="showcase-panel-close"
                onClick={() => setSelectedItem(null)}
                className="p-1.5 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X size={15} />
              </button>
            </div>

            {/* Artwork Info */}
            <div className="space-y-4 flex-1">
              <div className="rounded-lg overflow-hidden border border-white/5 bg-[#121212]/50 aspect-video relative flex items-center justify-center p-2">
                <img
                  src={shown.imageUrl}
                  alt={shown.title}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover rounded"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              </div>

              <div>
                <h4 className="font-serif text-lg text-white font-medium leading-snug">
                  {shown.title}
                </h4>
                {shown.arabicTitle && (
                  <p className="font-arabic text-md text-brand-gold mt-1">
                    {shown.arabicTitle}
                  </p>
                )}
                <span className="inline-block mt-1 px-2.5 py-0.5 rounded bg-brand-gold/10 border border-brand-gold/20 text-[9px] text-brand-gold tracking-widest uppercase font-sans">
                  {shown.category} COLLECTION
                </span>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] text-gray-400 font-sans tracking-widest uppercase flex items-center space-x-1.5">
                  <Info size={12} className="text-brand-gold" />
                  <span>Exhibition Note</span>
                </span>
                <p className="text-xs text-gray-300 font-light leading-relaxed">
                  {shown.description}
                </p>
              </div>
            </div>

            {/* Quick Navigation Slider */}
            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <button
                id="showcase-nav-prev"
                onClick={handlePrevArtwork}
                className="px-3 py-1.5 rounded bg-white/5 text-xs text-gray-300 hover:text-white transition-colors"
              >
                Prev
              </button>
              
              <button
                id="showcase-action-examine"
                onClick={() => onOpenFullResolution(shown)}
                className="px-3 py-1.5 rounded bg-brand-gold text-brand-black text-xs font-semibold hover:bg-brand-gold-dark transition-colors flex items-center space-x-1"
              >
                <Maximize2 size={12} />
                <span>Examine Lens</span>
              </button>

              <button
                id="showcase-nav-next"
                onClick={handleNextArtwork}
                className="px-3 py-1.5 rounded bg-white/5 text-xs text-gray-300 hover:text-white transition-colors"
              >
                Next
              </button>
            </div>

          </div>
        )}
      </div>

      {/* Left Sidebar Interactive Teleporter Nav Rail */}
      <div className="absolute left-4 bottom-20 top-20 w-12 hover:w-52 bg-brand-black/80 backdrop-blur-md border border-white/10 rounded-2xl flex flex-col py-4 px-2 transition-all duration-300 overflow-hidden pointer-events-auto shadow-2xl select-none group/rail">
        <div className="flex items-center space-x-3 text-brand-gold px-1.5 mb-4 font-serif">
          <Layers size={16} className="shrink-0" />
          <span className="text-[10px] tracking-wider uppercase font-semibold whitespace-nowrap opacity-0 group-hover/rail:opacity-100 transition-opacity duration-200">
            Select Wall
          </span>
        </div>
        
        <div className="flex-1 flex flex-col justify-between space-y-1.5 overflow-y-auto no-scrollbar">
          {GALLERY_ITEMS.map((item, idx) => (
            <button
              id={`rail-item-${item.id}`}
              key={item.id}
              onClick={() => handleSelectArtwork(item)}
              className={`w-full flex items-center text-left py-1.5 px-2 rounded-lg transition-all ${
                selectedItem?.id === item.id
                  ? 'bg-brand-gold text-brand-black font-semibold'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className={`text-[10px] shrink-0 w-4 font-mono ${
                selectedItem?.id === item.id ? 'text-brand-black' : 'text-brand-gold'
              }`}>
                0{idx + 1}
              </span>
              <span className="text-[11px] truncate whitespace-nowrap opacity-0 group-hover/rail:opacity-100 transition-opacity duration-200 ml-1">
                {item.title}
              </span>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
