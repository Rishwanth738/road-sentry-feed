import { Video } from 'lucide-react';
import DetectionBox from './DetectionBox';

interface Detection {
  id: string;
  label: string;
  confidence: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface LiveFeedProps {
  detections: Detection[];
  confidenceThreshold: number;
}

const LiveFeed = ({ detections, confidenceThreshold }: LiveFeedProps) => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted/20 to-background rounded-2xl border-2 border-border overflow-hidden relative">
      {/* Video placeholder with grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full grid grid-cols-12 grid-rows-12">
          {Array.from({ length: 144 }).map((_, i) => (
            <div key={i} className="border border-accent/10" />
          ))}
        </div>
      </div>
      
      {/* Mock video feed indicator */}
      <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-2 rounded-lg bg-background/80 backdrop-blur-sm border border-accent/30">
        <div className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
        <Video className="w-4 h-4 text-accent" />
        <span className="text-xs font-semibold text-accent uppercase tracking-wider">Live Feed</span>
      </div>
      
      {/* Center placeholder text */}
      <div className="text-center z-10 p-8">
        <Video className="w-20 h-20 text-accent/30 mx-auto mb-4" />
        <p className="text-lg text-muted-foreground">Camera feed simulation</p>
        <p className="text-sm text-muted-foreground mt-2">Detection boxes will appear here</p>
      </div>
      
      {/* Detection boxes overlay */}
      {detections.map((detection) => (
        <DetectionBox
          key={detection.id}
          label={detection.label}
          confidence={detection.confidence}
          x={detection.x}
          y={detection.y}
          width={detection.width}
          height={detection.height}
          isVisible={detection.confidence >= confidenceThreshold / 100}
        />
      ))}
    </div>
  );
};

export default LiveFeed;
