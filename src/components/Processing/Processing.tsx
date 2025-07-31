import { motion } from "motion/react";
import { Step } from "../../types/api";
import { operations } from "../../types/operations";
import Card from "../Card/Card";
import { AnimatedList } from "../AnimatedList/AnimatedList";
import { useEffect, useState } from "react";
import { Play, Pause, RefreshCw } from "lucide-react";
import Button from "../Button/Button";

const LATENCY_INTERVALS = {
  slow: 400,
  average: 300,
  fast: 200,
};

const ANIMATION_CONFIG = {
  duration: 0.4,
};

interface StepsProps {
  steps: Step[];
}

/**
 * Processing component that visualizes API call steps with animated progress tracking
 *
 * Features:
 * - Real-time progress visualization for each step
 * - Autoplay with configurable timing based on operation latency
 * - Progressive step reveal using AnimatedList
 * - Interactive controls (play/pause/reset)
 * - Smooth animations synchronized with processing logic
 */
const Processing = ({ steps }: StepsProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(1);

  useEffect(() => {
    if (!isAutoplay) return;

    const currentStep = steps[activeIndex];
    const operation = operations[currentStep.type];
    const interval = LATENCY_INTERVALS[operation.latency];

    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress((prev) => Math.min(prev + 10, 100));
      } else if (activeIndex < steps.length - 1) {
        setProgress(0);
        setActiveIndex((prev) => prev + 1);
        // Reveal next step in AnimatedList when current step completes
        setRevealedSteps((prev) => Math.min(prev + 1, steps.length));
      } else {
        setIsAutoplay(false);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [progress, activeIndex, steps, isAutoplay]);

  const toggleAutoplay = () => {
    setIsAutoplay(!isAutoplay);
    if (!isAutoplay && revealedSteps === 1) {
      setRevealedSteps(1);
    }
  };

  const resetDemo = () => {
    setActiveIndex(0);
    setProgress(0);
    setIsAutoplay(false);
    setRevealedSteps(1);
  };

  const renderCard = (step: Step, index: number) => {
    const operation = operations[step.type];
    const isActive = index === activeIndex;
    const isCompleted = index < activeIndex;

    return (
      <Card
        key={`${step.title}-${index}`}
        title={step.title}
        description={operation.description}
        icon={operation.icon}
        iconColor={operation.color}
        payload={step.payload}
        progress={isActive ? progress : 100}
        loading={isCompleted || progress === 100}
      />
    );
  };

  return (
    <div className="relative flex flex-col h-[600px] border border-black/5 dark:border-white/10 bg-black/1 dark:bg-white/5 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between p-4 bg-white dark:bg-black">
        <h2 className="text-sm text-black dark:text-white opacity-70 leading-relaxed">
          Step {Math.min(activeIndex + 1, steps.length)} of {steps.length}
        </h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              onClick={toggleAutoplay}
              ariaLabel={isAutoplay ? "Pause demo" : "Play demo"}
            >
              {isAutoplay ? (
                <Pause className="w-4 h-4 text-black dark:text-white" />
              ) : (
                <Play className="w-4 h-4 text-black dark:text-white" />
              )}
            </Button>

            <Button size="sm" onClick={resetDemo} ariaLabel="Reset demo">
              <RefreshCw className="w-4 h-4 text-black dark:text-white" />
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full h-1 bg-black/5 dark:bg-white/5">
        <motion.div
          className="h-full bg-blue-500"
          initial={{ width: 0 }}
          animate={{
            width: `${Math.min(
              ((activeIndex + progress / 100) / steps.length) * 100,
              100
            )}%`,
          }}
          transition={{ duration: ANIMATION_CONFIG.duration }}
        />
      </div>

      <div className="flex-1 px-6 overflow-y-auto">
        <div className="relative w-full md:w-[400px] my-8 mx-auto">
          <AnimatedList revealedCount={revealedSteps} className="gap-4">
            {steps.map((step, index) => renderCard(step, index))}
          </AnimatedList>
        </div>
      </div>
    </div>
  );
};

export default Processing;
