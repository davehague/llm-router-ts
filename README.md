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

// Example: OpenAI
async function generateOpenAIResponse(prompt: string) {
 const { model } = router.route(prompt);

 return await openai.chat.completions.create({
   model: model === "strong"
        ? "openai/chatgpt-4o-latest"  // $5 per 1M tokens IN / $15 per 1M tokens OUT
        : "openai/gpt-4o-mini";  // $0.15 per 1M tokens IN / $0.60 per 1M tokens OUT
   messages: [{ role: "user", content: prompt }],
 });
}

// Example: OpenRouter (mixed models)
async function generateOpenRouterResponse(prompt: string) {
 const { model } = router.route(prompt);

 return await fetch('https://openrouter.ai/api/v1/chat/completions', {
   method: 'POST',
   headers: {...},
   body: JSON.stringify({
     model: model === "strong"
        ? "anthropic/claude-3.5-sonnet"  // $3 per 1M tokens IN / $15 per 1M tokens OUT
        : "google/gemini-flash-1.5-8b";  // $0.0375 per 1M tokens IN / $0.15 per 1M tokens OUT
     messages: [{ role: "user", content: prompt }],
   })
 }).then(res => res.json());
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
npm test
```

## Contributing

Feel free to open issues or submit pull requests. 

## License
Unlicense - permission to use, copy, modify, and distribute any work without restriction or conditions.