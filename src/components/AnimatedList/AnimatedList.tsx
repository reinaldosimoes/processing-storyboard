import { cn } from "../../utils/cn";
import { AnimatePresence, motion } from "motion/react";
import React, { ComponentPropsWithoutRef, useMemo } from "react";

/**
 * Individual item wrapper with spring animations for the AnimatedList
 * Provides smooth scale and opacity transitions for each list item
 */
export function AnimatedListItem({ children }: { children: React.ReactNode }) {
  const animations = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1, originY: 0 },
    exit: { scale: 0, opacity: 0 },
    transition: { type: "spring" as const, stiffness: 350, damping: 40 },
  };

  return (
    <motion.div {...animations} layout className="mx-auto w-full">
      {children}
    </motion.div>
  );
}

export interface AnimatedListProps extends ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
  revealedCount?: number; // Controls how many items to show (for progressive reveal)
}

/**
 * AnimatedList component for smooth, staggered list animations
 *
 * Features:
 * - Progressive reveal with controlled timing via revealedCount
 * - Spring-based animations for natural movement
 * - Reverse order display (newest items first)
 * - Optimized with React.memo for performance
 *
 * Usage:
 * <AnimatedList revealedCount={3}>
 *   {items.map(item => <Item key={item.id} />)}
 * </AnimatedList>
 */
export const AnimatedList = React.memo(
  ({ children, className, revealedCount, ...props }: AnimatedListProps) => {
    const childrenArray = useMemo(
      () => React.Children.toArray(children),
      [children]
    );

    // Show items based on revealedCount, default to showing all
    const itemsToShow = useMemo(() => {
      const count = revealedCount ?? childrenArray.length;
      const result = childrenArray.slice(0, count).reverse();
      return result;
    }, [childrenArray, revealedCount]);

    return (
      <div
        className={cn(`flex flex-col items-center gap-4`, className)}
        {...props}
      >
        <AnimatePresence>
          {itemsToShow.map((item) => (
            <AnimatedListItem key={(item as React.ReactElement).key}>
              {item}
            </AnimatedListItem>
          ))}
        </AnimatePresence>
      </div>
    );
  }
);

AnimatedList.displayName = "AnimatedList";
