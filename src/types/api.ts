import { OperationType } from "./operations";

export interface PayloadItem {
  key: string;
  value: string | number;
}

export interface Step {
  title: string;
  type: OperationType;
  payload: PayloadItem[];
}

export interface ProcessingProps {
  steps: Step[];
}
