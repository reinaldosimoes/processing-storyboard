/**
 * Demo steps configuration
 *
 * To modify the steps:
 * 1. Each step requires a title, type, and payload array
 * 2. Available step types: 'validate', 'enrich', 'external', 'fraud', 'risk', 'persist', 'notify', 'payment', 'success'
 * 3. Each payload item requires a key and value
 * 4. Maintain the Step type structure from '../types/api'
 *
 * Example step structure:
 * {
 *   title: "Step Title",
 *   type: "stepType",
 *   payload: [
 *     {
 *       key: "Key Name",
 *       value: "Value Content"
 *     }
 *   ]
 * }
 */

import { Step } from "../types/api";

export const MOCK_STEPS: Step[] = [
  {
    title: "Initial Setup",
    type: "validate",
    payload: [
      {
        key: "Configuration",
        value: "Completed",
      },
      {
        key: "Environment",
        value: "Development",
      },
      {
        key: "Version",
        value: "1.0.1",
      },
      {
        key: "Features",
        value: "Core, Advanced",
      },
    ],
  },
  {
    title: "Data Collection",
    type: "enrich",
    payload: [
      {
        key: "Source",
        value: "Primary",
      },
      {
        key: "Format",
        value: "JSON",
      },
      {
        key: "Size",
        value: "2.5MB",
      },
      {
        key: "Records",
        value: "1,000",
      },
    ],
  },
  {
    title: "Data Validation",
    type: "external",
    payload: [
      {
        key: "Schema Check",
        value: "Passed",
      },
      {
        key: "Data Types",
        value: "Valid",
      },
      {
        key: "Required Fields",
        value: "Complete",
      },
      {
        key: "Format Check",
        value: "Success",
      },
    ],
  },
  {
    title: "Security Check",
    type: "fraud",
    payload: [
      {
        key: "Authentication",
        value: "Verified",
      },
      {
        key: "Authorization",
        value: "Confirmed",
      },
      {
        key: "Encryption",
        value: "Active",
      },
      {
        key: "Compliance",
        value: "Met",
      },
    ],
  },
  {
    title: "Processing",
    type: "risk",
    payload: [
      {
        key: "Status",
        value: "In Progress",
      },
      {
        key: "Progress",
        value: "75%",
      },
      {
        key: "Queue Position",
        value: "1",
      },
      {
        key: "Estimated Time",
        value: "2 minutes",
      },
    ],
  },
  {
    title: "Data Storage",
    type: "persist",
    payload: [
      {
        key: "Database",
        value: "Connected",
      },
      {
        key: "Storage Type",
        value: "Primary",
      },
      {
        key: "Backup",
        value: "Enabled",
      },
      {
        key: "Last Updated",
        value: "2024-03-20T15:30:00Z",
      },
    ],
  },
  {
    title: "Notification Setup",
    type: "notify",
    payload: [
      {
        key: "Channel",
        value: "Webhook",
      },
      {
        key: "Recipients",
        value: "3",
      },
      {
        key: "Template",
        value: "Standard",
      },
      {
        key: "Status",
        value: "Active",
      },
    ],
  },
  {
    title: "Action Execution",
    type: "payment",
    payload: [
      {
        key: "Action ID",
        value: "act_123456789",
      },
      {
        key: "Priority",
        value: "High",
      },
      {
        key: "Status",
        value: "Pending",
      },
      {
        key: "Schedule",
        value: "Immediate",
      },
    ],
  },
  {
    title: "Process Complete",
    type: "success",
    payload: [
      {
        key: "Status",
        value: "Success",
      },
      {
        key: "Process ID",
        value: "proc_123456789",
      },
      {
        key: "Duration",
        value: "3.2s",
      },
      {
        key: "Next Steps",
        value: "Monitor results",
      },
    ],
  },
];
