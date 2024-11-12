# LLM Decision Router

## Overview

The LLM Decision Router provides a suggestion for routing between "strong" and "weak" language models based on prompt content analysis. It evaluates structural, linguistic, and semantic features to determine optimal model selection, requiring no configuration, training data, or user intervention.

## Core Features

- Automatic detection of complexity indicators
- Semantic content evaluation
- No configuration required
- No training data needed
- TypeScript support
- Lightweight implementation

## Routing Logic

The router assesses prompts through two primary dimensions:

### 1. Structure Analysis

- Information density (Shannon entropy)
- Non-alphanumeric character ratio

### 2. Readability & Complexity

#### Text Readability

- Average word length
- Average sentence length
- Clause depth (using subordinate clauses and nested structures)

#### Cognitive Complexity

Detects cognitive verbs across categories:

- Analytical: analyze, evaluate, synthesize, examine, investigate
- Creative: design, develop, architect, formulate, devise, construct
- Explanatory: explain, integrate, elaborate, demonstrate, illustrate
- Comparative: compare, contrast, differentiate, distinguish
- Problem-Solving: solve, optimize, resolve, determine
- Research: research, theorize, hypothesize, predict
- Argumentative: argue, debate, justify, defend, prove
- Strategic: strategize, implement, propose
- Exploratory: explore, brainstorm, conceptualize, envision, imagine

A score above 0.5 routes to the strong model, below routes to the weak model.

## Installation and Usage

### Option 1: Direct Integration

1. Copy `router.ts` into your project
2. Import and use:

```typescript
import { LanguageModelRouter } from "./router";

const router = new LanguageModelRouter();

// Function to map router decisions to your models
function selectModel(prompt: string) {
  const result = router.route(prompt);

  // Map to your specific models
  return result.model === "strong"
    ? "gpt-4-0125-preview" // Your preferred strong model
    : "gpt-3.5-turbo-0125"; // Your preferred weak model
}

// Example: OpenAI
async function generateOpenAIResponse(prompt: string) {
  const model = selectModel(prompt);

  return await openai.chat.completions.create({
    model,
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });
}

// Example: Anthropic
async function generateAnthropicResponse(prompt: string) {
  const model =
    selectModel(prompt) === "strong"
      ? "claude-3-opus-20240229"
      : "claude-3-haiku-20240307";

  return await anthropic.messages.create({
    model,
    max_tokens: 1000,
    messages: [{ role: "user", content: prompt }],
  });
}

// Example: Custom routing with analysis
async function generateWithAnalysis(prompt: string) {
  const { model, analysis } = router.route(prompt);

  console.log("Prompt Analysis:", {
    structureScore: analysis.structure,
    readabilityScore: analysis.readability,
    selectedModel: model,
  });

  return await generateOpenAIResponse(prompt);
}
```

### Option 2: NPM Package (Coming Soon)

```bash
npm install llm-decision-router
```

```typescript
import { LanguageModelRouter } from "llm-decision-router";

const router = new LanguageModelRouter();
```

## Integration

Simply import the LanguageModelRouter class and instantiate it. No configuration needed, though thresholds and weights can be customized if required.

### Files Needed

- Only `router.ts` is required for production use
- `test-cases.ts` and other files are for testing/development

### Usage Examples

#### Basic Usage

```typescript
const result = router.route(
  "Analyze the implications of quantum computing on modern cryptography"
);
console.log(result);
// {
//   model: "strong",
//   analysis: {
//     structure: {
//       characterCount: 71,
//       informationDensity: 3.82,
//       nonAlphanumericRatio: 0.14
//     },
//     readability: {
//       wordLength: 6.8,
//       sentenceLength: 9.0,
//       clauseDepth: 3,
//       cognitiveComplexity: 2
//     },
//     complexity: 0.72  // Overall score that determined the model choice
//   }
// }

// Easy access to decision factors
const {
  model,
  analysis: { complexity },
} = result;
console.log(
  `Selected ${model} model (complexity: ${(complexity * 100).toFixed(1)}%)`
);
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

## Analysis Results

Each routing decision includes detailed prompt analysis:

```typescript
interface PromptAnalysis {
  structure: {
    characterCount: number;        // Total length in characters
    informationDensity: number;    // Shannon entropy score (0-4.5)
    nonAlphanumericRatio: number;  // Special character ratio (0-1)
  };
  readability: {
    wordLength: number;           // Average word length
    sentenceLength: number;       // Average words per sentence
    clauseDepth: number;          // Number of nested/subordinate clauses
    cognitiveComplexity: number;  // Count of cognitive verbs detected
  };
}

// Example analysis result:
{
  model: "strong",
  analysis: {
    structure: {
      characterCount: 145,
      informationDensity: 3.8,    // Higher values indicate more diverse characters
      nonAlphanumericRatio: 0.12  // Higher values indicate more special characters
    },
    readability: {
      wordLength: 5.2,        // Typical range: 4-8
      sentenceLength: 15.3,   // Typical range: 5-20
      clauseDepth: 3,         // Higher values indicate more complex sentence structure
      cognitiveComplexity: 2  // Count of cognitive verbs like "analyze", "evaluate"
    }
  }
}
```

## Reliability

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

## Contributing

Feel free to open issues or submit pull requests. The test suite can be run to verify changes:

```bash
npm test
```
