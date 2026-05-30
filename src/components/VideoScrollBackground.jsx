export default function VideoScrollBackground() {
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: 0,
        filter: 'blur(1.5px) brightness(0.62) contrast(1.15) saturate(1.15)',
        transform: 'scale(1.04)',
        pointerEvents: 'none',
        willChange: 'transform',
      }}
    >
      <source src="/hero-bg.mp4" type="video/mp4" />
    </video>
  )
}
