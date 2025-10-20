import { useState, useEffect } from 'react';
import { Car, Zap, Timer } from 'lucide-react';
import LiveFeed from '@/components/LiveFeed';
import DetectionLog from '@/components/DetectionLog';
import MetricsCard from '@/components/MetricsCard';
import ConfidenceSlider from '@/components/ConfidenceSlider';

interface Detection {
  id: string;
  label: string;
  confidence: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface LogEntry {
  id: string;
  timestamp: string;
  hazard: string;
  confidence: number;
}

const hazardTypes = ['Pothole', 'Debris', 'Pedestrian', 'Cyclist', 'Vehicle', 'Road Crack', 'Water Puddle'];

const generateRandomDetection = (): Detection => {
  return {
    id: Math.random().toString(36).substr(2, 9),
    label: hazardTypes[Math.floor(Math.random() * hazardTypes.length)],
    confidence: 0.65 + Math.random() * 0.35, // 65-100%
    x: 10 + Math.random() * 60, // 10-70%
    y: 20 + Math.random() * 50, // 20-70%
    width: 15 + Math.random() * 20, // 15-35%
    height: 15 + Math.random() * 20, // 15-35%
  };
};

const Index = () => {
  const [detections, setDetections] = useState<Detection[]>([]);
  const [logEntries, setLogEntries] = useState<LogEntry[]>([]);
  const [confidenceThreshold, setConfidenceThreshold] = useState(75);
  const [fps, setFps] = useState(28);
  const [inferenceTime, setInferenceTime] = useState(35);
  const [isWebcamOn, setIsWebcamOn] = useState(false);

  // Removed automatic detection simulation
  // Detection logic can be added here when connecting to real AI model

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      {/* Header */}
      <header className="mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-accent/10 border border-accent/30">
            <Car className="w-8 h-8 text-accent" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold neon-text">RoadSentry AI</h1>
            <p className="text-sm text-muted-foreground">Live Hazard Detection System</p>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-140px)]">
        {/* Main Content - Video Feed (75% width on desktop) */}
        <div className="lg:col-span-3 h-full">
          <LiveFeed 
            detections={detections} 
            confidenceThreshold={confidenceThreshold}
            isWebcamOn={isWebcamOn}
          />
        </div>

        {/* Sidebar (25% width on desktop) */}
        <div className="lg:col-span-1 flex flex-col gap-4 h-full overflow-hidden">
          {/* Detection Log - Takes most space */}
          <div className="flex-1 min-h-0">
            <DetectionLog entries={logEntries} />
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-2 gap-3">
            <MetricsCard
              label="Inference Time"
              value={inferenceTime.toString()}
              unit="ms"
              icon={<Timer className="w-5 h-5" />}
            />
            <MetricsCard
              label="FPS"
              value={fps.toString()}
              icon={<Zap className="w-5 h-5" />}
            />
          </div>

          {/* Control Panel */}
          <ConfidenceSlider
            value={confidenceThreshold}
            onChange={setConfidenceThreshold}
            isWebcamOn={isWebcamOn}
            onWebcamToggle={() => setIsWebcamOn(!isWebcamOn)}
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-4 text-center">
        <p className="text-xs text-muted-foreground">
          Powered by Computer Vision • Real-time Detection • AI-Driven Safety
        </p>
      </footer>
    </div>
  );
};

export default Index;
