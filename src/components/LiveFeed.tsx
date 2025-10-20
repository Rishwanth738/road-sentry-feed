import { Video, AlertCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
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
  isWebcamOn: boolean;
}

const LiveFeed = ({ detections, confidenceThreshold, isWebcamOn }: LiveFeedProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let stream: MediaStream | null = null;

    const startWebcam = async () => {
      if (!isWebcamOn) {
        // Stop webcam if it's on
        if (videoRef.current && videoRef.current.srcObject) {
          const currentStream = videoRef.current.srcObject as MediaStream;
          currentStream.getTracks().forEach(track => track.stop());
          videoRef.current.srcObject = null;
        }
        setError('');
        return;
      }

      try {
        setIsLoading(true);
        setError('');
        
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: 'environment' // Try to use back camera on mobile
          } 
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setIsLoading(false);
      } catch (err) {
        console.error('Error accessing webcam:', err);
        setError('Unable to access camera. Please check permissions.');
        setIsLoading(false);
      }
    };

    startWebcam();

    // Cleanup function
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isWebcamOn]);

  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted/20 to-background rounded-2xl border-2 border-border overflow-hidden relative">
      {/* Actual video element */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={`absolute inset-0 w-full h-full object-cover ${isWebcamOn ? 'opacity-100' : 'opacity-0'}`}
      />
      
      {/* Video placeholder with grid pattern (shown when webcam is off) */}
      {!isWebcamOn && (
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full grid grid-cols-12 grid-rows-12">
            {Array.from({ length: 144 }).map((_, i) => (
              <div key={i} className="border border-accent/10" />
            ))}
          </div>
        </div>
      )}
      
      {/* Status indicator */}
      <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-2 rounded-lg bg-background/80 backdrop-blur-sm border border-accent/30 z-10">
        <div className={`w-2 h-2 rounded-full ${isWebcamOn ? 'bg-destructive animate-pulse' : 'bg-muted-foreground'}`} />
        <Video className="w-4 h-4 text-accent" />
        <span className="text-xs font-semibold text-accent uppercase tracking-wider">
          {isWebcamOn ? 'Live Feed' : 'Camera Off'}
        </span>
      </div>
      
      {/* Center placeholder text or error */}
      {!isWebcamOn && !error && !isLoading && (
        <div className="text-center z-10 p-8">
          <Video className="w-20 h-20 text-accent/30 mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">Camera feed disabled</p>
          <p className="text-sm text-muted-foreground mt-2">Enable webcam to start detection</p>
        </div>
      )}
      
      {isLoading && (
        <div className="text-center z-10 p-8">
          <div className="w-12 h-12 border-4 border-accent/30 border-t-accent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">Starting camera...</p>
        </div>
      )}
      
      {error && (
        <div className="text-center z-10 p-8">
          <AlertCircle className="w-20 h-20 text-destructive/50 mx-auto mb-4" />
          <p className="text-lg text-destructive">{error}</p>
          <p className="text-sm text-muted-foreground mt-2">Check browser permissions</p>
        </div>
      )}
      
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
