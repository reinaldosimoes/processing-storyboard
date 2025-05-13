import { motion, AnimatePresence } from "motion/react";
import { Step } from "../../types/api";
import { operations } from "../../types/operations";
import Card from "../Card/Card";
import { useEffect, useState } from "react";
import { Play, Pause, RefreshCw } from "lucide-react";
import Button from "../Button/Button";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

/**
 * Defines the latency intervals for different operation types
 * These values control how quickly each step progresses
 */
const LATENCY_INTERVALS = {
  slow: 400, // Slower operations like external API calls
  average: 300, // Standard operations
  fast: 200, // Quick operations like validation
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

  return (
    <div className="relative flex flex-col h-[600px] border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 rounded-lg overflow-hidden">
      {/* Header section with step counter and controls */}
      <div className="flex items-center justify-between p-4 bg-white dark:bg-black">
        <h2 className="text-md text-black dark:text-white">
          Step {Math.min(activeIndex + 1, steps.length)} of {steps.length}
        </h2>
        <div className="flex items-center gap-4">
          <ThemeToggle />

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
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
            <Button
              variant="secondary"
              size="sm"
              onClick={resetDemo}
              ariaLabel="Reset demo"
            >
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
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Main content area with animated steps */}
      <div className="flex-1 px-6 overflow-y-auto">
        <div className="relative w-full md:w-[400px] my-8 mx-auto flex flex-col gap-4">
          {/* AnimatePresence handles the mounting/unmounting of components
             initial={false} prevents initial animation on first render
             mode="popLayout" ensures proper layout animation when components are removed */}
          <AnimatePresence initial={false} mode="popLayout">
            {!allCompleted ? (
              <>
                {/* Active step animation:
                   - Starts at the top (z-50 ensures it stays above other steps)
                   - Slides down (y: 120) when it completes */}
                <motion.div
                  key="active"
                  exit={{ y: 120 }}
                  transition={{ duration: 0.3 }}
                  className="w-full z-50"
                >
                  <Card
                    title={steps[activeIndex].title}
                    description={
                      operations[steps[activeIndex].type].description
                    }
                    icon={operations[steps[activeIndex].type].icon}
                    iconColor={operations[steps[activeIndex].type].color}
                    payload={steps[activeIndex].payload}
                    progress={progress}
                    loading={progress === 100}
                  />
                </motion.div>

                {/* Completed steps animation:
                   - Each step has its own AnimatePresence for proper mounting/unmounting
                   - Starts from above (y: -120) and animates to its final position (y: 0)
                   - Uses spring animation for a more natural feel
                   - Steps are reversed to show newest completed at the top */}
                {steps
                  .slice(0, activeIndex)
                  .reverse()
                  .map((step, index) => {
                    const operation = operations[step.type];
                    return (
                      <AnimatePresence key={`container-${step.title}-${index}`}>
                        <motion.div
                          key={`completed-${step.title}-${index}`}
                          layout
                          initial={{ y: -120 }}
                          animate={{ y: 0 }}
                          exit={{ y: 120 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          }}
                          className="w-full"
                        >
                          <Card
                            title={step.title}
                            description={operation.description}
                            icon={operation.icon}
                            iconColor={operation.color}
                            payload={step.payload}
                            progress={100}
                            loading={true}
                          />
                        </motion.div>
                      </AnimatePresence>
                    );
                  })}
              </>
            ) : (
              /* Final state animation shows all steps in reverse order */
              <motion.div
                className="flex flex-col gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {steps
                  .slice()
                  .reverse()
                  .map((step, index) => {
                    const operation = operations[step.type];
                    return (
                      <AnimatePresence
                        key={`final-container-${step.title}-${index}`}
                      >
                        <motion.div
                          key={`final-${step.title}-${index}`}
                          layout
                          initial={{ y: -120 }}
                          animate={{ y: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          }}
                          className="w-full"
                        >
                          <Card
                            title={step.title}
                            description={operation.description}
                            icon={operation.icon}
                            iconColor={operation.color}
                            payload={step.payload}
                            progress={100}
                            loading={true}
                          />
                        </motion.div>
                      </AnimatePresence>
                    );
                  })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Processing;
