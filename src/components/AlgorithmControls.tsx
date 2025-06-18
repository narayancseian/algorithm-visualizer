import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

interface AlgorithmControlsProps {
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  onNextStep: () => void;
  onPrevStep: () => void;
  isPlaying: boolean;
  onSpeedChange: (value: number) => void;
  speed: number;
  disabled?: boolean;
}

const AlgorithmControls = ({
  onPlay,
  onPause,
  onReset,
  onNextStep,
  onPrevStep,
  isPlaying,
  onSpeedChange,
  speed,
  disabled = false,
}: AlgorithmControlsProps) => {
  return (
    <div className="flex flex-col gap-4 p-4 bg-card shadow rounded-lg">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="icon"
          onClick={onReset}
          disabled={disabled}
        >
          <SkipBack className="h-4 w-4" />
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          onClick={onPrevStep}
          disabled={disabled}
        >
          <SkipBack className="h-4 w-4" />
        </Button>
        
        <Button
          variant={isPlaying ? "outline" : "default"}
          onClick={isPlaying ? onPause : onPlay}
          disabled={disabled}
        >
          {isPlaying ? (
            <>
              <Pause className="h-4 w-4 mr-2" /> Pause
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-2" /> Play
            </>
          )}
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          onClick={onNextStep}
          disabled={disabled}
        >
          <SkipForward className="h-4 w-4" />
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          onClick={onReset}
          disabled={disabled}
        >
          <SkipBack className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">Slow</span>
        <Slider
          value={[speed]}
          min={10}
          max={200}
          step={10}
          onValueChange={(value) => onSpeedChange(value[0])}
          disabled={disabled}
        />
        <span className="text-sm text-muted-foreground">Fast</span>
      </div>
    </div>
  );
};

export default AlgorithmControls;