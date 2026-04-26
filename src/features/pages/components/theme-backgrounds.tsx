import Galaxy from '@/components/Galaxy'
import Grainient from '@/components/Grainient'
import Iridescence from '@/components/Iridescence'

export const backgroundComponents: Record<string, React.FC> = {
  holographic: () => (
    <Iridescence speed={0.4} amplitude={0.1} mouseReact={false} />
  ),
  aurora: () => (
    <Grainient
      color1="#06B6D4"
      color2="#5227FF"
      color3="#7c3aed"
      timeSpeed={0.25}
      colorBalance={-0.2}
      warpStrength={1}
      warpFrequency={5}
      warpSpeed={2}
      warpAmplitude={50}
      blendAngle={0}
      blendSoftness={0.05}
      rotationAmount={500}
      noiseScale={2}
      grainAmount={0.1}
      grainScale={2}
      grainAnimated={false}
      contrast={1.5}
      gamma={1}
      saturation={1}
      centerX={0}
      centerY={0}
      zoom={0.9}
    />
  ),
  galaxy: () => (
    <div className="absolute inset-0 -z-10 bg-[#070012]">
      <Galaxy
        starSpeed={0.5}
        density={1}
        hueShift={140}
        speed={1}
        glowIntensity={0.3}
        saturation={0}
        mouseRepulsion={false}
        repulsionStrength={2}
        twinkleIntensity={0.3}
        rotationSpeed={0.1}
        transparent
      />
    </div>
  ),
}
