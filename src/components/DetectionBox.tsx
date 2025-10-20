interface DetectionBoxProps {
  label: string;
  confidence: number;
  x: number;
  y: number;
  width: number;
  height: number;
  isVisible: boolean;
}

const DetectionBox = ({ label, confidence, x, y, width, height, isVisible }: DetectionBoxProps) => {
  if (!isVisible) return null;

  return (
    <div
      className="absolute border-2 neon-border detection-pulse animate-fade-in"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${width}%`,
        height: `${height}%`,
        transition: 'all 0.3s ease-out',
      }}
    >
      <div className="absolute -top-8 left-0 px-2 py-1 rounded text-xs font-semibold neon-text bg-background/90 backdrop-blur-sm">
        {label} <span className="text-muted-foreground">({(confidence * 100).toFixed(0)}%)</span>
      </div>
    </div>
  );
};

export default DetectionBox;
