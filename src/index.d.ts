import { ComponentType } from "react";

export interface Step {
  title: string;
  type: string;
  payload: Array<{
    key: string;
    value: string | number;
  }>;
}

export interface ProcessingProps {
  steps: Step[];
}

export declare const Processing: ComponentType<ProcessingProps>;
