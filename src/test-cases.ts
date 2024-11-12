// src/test-cases.ts
interface TestCase {
  prompt: string;
  expected_result: "STRONG" | "WEAK";
  reason: string;
}

export const testCases: TestCase[] = [
  // Basic Questions & Commands
  {
    prompt: "What's the weather like today?",
    expected_result: "WEAK",
    reason: "Simple question with basic vocabulary and structure",
  },
  {
    prompt: "Set a timer for 10 minutes",
    expected_result: "WEAK",
    reason: "Basic command with clear instructions",
  },
  {
    prompt: "What's 15 + 27?",
    expected_result: "WEAK",
    reason: "Simple arithmetic calculation",
  },
  {
    prompt: "What time is it in Tokyo?",
    expected_result: "WEAK",
    reason: "Basic time zone query",
  },

  // General Knowledge
  {
    prompt: "What are the main causes of World War I?",
    expected_result: "STRONG",
    reason: "Complex historical analysis requiring detailed understanding",
  },
  {
    prompt: "Who is the current president?",
    expected_result: "WEAK",
    reason: "Simple factual query",
  },
  {
    prompt:
      "Explain the interconnected factors that led to the 2008 financial crisis and their lasting impact on global economic policies",
    expected_result: "STRONG",
    reason:
      "Complex economic analysis requiring understanding of multiple systems",
  },
  {
    prompt: "What's the capital of France?",
    expected_result: "WEAK",
    reason: "Basic geography fact",
  },

  // Technical & Scientific
  {
    prompt:
      "Explain quantum entanglement and its implications for quantum computing",
    expected_result: "STRONG",
    reason:
      "Complex scientific concept requiring detailed explanation and cross-domain knowledge",
  },
  {
    prompt: "What's the boiling point of water?",
    expected_result: "WEAK",
    reason: "Basic scientific fact",
  },
  {
    prompt:
      "Design a CRISPR-based solution for targeting specific genetic mutations in cancer cells while minimizing off-target effects",
    expected_result: "STRONG",
    reason: "Complex bioengineering problem requiring deep domain expertise",
  },
  {
    prompt: "List the parts of a cell",
    expected_result: "WEAK",
    reason: "Basic biology knowledge",
  },

  // Programming & Code
  {
    prompt: "Write a function to reverse a string",
    expected_result: "WEAK",
    reason: "Common programming task with straightforward implementation",
  },
  {
    prompt:
      "Design a scalable microservices architecture for a food delivery platform, including handling authentication, real-time tracking, and payment processing",
    expected_result: "STRONG",
    reason: "Complex system design requiring extensive technical knowledge",
  },
  {
    prompt: "Implement a basic todo list in React",
    expected_result: "WEAK",
    reason: "Common programming task with well-established patterns",
  },
  {
    prompt:
      "Design and implement a distributed consensus algorithm that optimizes for both consistency and partition tolerance in a globally distributed system",
    expected_result: "STRONG",
    reason:
      "Complex distributed systems design requiring deep technical expertise",
  },

  // Creative Writing
  {
    prompt: "Write a haiku about spring",
    expected_result: "WEAK",
    reason: "Simple creative task with fixed structure",
  },
  {
    prompt:
      "Write a short story that explores themes of technological alienation in a post-AI world, incorporating elements of magical realism",
    expected_result: "STRONG",
    reason:
      "Complex creative task requiring sophisticated narrative construction",
  },
  {
    prompt: "Write a limerick about a cat",
    expected_result: "WEAK",
    reason: "Simple poetry with fixed structure",
  },
  {
    prompt:
      "Create a narrative that seamlessly interweaves three parallel storylines across different time periods, exploring the theme of genetic memory",
    expected_result: "STRONG",
    reason: "Complex narrative requiring sophisticated plot management",
  },

  // Analysis & Reasoning
  {
    prompt: "What are your favorite colors?",
    expected_result: "WEAK",
    reason: "Simple preference question",
  },
  {
    prompt:
      "Analyze the environmental and socioeconomic impacts of transitioning to renewable energy sources in developing nations",
    expected_result: "STRONG",
    reason: "Complex analysis requiring multiple perspectives",
  },
  {
    prompt: "Compare cats and dogs as pets",
    expected_result: "WEAK",
    reason: "Simple comparison with common knowledge",
  },
  {
    prompt:
      "Evaluate the ethical implications of using AI in criminal justice systems, considering bias, transparency, and human rights",
    expected_result: "STRONG",
    reason:
      "Complex ethical analysis requiring consideration of multiple stakeholders",
  },

  // Math & Logic
  {
    prompt: "Solve for x: 2x + 3 = 11",
    expected_result: "WEAK",
    reason: "Basic algebra problem",
  },
  {
    prompt:
      "Prove the Fundamental Theorem of Calculus using epsilon-delta definitions",
    expected_result: "STRONG",
    reason: "Complex mathematical proof requiring rigorous logical reasoning",
  },
  {
    prompt: "What's 15% of 80?",
    expected_result: "WEAK",
    reason: "Basic percentage calculation",
  },
  {
    prompt:
      "Develop a mathematical proof for the optimality of the A* pathfinding algorithm in heuristic search spaces",
    expected_result: "STRONG",
    reason:
      "Complex algorithmic analysis requiring advanced mathematical knowledge",
  },

  // Business & Strategy
  {
    prompt: "What's a good business idea?",
    expected_result: "WEAK",
    reason: "Open-ended but simple question",
  },
  {
    prompt:
      "Develop a comprehensive market entry strategy for a sustainable fashion brand entering the Asian market",
    expected_result: "STRONG",
    reason: "Complex business analysis requiring multiple domain knowledge",
  },
  {
    prompt: "How do I calculate profit margin?",
    expected_result: "WEAK",
    reason: "Basic business calculation",
  },
  {
    prompt:
      "Create a detailed digital transformation strategy for a traditional manufacturing company, addressing technological, cultural, and organizational challenges",
    expected_result: "STRONG",
    reason: "Complex organizational change requiring multiple expertise areas",
  },

  // Language & Translation
  {
    prompt: "Translate 'hello' to Spanish",
    expected_result: "WEAK",
    reason: "Simple translation task",
  },
  {
    prompt:
      "Analyze the use of magical realism in Gabriel García Márquez's works",
    expected_result: "STRONG",
    reason: "Complex literary analysis requiring cultural expertise",
  },
  {
    prompt: "What's the plural of 'child'?",
    expected_result: "WEAK",
    reason: "Basic grammar question",
  },
  {
    prompt:
      "Compare and contrast the treatment of existentialism in French and Russian literature of the 20th century",
    expected_result: "STRONG",
    reason: "Complex comparative literature analysis",
  },

  // Edge Cases
  {
    prompt: "Generate a 500-word essay about cats",
    expected_result: "WEAK",
    reason: "Despite length, content is straightforward",
  },
  {
    prompt:
      "Write a one-line explanation of the observer effect in quantum mechanics",
    expected_result: "STRONG",
    reason: "Despite brevity, requires deep understanding",
  },
  {
    prompt:
      "Create a detailed 2000-word technical manual for operating a microwave",
    expected_result: "WEAK",
    reason: "Long but straightforward technical writing",
  },
  {
    prompt:
      "In one sentence, explain how emergent properties in complex systems challenge reductionist approaches to consciousness",
    expected_result: "STRONG",
    reason:
      "Brief but requires deep philosophical and scientific understanding",
  },

  // Multi-domain Integration
  {
    prompt: "How do I make chocolate chip cookies?",
    expected_result: "WEAK",
    reason: "Simple recipe instructions",
  },
  {
    prompt:
      "Analyze how advances in neuroscience and quantum physics might influence our understanding of free will and consciousness",
    expected_result: "STRONG",
    reason:
      "Complex integration of multiple scientific and philosophical domains",
  },
  {
    prompt: "What's a good workout routine?",
    expected_result: "WEAK",
    reason: "Basic fitness advice",
  },
  {
    prompt:
      "Design a comprehensive urban development plan that optimizes for environmental sustainability, social equity, and economic growth in a rapidly growing coastal city",
    expected_result: "STRONG",
    reason:
      "Complex urban planning requiring integration of multiple disciplines",
  },
];
