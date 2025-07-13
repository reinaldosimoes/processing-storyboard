# Processing Storyboard - Usage Guide

## Quick Start

### Installation

```bash
npm install processing-storyboard
```

### Basic Usage

```tsx
import { Processing, Step } from "processing-storyboard";

const steps: Step[] = [
  {
    title: "Validate Input",
    type: "validate",
    payload: [
      { key: "Status", value: "Valid" },
      { key: "Format", value: "JSON" },
    ],
  },
  {
    title: "Process Data",
    type: "enrich",
    payload: [
      { key: "Records", value: "1,000" },
      { key: "Size", value: "2.5MB" },
    ],
  },
];

function App() {
  return <Processing steps={steps} />;
}
```

## Step Types

The component supports these operation types:

- `validate` - Data validation operations
- `enrich` - Data enrichment and transformation
- `external` - External API calls
- `fraud` - Security and fraud checks
- `risk` - Risk assessment
- `persist` - Database operations
- `notify` - Notification sending
- `payment` - Payment processing
- `success` - Final success state

## Customization

### Custom Latency Intervals

You can customize the animation speed by modifying the latency intervals:

```tsx
// In your Processing component
const LATENCY_INTERVALS = {
  slow: 600, // Slower operations
  average: 400, // Standard operations
  fast: 200, // Quick operations
};
```

### Custom Animation Configuration

```tsx
const ANIMATION_CONFIG = {
  enter: {
    y: -120,
    opacity: 0,
    scale: 0.95,
  },
  exit: {
    y: 120,
    opacity: 0,
    scale: 0.95,
  },
  spring: {
    type: "spring",
    stiffness: 400,
    damping: 35,
  },
};
```

## Advanced Examples

### Real-time API Monitoring

```tsx
import { Processing, Step } from "processing-storyboard";
import { useState, useEffect } from "react";

function APIMonitor() {
  const [steps, setSteps] = useState<Step[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const monitorAPI = async () => {
    setIsLoading(true);

    const apiSteps: Step[] = [
      {
        title: "Initiating Request",
        type: "validate",
        payload: [{ key: "Method", value: "POST" }],
      },
      {
        title: "Authenticating",
        type: "fraud",
        payload: [{ key: "Token", value: "Valid" }],
      },
      {
        title: "Processing Response",
        type: "enrich",
        payload: [{ key: "Status", value: "200 OK" }],
      },
    ];

    setSteps(apiSteps);
    setIsLoading(false);
  };

  return (
    <div>
      <button onClick={monitorAPI} disabled={isLoading}>
        {isLoading ? "Monitoring..." : "Start API Monitor"}
      </button>
      {steps.length > 0 && <Processing steps={steps} />}
    </div>
  );
}
```

### Multi-step Workflow

```tsx
const workflowSteps: Step[] = [
  {
    title: "User Authentication",
    type: "validate",
    payload: [
      { key: "User ID", value: "user_123" },
      { key: "Session", value: "Active" },
    ],
  },
  {
    title: "Data Validation",
    type: "external",
    payload: [
      { key: "Schema", value: "Valid" },
      { key: "Format", value: "Accepted" },
    ],
  },
  {
    title: "Business Logic",
    type: "enrich",
    payload: [
      { key: "Rules Applied", value: "5" },
      { key: "Transformations", value: "3" },
    ],
  },
  {
    title: "Database Update",
    type: "persist",
    payload: [
      { key: "Records Updated", value: "1" },
      { key: "Transaction ID", value: "txn_456" },
    ],
  },
  {
    title: "Notification Sent",
    type: "notify",
    payload: [
      { key: "Channel", value: "Email" },
      { key: "Recipient", value: "user@example.com" },
    ],
  },
  {
    title: "Workflow Complete",
    type: "success",
    payload: [
      { key: "Status", value: "Success" },
      { key: "Duration", value: "2.3s" },
    ],
  },
];
```

## Styling

The component uses Tailwind CSS classes. You can customize the appearance by:

1. **Overriding CSS classes** in your global styles
2. **Using CSS-in-JS** with styled-components or emotion
3. **Modifying the component** to accept custom className props

### Custom Theme Integration

```tsx
// Custom theme integration
const CustomProcessing = ({ steps, theme = "light" }) => {
  const themeClasses = {
    light: "bg-white text-black",
    dark: "bg-gray-900 text-white",
  };

  return (
    <div className={themeClasses[theme]}>
      <Processing steps={steps} />
    </div>
  );
};
```

## Performance Tips

1. **Memoize steps** if they're computed from props or state
2. **Use React.memo** for the Processing component if it re-renders frequently
3. **Limit payload size** - keep payload arrays under 10 items for best performance

```tsx
import { useMemo } from "react";

function OptimizedProcessing({ rawData }) {
  const steps = useMemo(() => {
    return transformDataToSteps(rawData);
  }, [rawData]);

  return <Processing steps={steps} />;
}
```

## Troubleshooting

### Common Issues

1. **Steps not animating**: Ensure all steps have valid `type` values
2. **Missing icons**: Check that all operation types are defined in the operations config
3. **Styling issues**: Verify Tailwind CSS is properly configured in your project

### Debug Mode

Enable debug logging by setting the environment variable:

```bash
DEBUG=processing-storyboard npm start
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines.

## License

MIT License - see [LICENSE](LICENSE) for details.
