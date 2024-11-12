interface ComplexityMetrics {
  // Structural complexity of the prompt
  structural: {
    length: number; // Raw length
    entropy: number; // Information density
    symbolRatio: number; // Non-alphabetic character ratio
  };

  // Linguistic complexity
  linguistic: {
    avgWordLength: number; // Average word length
    avgSentenceLength: number; // Words per sentence
    nestedClauses: number; // Estimated clause depth
    complexityIndicators: number; // Presence of complexity-indicating terms
  };
}

export class GeneralizedRouter {
  private complexityIndicators = new Set([
    // Analysis and Reasoning
    "analyze",
    "evaluate",
    "synthesize",
    "examine",
    "investigate",
    "assess",
    "critique",
    "interpret",
    "cause",

    // Design and Creation
    "design",
    "develop",
    "architect",
    "formulate",
    "devise",
    "construct",

    // Explanation and Integration
    "explain",
    "integrate",
    "elaborate",
    "demonstrate",
    "illustrate",
    "elucidate",
    "discuss",

    // Comparison and Contrast
    "compare",
    "contrast",
    "differentiate",
    "distinguish",

    // Problem Solving
    "solve",
    "optimize",
    "resolve",
    "determine",

    // Research and Theory
    "research",
    "theorize",
    "hypothesize",
    "predict",

    // Critical Thinking
    "argue",
    "debate",
    "justify",
    "defend",
    "prove",

    // Complex Creation
    "compose",
    "generate",
    "model",

    // Strategic Planning
    "strategize",
    "implement",
    "propose",

    // Exploratory Thinking
    "explore",
    "brainstorm",
    "conceptualize",
    "envision",
    "imagine",
    "contemplate",
    "ponder",
    "speculate",
    "ideate",
    "discover",
    "innovate",
    "reimagine",
  ]);

  public route(prompt: string): {
    model: "strong" | "weak";
    metrics: ComplexityMetrics;
  } {
    if (!prompt?.trim()) {
      return { model: "weak", metrics: this.getEmptyMetrics() };
    }

    const metrics = this.calculateMetrics(prompt);

    // Calculate overall complexity score based on structural and linguistic features
    const complexityScore = this.calculateComplexityScore(metrics);

    return {
      model: complexityScore > 0.5 ? "strong" : "weak",
      metrics,
    };
  }

  private calculateMetrics(text: string): ComplexityMetrics {
    const words = text.split(/\s+/);
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim());

    return {
      structural: {
        length: text.length,
        entropy: this.calculateEntropy(text),
        symbolRatio: this.calculateSymbolRatio(text),
      },
      linguistic: {
        avgWordLength: this.calculateAvgWordLength(words),
        avgSentenceLength: this.calculateAvgSentenceLength(sentences, words),
        nestedClauses: this.estimateClauseDepth(text),
        complexityIndicators: this.calculateComplexityIndicators(text),
      },
    };
  }

  private verbForms = new Map<string, string[]>([
    // Verbs that drop 'e' before 'ing'
    ["explore", ["explores", "exploring"]],
    ["cause", ["causes", "causing"]],
    ["create", ["creates", "creating"]],
    ["evaluate", ["evaluates", "evaluating"]],
    ["discuss", ["discusses", "discussing"]],
    ["generate", ["generates", "generating"]],
    ["analyze", ["analyzes", "analyzing"]],
    ["devise", ["devises", "devising"]],
    ["optimize", ["optimizes", "optimizing"]],
    ["integrate", ["integrates", "integrating"]],
    ["compose", ["composes", "composing"]],
    ["investigate", ["investigates", "investigating"]],
    ["formulate", ["formulates", "formulating"]],
    ["innovate", ["innovates", "innovating"]],
  ]);

  private calculateComplexityIndicators(text: string): number {
    const lowercaseText = text.toLowerCase();
    let count = 0;

    for (const indicator of this.complexityIndicators) {
      // Get special verb forms if they exist
      const specialForms = this.verbForms.get(indicator);

      if (specialForms) {
        // Check base word and its special conjugations
        if (
          lowercaseText.includes(indicator) ||
          specialForms.some((form) => lowercaseText.includes(form))
        ) {
          count++;
        }
      } else {
        // Default handling for regular verbs
        if (
          lowercaseText.includes(indicator) ||
          lowercaseText.includes(indicator + "s") ||
          lowercaseText.includes(indicator + "ing")
        ) {
          count++;
        }
      }
    }

    return count;
  }

  private calculateEntropy(text: string): number {
    const frequencies = new Map<string, number>();
    for (const char of text) {
      frequencies.set(char, (frequencies.get(char) || 0) + 1);
    }

    return Array.from(frequencies.values()).reduce((entropy, freq) => {
      const p = freq / text.length;
      return entropy - p * Math.log2(p);
    }, 0);
  }

  private calculateSymbolRatio(text: string): number {
    const symbols = text.replace(/[a-zA-Z0-9\s]/g, "");
    return symbols.length / text.length;
  }

  private calculateAvgWordLength(words: string[]): number {
    if (!words.length) return 0;
    return words.reduce((sum, word) => sum + word.length, 0) / words.length;
  }

  private calculateAvgSentenceLength(
    sentences: string[],
    words: string[]
  ): number {
    if (!sentences.length) return 0;
    return words.length / sentences.length;
  }

  private estimateClauseDepth(text: string): number {
    const clauseMarkers = [
      /,/g, // Basic clause separation
      /\b(that|which|where|when|because|if|unless)\b/g, // Subordinate clauses
      /[(\[{]/g, // Opening brackets indicate nesting
    ];

    return clauseMarkers.reduce(
      (depth, marker) => depth + (text.match(marker)?.length || 0),
      0
    );
  }

  private calculateComplexityScore(metrics: ComplexityMetrics): number {
    const normalize = (value: number, max: number) => Math.min(value / max, 1);

    const structuralScore =
      normalize(metrics.structural.entropy, 4.5) * 0.05 + 
      normalize(metrics.structural.symbolRatio, 0.3) * 0.1;

    const linguisticScore =
      normalize(metrics.linguistic.avgWordLength, 8) * 0.3 +
      normalize(metrics.linguistic.avgSentenceLength, 20) * 0.3 +
      normalize(metrics.linguistic.nestedClauses, 10) * 0.12;

    // Complexity indicators have a significant impact
    const indicatorScore =
      normalize(metrics.linguistic.complexityIndicators, 2) * 0.4;

    return structuralScore + linguisticScore + indicatorScore;
  }

  private getEmptyMetrics(): ComplexityMetrics {
    return {
      structural: { length: 0, entropy: 0, symbolRatio: 0 },
      linguistic: {
        avgWordLength: 0,
        avgSentenceLength: 0,
        nestedClauses: 0,
        complexityIndicators: 0,
      },
    };
  }
}
