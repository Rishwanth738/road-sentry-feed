import { useEffect, useRef } from 'react';
import { Activity } from 'lucide-react';

interface LogEntry {
  id: string;
  timestamp: string;
  hazard: string;
  confidence: number;
}

interface DetectionLogProps {
  entries: LogEntry[];
}

const DetectionLog = ({ entries }: DetectionLogProps) => {
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [entries]);

  return (
    <div className="glass-card rounded-xl p-4 h-full">
      <div className="flex items-center gap-2 mb-3">
        <Activity className="w-5 h-5 text-accent" />
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Detection Log</h3>
      </div>
      
      <div 
        ref={logRef}
        className="space-y-2 overflow-y-auto h-[calc(100%-2.5rem)] pr-2 scrollbar-thin scrollbar-thumb-accent/20 scrollbar-track-transparent"
      >
        {entries.map((entry) => (
          <div 
            key={entry.id} 
            className="p-2 bg-muted/30 rounded-lg border border-border/50 animate-slide-in hover:bg-muted/50 transition-colors"
          >
            <div className="flex justify-between items-start gap-2">
              <span className="text-xs font-mono text-muted-foreground">{entry.timestamp}</span>
              <span className="text-xs font-mono text-accent">{(entry.confidence * 100).toFixed(0)}%</span>
            </div>
            <p className="text-sm mt-1 text-foreground">
              <span className="font-semibold text-accent">{entry.hazard}</span> Detected
            </p>
          </div>
        ))}
        
        {entries.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-8">
            Waiting for detections...
          </p>
        )}
      </div>
    </div>
  );
};

export default DetectionLog;
