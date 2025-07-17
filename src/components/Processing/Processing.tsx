import { motion, AnimatePresence } from "motion/react";
import type { Transition } from "motion/react";
import { Step } from "../../types/api";
import { operations } from "../../types/operations";
import Card from "../Card/Card";
import { useEffect, useState } from "react";
import { Play, Pause, RefreshCw } from "lucide-react";
import Button from "../Button/Button";

/**
 * Defines the latency intervals for different operation types
 * These values control how quickly each step progresses
 */
const LATENCY_INTERVALS = {
  slow: 400, // Slower operations like external API calls
  average: 300, // Standard operations
  fast: 200, // Quick operations like validation
};

/**
 * Animation configuration for consistent, smooth transitions
 */
const ANIMATION_CONFIG = {
  // Entry animation for new cards
  enter: {
    y: -120,
    opacity: 0,
    scale: 0.95,
  },
  // Exit animation for completed cards
  exit: {
    y: 120,
    opacity: 0,
    scale: 0.95,
  },
  // Active state animation
  active: {
    y: 0,
    opacity: 1,
    scale: 1,
  },
  // Spring configuration for natural movement
  spring: {
    type: "spring",
    stiffness: 400,
    damping: 35,
    mass: 0.8,
  } as Transition,
  // Duration for simple transitions
  duration: 0.4,
};

interface StepsProps {
  steps: Step[];
}

/**
 * Processing component that displays a sequence of steps with progress tracking
 * Features:
 * - Animated progress bars for each step
 * - Autoplay functionality
 * - Smooth transitions between steps
 * - Progress tracking and reset capabilities
 */
const Processing = ({ steps }: StepsProps) => {
  // Tracks the currently active step index
  const [activeIndex, setActiveIndex] = useState(0);
  // Tracks the progress of the current step (0-100)
  const [progress, setProgress] = useState(0);
  // Controls whether steps progress automatically
  const [isAutoplay, setIsAutoplay] = useState(false);

  /**
   * Handles the automatic progression of steps when autoplay is enabled
   * - Updates progress for the current step
   * - Moves to the next step when progress reaches 100%
   * - Stops autoplay when all steps are completed
   */
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
      } else {
        setIsAutoplay(false);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [progress, activeIndex, steps, isAutoplay]);

  // Toggles the autoplay state
  const toggleAutoplay = () => setIsAutoplay(!isAutoplay);

  // Resets the processing state to initial values
  const resetDemo = () => {
    setActiveIndex(0);
    setProgress(0);
    setIsAutoplay(false);
  };

  const allCompleted = activeIndex >= steps.length;

  /**
   * Renders a single card with consistent animation
   */
  const renderCard = (
    step: Step,
    index: number,
    isActive = false,
    isCompleted = false
  ) => {
    const operation = operations[step.type];
    const key = `${step.title}-${index}-${isActive ? "active" : "completed"}`;

    return (
      <AnimatePresence key={`container-${key}`}>
        <motion.div
          key={key}
          layout
          initial={ANIMATION_CONFIG.enter}
          animate={ANIMATION_CONFIG.active}
          exit={ANIMATION_CONFIG.exit}
          transition={ANIMATION_CONFIG.spring}
          className="w-full"
        >
          <Card
            title={step.title}
            description={operation.description}
            icon={operation.icon}
            iconColor={operation.color}
            payload={step.payload}
            progress={isActive ? progress : 100}
            loading={isCompleted || progress === 100}
          />
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div className="relative flex flex-col h-[600px] border border-black/5 dark:border-white/10 bg-black/1 dark:bg-white/5 rounded-lg overflow-hidden">
      {/* Header section with step counter and controls */}
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

      {/* Progress bar showing overall completion */}
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

      {/* Main content area with animated steps */}
      <div className="flex-1 px-6 overflow-y-auto">
        <div className="relative w-full md:w-[400px] my-8 mx-auto flex flex-col gap-4">
          <AnimatePresence initial={false} mode="popLayout">
            {!allCompleted ? (
              <>
                {/* Active step */}
                {renderCard(steps[activeIndex], activeIndex, true, false)}

                {/* Completed steps in reverse order */}
                {steps
                  .slice(0, activeIndex)
                  .reverse()
                  .map((step, index) => renderCard(step, index, false, true))}
              </>
            ) : (
              /* Final state - all steps completed */
              <motion.div
                className="flex flex-col gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: ANIMATION_CONFIG.duration }}
              >
                {steps
                  .slice()
                  .reverse()
                  .map((step, index) => renderCard(step, index, false, true))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Processing;
