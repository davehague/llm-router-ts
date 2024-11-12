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
  {
    prompt:
      "I want to build a machine learning model to predict stock market trends using historical data and sentiment analysis of financial news.",
    expected_result: "STRONG",
    reason:
      "Requires advanced understanding of machine learning techniques and data analysis.",
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
  {
    prompt:
      "How can carbon pricing be an effective tool to combat climate change? Give examples",
    expected_result: "STRONG",
    reason:
      "Complex policy analysis requiring understanding of environmental economics.",
  },

  // Medical & Healthcare
  {
    prompt: "What are common symptoms of a cold?",
    expected_result: "WEAK",
    reason: "Basic health information query",
  },
  {
    prompt:
      "Design a personalized treatment protocol for a patient with complex comorbidities including type 2 diabetes, early-stage Alzheimer's, and chronic kidney disease",
    expected_result: "STRONG",
    reason:
      "Complex medical case requiring integration of multiple conditions and drug interactions",
  },

  // Legal & Regulatory
  {
    prompt: "What's the speed limit on highways?",
    expected_result: "WEAK",
    reason: "Basic legal fact",
  },
  {
    prompt:
      "Analyze the international legal implications of AI-generated content ownership across different jurisdictions, considering both civil and common law systems",
    expected_result: "STRONG",
    reason:
      "Complex legal analysis spanning multiple jurisdictional frameworks",
  },

  // Game Theory & Decision Making
  {
    prompt: "Explain the rules of chess",
    expected_result: "WEAK",
    reason: "Basic game rules explanation",
  },
  {
    prompt:
      "Design an optimal mixed strategy for a multi-player, incomplete information game with dynamic payoffs and evolving coalition structures",
    expected_result: "STRONG",
    reason:
      "Complex game theory requiring advanced mathematical and strategic analysis",
  },

  // Behavioral Economics
  {
    prompt: "What is supply and demand?",
    expected_result: "WEAK",
    reason: "Basic economic concept",
  },
  {
    prompt:
      "Analyze how cognitive biases in institutional investors affect market efficiency during periods of technological disruption",
    expected_result: "STRONG",
    reason: "Complex integration of psychology, economics, and market dynamics",
  },

  // Climate & Environmental Science
  {
    prompt: "Why is recycling important?",
    expected_result: "WEAK",
    reason: "Basic environmental awareness topic",
  },
  {
    prompt:
      "Model the cascading effects of Arctic permafrost thaw on global climate systems, including feedback loops and tipping points",
    expected_result: "STRONG",
    reason:
      "Complex climate system analysis requiring understanding of multiple interconnected systems",
  },

  // Mixed Media & Communication
  {
    prompt: "Write a tweet about your day",
    expected_result: "WEAK",
    reason: "Simple social media content",
  },
  {
    prompt:
      "Design a transmedia storytelling campaign that integrates AR, social media, and physical installations to explore themes of digital privacy",
    expected_result: "STRONG",
    reason:
      "Complex narrative design across multiple platforms and technologies",
  },

  // Interesting Edge Cases
  {
    prompt: "Write a very long, detailed shopping list",
    expected_result: "WEAK",
    reason: "Despite length and detail, fundamentally simple task",
  },
  {
    prompt:
      "Explain why 1 + 1 = 2 using the axioms of Zermelo-Fraenkel set theory",
    expected_result: "STRONG",
    reason: "Simple result but requires deep mathematical foundation",
  },
  {
    prompt: "Tell me a 10-page story about a dog",
    expected_result: "WEAK",
    reason: "Long but straightforward narrative task",
  },

  // Emerging Technologies
  {
    prompt: "What is blockchain?",
    expected_result: "WEAK",
    reason: "Basic technology definition",
  },
  {
    prompt:
      "Design a quantum-resistant blockchain protocol that maintains ACID properties while optimizing for scalability in IoT networks",
    expected_result: "STRONG",
    reason: "Complex integration of multiple cutting-edge technologies",
  },
  {
    prompt:
      "What are the ethical implications of facial recognition technology in public surveillance?",
    expected_result: "STRONG",
    reason:
      "Requires analysis of ethical, social, and technological dimensions.",
  },

  // Cultural & Anthropological
  {
    prompt: "What holidays are celebrated in Japan?",
    expected_result: "WEAK",
    reason: "Basic cultural information",
  },
  {
    prompt:
      "Analyze how the evolution of digital communication platforms has influenced the development of linguistic patterns and cultural transmission across generational boundaries",
    expected_result: "STRONG",
    reason: "Complex sociolinguistic analysis across multiple domains",
  },

  // General Trivia
  {
    prompt: "What is the tallest building in the world?",
    expected_result: "WEAK",
    reason: "Basic trivia that requires a simple factual response",
  },
  {
    prompt:
      "Discuss the socio-political impact of the construction of the Great Wall of China throughout history",
    expected_result: "STRONG",
    reason:
      "Complex historical analysis involving multiple factors and interpretations",
  },

  // Fine Arts & Music
  {
    prompt: "Who painted the Mona Lisa?",
    expected_result: "WEAK",
    reason: "Simple art history query",
  },
  {
    prompt:
      "Analyze how the use of counterpoint and fugue structure in J.S. Bach’s work influenced Baroque music development",
    expected_result: "STRONG",
    reason: "In-depth musicological analysis involving theoretical knowledge",
  },
  {
    prompt: "Compose a sonata in the style of Beethoven's Moonlight Sonata.",
    expected_result: "STRONG",
    reason:
      "Requires understanding of specific musical styles and composition techniques.",
  },
  {
    prompt: "Name the four main musical notes.",
    expected_result: "WEAK",
    reason: "Basic music theory question.",
  },
  {
    prompt:
      "Analyze the use of perspective in Leonardo da Vinci's 'The Last Supper'.",
    expected_result: "STRONG",
    reason: "Requires detailed art analysis.",
  },
  {
    prompt: "What colors are used in 'The Starry Night' by Vincent van Gogh?",
    expected_result: "WEAK",
    reason: "Basic fact about colors in artwork.",
  },

  // Education
  {
    prompt:
      "Come up with an inclusive curriculum for a diverse classroom that caters to different learning styles and abilities.",
    expected_result: "STRONG",
    reason:
      "Complex educational design requiring understanding of pedagogical theories.",
  },

  // Philosophy & Ethics
  {
    prompt: "What is utilitarianism?",
    expected_result: "WEAK",
    reason: "Basic philosophical concept definition",
  },
  {
    prompt:
      "Explain the difference between utilitarianism and deontological ethics.",
    expected_result: "STRONG",
    reason: "Requires understanding of complex ethical theories.",
  },
  {
    prompt: "What is free will?",
    expected_result: "WEAK",
    reason: "Basic philosophical concept.",
  },
  {
    prompt:
      "Explore the philosophical tension between determinism and free will in the context of modern neuroscience and existential philosophy",
    expected_result: "STRONG",
    reason: "Complex, interdisciplinary philosophical argumentation",
  },

  // Medicine & Diagnostics
  {
    prompt: "What are the common treatments for a cold?",
    expected_result: "WEAK",
    reason: "Basic known medical advice",
  },
  {
    prompt:
      "Draft a research proposal exploring novel immunotherapies' effectiveness in combating autoimmune diseases like lupus and rheumatoid arthritis",
    expected_result: "STRONG",
    reason:
      "Advanced medical research requiring understanding of immunological and pathological systems",
  },

  // Marketing & Advertising
  {
    prompt: "What is a USP?",
    expected_result: "WEAK",
    reason: "Basic marketing terminology definition",
  },
  {
    prompt:
      "Develop an international multi-platform digital marketing strategy for launching a new eco-friendly brand, considering cultural differences, platform regulations, and audience behavior",
    expected_result: "STRONG",
    reason:
      "Complex marketing strategy necessitating deep insight into global markets",
  },

  // Sports & Games
  {
    prompt: "How long is a standard soccer match?",
    expected_result: "WEAK",
    reason: "Basic sports fact",
  },
  {
    prompt:
      "Analyze the tactical evolution of the 'False 9' position in football over the past decade and its influence on modern formations and strategies",
    expected_result: "STRONG",
    reason:
      "Advanced sports analysis involving strategic understanding and historical context",
  },

  // Cognitive Science
  {
    prompt: "What is short-term memory?",
    expected_result: "WEAK",
    reason: "Basic psychological concept explanation",
  },
  {
    prompt:
      "Discuss the impact of neuroplasticity on recovery following a stroke and the implications for long-term memory rehabilitation therapies",
    expected_result: "STRONG",
    reason:
      "Complex neurological discussion requiring significant expertise in cognitive science and clinical therapy",
  },

  // Computer Science & Algorithms
  {
    prompt: "What is binary search?",
    expected_result: "WEAK",
    reason: "Basic explanation of a well-known algorithm",
  },
  {
    prompt:
      "Construct an efficient multi-threaded algorithm for matrix multiplication that minimizes memory contention and optimizes cache locality",
    expected_result: "STRONG",
    reason:
      "Advanced computer science problem requiring profound algorithmic insight",
  },

  // Fictional Scenarios
  {
    prompt: "Tell me a story about a dragon and a princess",
    expected_result: "WEAK",
    reason: "Straightforward story premise with simple narrative structure",
  },
  {
    prompt:
      "Write a speculative fiction essay exploring how interstellar colonization would affect human socio-political structures across generations",
    expected_result: "STRONG",
    reason:
      "In-depth speculative fiction requiring complex sociological and futurist thinking",
  },

  // Mathematics & Geometry
  {
    prompt: "What is the area of a triangle with base 5 and height 10?",
    expected_result: "WEAK",
    reason: "Basic geometrical calculation",
  },
  {
    prompt:
      "Discuss the implications of Gödel's incompleteness theorems for modern computational complexity theory",
    expected_result: "STRONG",
    reason:
      "Complex mathematical and philosophical discussion requiring deep understanding of logic",
  },

  // Law & Social Policy
  {
    prompt: "What is the legal drinking age in the UK?",
    expected_result: "WEAK",
    reason: "Simple, factual legal query",
  },
  {
    prompt:
      "Analyze the implications of GDPR on artificial intelligence development and user data security across digital platforms",
    expected_result: "STRONG",
    reason:
      "Complex legal analysis requiring in-depth understanding of technology and privacy law",
  },

  // Space & Astronomy
  {
    prompt: "How many planets are in the solar system?",
    expected_result: "WEAK",
    reason: "Simple astronomical fact",
  },
  {
    prompt:
      "Create a theoretical framework for the colonization strategy of exoplanets in the habitable zone, considering resource constraints, human physiology adaptation, and propulsion technologies",
    expected_result: "STRONG",
    reason:
      "Complex scientific analysis involving astrophysics, engineering, and biology",
  },
  {
    prompt:
      "What is the significance of the Higgs boson discovery in the context of the Standard Model of particle physics.",
    expected_result: "STRONG",
    reason:
      "Requires deep understanding of physics and sophisticated concepts.",
  },

  // Food & Recipes
  {
    prompt: "How do you boil an egg?",
    expected_result: "WEAK",
    reason: "Simple cooking instruction",
  },
  {
    prompt:
      "Develop a nutritionally balanced meal plan for a week aimed at someone with lactose intolerance and a need to increase their protein consumption while maintaining a low carb intake",
    expected_result: "STRONG",
    reason:
      "Complex nutritional planning involving specific dietary constraints",
  },

  // Historical Debate & Politics
  {
    prompt: "When did WW2 end?",
    expected_result: "WEAK",
    reason: "Basic historical fact",
  },
  {
    prompt:
      "Evaluate the role of competing economic systems (capitalism vs socialism) in shaping the geopolitical alignments during the Cold War era",
    expected_result: "STRONG",
    reason:
      "Complex geopolitical analysis requiring historical, economic, and sociopolitical insight",
  },

  // Psychological Theory
  {
    prompt: "What is Maslow's hierarchy of needs?",
    expected_result: "WEAK",
    reason: "Basic psychological theory definition",
  },
  {
    prompt:
      "Critically assess how Maslow's hierarchy of needs can be adapted to understand human motivation in the context of highly individualized, modern technological societies",
    expected_result: "STRONG",
    reason:
      "Complex theoretical adaptation requiring cross-disciplinary thinking",
  },
];
