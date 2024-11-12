# Automatic Model Router Documentation

## Overview

The AutoRouter provides automatic routing between "strong" and "weak" language models based on sophisticated prompt content analysis. It evaluates structural, linguistic, and semantic features to determine optimal model selection, requiring no configuration, training data, or user intervention.

## Core Features

- Multi-dimensional complexity analysis
- Automatic detection of complexity indicators
- Semantic content evaluation
- No configuration required
- No training data needed
- TypeScript support
- Lightweight implementation

## Routing Logic

The router determines complexity through three main dimensions:

### 1. Structural Analysis

- Information entropy analysis
- Symbol-to-text ratio evaluation
- Code pattern detection

### 2. Linguistic Analysis

- Average word length assessment
- Sentence length analysis
- Nested clause detection
- Grammatical complexity evaluation

### 3. Complexity Indicators

Detects complexity-indicating terms across categories:

- Analysis & Reasoning: analyze, evaluate, synthesize
- Design & Creation: design, develop, architect
- Explanation: explain, elaborate, demonstrate
- Problem Solving: solve, optimize, resolve
- Research & Theory: research, theorize, hypothesize
- Critical Thinking: argue, debate, justify
- Exploratory Thinking: explore, brainstorm, conceptualize

## Installation and Usage

### Option 1: Direct File Integration

1. Copy `router.ts` into your project
2. Import and use:

```typescript
import { GeneralizedRouter } from './router';

const router = new GeneralizedRouter();

// Function to map router decisions to your models
function getModel(prompt: string) {
  const result = router.route(prompt);

  // Map to your specific models
  if (result.model === 'strong') {
    return 'gpt-4-1106-preview'; // or your preferred strong model
  } else {
    return 'gpt-3.5-turbo'; // or your preferred weak model
  }
}

// Example usage
async function generateResponse(prompt: string) {
  const modelToUse = getModel(prompt);

  // Use with OpenAI
  const completion = await openai.chat.completions.create({
    model: modelToUse,
    messages: [{ role: "user", content: prompt }]
  });

  return completion.choices[0].message;
}

// Use with Anthropic
async function generateAnthropicResponse(prompt: string) {
  const model = getModel(prompt) === 'strong' 
    ? 'claude-2.1' 
    : 'claude-instant-1.2';

  const message = await anthropic.messages.create({
    model: model,
    messages: [{ role: "user", content: prompt }]
  });

  return message;
}
```

### Option 2: NPM Package (Coming Soon)

```bash
npm install llm-auto-router
```

```typescript
import { GeneralizedRouter } from 'llm-auto-router';

const router = new GeneralizedRouter();
```

### Usage Examples

#### Basic Usage

```typescript
const router = new GeneralizedRouter();

// Simple routing
const result = router.route("What's the weather?");
console.log(result.model); // 'weak'

// Get full metrics
const resultWithMetrics = router.route("Analyze quantum mechanics");
console.log(resultWithMetrics);
// {
//   model: 'strong',
//   metrics: {
//     structural: { ... },
//     linguistic: { ... }
//   }
// }
```

## Performance Considerations

- Efficient string operations
- Minimal memory footprint
- No external dependencies
- Suitable for web environments
- No network requests required
- O(n) complexity for input length

## Implementation Details

- Written in TypeScript
- Returns detailed metrics with each decision
- Zero external dependencies
- Transparent scoring system
- Configurable thresholds if needed
- Extensible indicator patterns

## Metrics Returned

Each routing decision includes detailed metrics:

```typescript
interface ComplexityMetrics {
  structural: {
    length: number;    // Raw text length
    entropy: number;   // Information density
    symbolRatio: number; // Non-alphabetic ratio
  };
  linguistic: {
    avgWordLength: number;      // Mean word length
    avgSentenceLength: number;  // Words per sentence
    nestedClauses: number;      // Clause depth
    complexityIndicators: number; // Complexity terms found
  };
}
```

## Reliability

- Handles edge cases (very short or very long prompts)
- Bias towards over-classification rather than under-classification
- Validated against extensive test suite (run `npm test` to see results)
- Consistent results across different content domains

## Requirements

```json
{
  "devDependencies": {
    "@types/node": "^22.9.0",
    "ts-node": "^10.9.2",
    "typescript": "^5.6.3"
  }
}
```

To install:

```bash
npm install
```

For development/testing:

```bash
npm run test
```

## Files Needed

- Only `router.ts` is required for production use
- `test-cases.ts` and other files are for testing/development

## Integration

Simply import the GeneralizedRouter class and instantiate it. No configuration needed, though thresholds and weights can be customized if required.

## Contributing

Feel free to open issues or submit pull requests. The test suite can be run to verify changes:

```bash
npm test
```
