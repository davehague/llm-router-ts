# Automatic Model Router Documentation

## Overview
The AutoRouter provides automatic routing between "strong" and "weak" language models based on prompt content analysis. It requires no configuration, training data, or user intervention, making it ideal for web applications that need efficient, automatic model selection.

## Core Features
- Automatic detection of technical/code content
- Complexity analysis of natural language
- No configuration required
- No training data needed
- TypeScript support
- Lightweight implementation

## Routing Logic
The router automatically routes prompts to the strong model when they exhibit any of these characteristics:
1. Technical content:
   - Programming keywords (function, class, const, etc.)
   - Code syntax patterns ({}, [], (), etc.)
   - Technical operators (=>, ===, etc.)
2. Complex content:
   - Length > 200 characters
   - Average sentence length > 15 words
   - Analysis/explanation keywords
   - Step-by-step instructions
   - Multiple sentences (>3)

All other prompts are routed to the weak model.

## Usage Example
```typescript
import { AutoRouter } from './auto-router';

const router = new AutoRouter();

// Simple queries route to weak model
const result1 = router.route("What's the weather?");
// { model: 'weak' }

// Technical queries route to strong model
const result2 = router.route("Write a function to implement quicksort");
// { model: 'strong' }

// Complex analysis routes to strong model
const result3 = router.route("Analyze the themes in War and Peace");
// { model: 'strong' }
```

## Performance Considerations
- Uses simple regex and string operations
- Minimal memory footprint
- No external dependencies
- Suitable for web environments
- No network requests required

## Implementation Details
- Written in TypeScript
- Returns typed responses
- Zero external dependencies
- Easy to integrate into existing systems

## Code Structure
The implementation consists of two main methods:
1. `detectTechnicalContent`: Identifies code and technical patterns
2. `detectComplexity`: Analyzes text complexity and structure

## Integration
Simply import the AutoRouter class and instantiate it. No configuration needed.