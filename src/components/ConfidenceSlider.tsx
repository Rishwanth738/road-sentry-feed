import { Sliders } from 'lucide-react';

interface ConfidenceSliderProps {
  value: number;
  onChange: (value: number) => void;
}

const ConfidenceSlider = ({ value, onChange }: ConfidenceSliderProps) => {
  return (
    <div className="glass-card rounded-xl p-4">
      <div className="flex items-center gap-2 mb-4">
        <Sliders className="w-5 h-5 text-accent" />
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Control Panel</h3>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-sm text-muted-foreground">Confidence Threshold</label>
          <span className="text-lg font-bold font-mono neon-text">{value}%</span>
        </div>
        
        <div className="relative">
          <input
            type="range"
            min="0"
            max="100"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider-thumb"
            style={{
              background: `linear-gradient(to right, hsl(var(--neon-cyan)) 0%, hsl(var(--neon-cyan)) ${value}%, hsl(var(--muted)) ${value}%, hsl(var(--muted)) 100%)`
            }}
          />
          <style>{`
            .slider-thumb::-webkit-slider-thumb {
              appearance: none;
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: hsl(var(--neon-cyan));
              cursor: pointer;
              box-shadow: 0 0 10px hsl(var(--neon-cyan) / 0.5);
              transition: all 0.2s ease;
            }
            
            .slider-thumb::-webkit-slider-thumb:hover {
              transform: scale(1.2);
              box-shadow: 0 0 20px hsl(var(--neon-cyan) / 0.8);
            }
            
            .slider-thumb::-moz-range-thumb {
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: hsl(var(--neon-cyan));
              cursor: pointer;
              border: none;
              box-shadow: 0 0 10px hsl(var(--neon-cyan) / 0.5);
              transition: all 0.2s ease;
            }
            
            .slider-thumb::-moz-range-thumb:hover {
              transform: scale(1.2);
              box-shadow: 0 0 20px hsl(var(--neon-cyan) / 0.8);
            }
          `}</style>
        </div>
        
        <p className="text-xs text-muted-foreground">
          Detections below {value}% confidence will be filtered out
        </p>
      </div>
    </div>
  );
};

export default ConfidenceSlider;
