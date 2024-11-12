interface PromptAnalysis {
  structure: {
    characterCount: number;
    informationDensity: number;
    nonAlphanumericRatio: number;
  };

  readability: {
    wordLength: number;
    sentenceLength: number;
    clauseDepth: number;
    cognitiveComplexity: number;
  };

  complexity: number;
}

export class LanguageModelRouter {
  private readonly cognitiveVerbs = new Set([
    // Analytical
    "analyze",
    "evaluate",
    "synthesize",
    "examine",
    "investigate",
    "assess",
    "critique",
    "interpret",
    "cause",

    // Creative
    "design",
    "develop",
    "architect",
    "formulate",
    "devise",
    "construct",
    "compose",
    "generate",
    "model",

    // Explanatory
    "explain",
    "integrate",
    "elaborate",
    "demonstrate",
    "illustrate",
    "elucidate",
    "discuss",

    // Comparative
    "compare",
    "contrast",
    "differentiate",
    "distinguish",

    // Problem-Solving
    "solve",
    "optimize",
    "resolve",
    "determine",

    // Research
    "research",
    "theorize",
    "hypothesize",
    "predict",

    // Argumentative
    "argue",
    "debate",
    "justify",
    "defend",
    "prove",

    // Strategic
    "strategize",
    "implement",
    "propose",

    // Exploratory
    "explore",
    "brainstorm",
    "conceptualize",
    "envision",
    "imagine",
    "contemplate",
    "discover",
    "innovate",
    "reimagine",
    "implications",
  ]);

  private readonly irregularVerbs = new Map([
    ["explore", ["explores", "exploring"]],
    ["analyze", ["analyzes", "analyzing"]],
    ["evaluate", ["evaluates", "evaluating"]],
    ["generate", ["generates", "generating"]],
    ["integrate", ["integrates", "integrating"]],
    ["investigate", ["investigates", "investigating"]],
    ["innovate", ["innovates", "innovating"]],
  ]);

  public route(prompt: string): {
    model: "strong" | "weak";
    analysis: PromptAnalysis;
  } {
    if (!prompt?.trim()) {
      return { model: "weak", analysis: this.createEmptyAnalysis() };
    }

    const initialAnalysis = this.analyzePrompt(prompt);
    const complexityScore = this.assessComplexity(initialAnalysis);

    const analysis = {
      ...initialAnalysis,
      complexity: complexityScore,
    };

    return {
      model: complexityScore > 0.5 ? "strong" : "weak",
      analysis,
    };
  }

  private analyzePrompt(text: string): PromptAnalysis {
    const words = text.split(/\s+/);
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim());

    const analysis = {
      structure: {
        characterCount: text.length,
        informationDensity: this.calculateInformationDensity(text),
        nonAlphanumericRatio: this.calculateNonAlphanumericRatio(text),
      },
      readability: {
        wordLength: this.average(words.map((w) => w.length)),
        sentenceLength: words.length / Math.max(sentences.length, 1),
        clauseDepth: this.measureClauseDepth(text),
        cognitiveComplexity: this.measureCognitiveComplexity(text),
      },
      complexity: 0, // Will be set after assessment
    };

    return analysis;
  }

  private calculateInformationDensity(text: string): number {
    const charFrequencies = new Map<string, number>();

    for (const char of text) {
      charFrequencies.set(char, (charFrequencies.get(char) || 0) + 1);
    }

    return Array.from(charFrequencies.values()).reduce((entropy, freq) => {
      const probability = freq / text.length;
      return entropy - probability * Math.log2(probability);
    }, 0);
  }

  private calculateNonAlphanumericRatio(text: string): number {
    const nonAlphanumeric = text.replace(/[a-zA-Z0-9\s]/g, "");
    return nonAlphanumeric.length / text.length;
  }

  private average(numbers: number[]): number {
    return numbers.length
      ? numbers.reduce((sum, num) => sum + num, 0) / numbers.length
      : 0;
  }

  private measureClauseDepth(text: string): number {
    const clausePatterns = [
      /,/g,
      /\b(that|which|when|because|if|unless)\b/g,
      /[(\[{]/g,
    ];

    return clausePatterns.reduce(
      (depth, pattern) => depth + (text.match(pattern)?.length || 0),
      0
    );
  }

  private measureCognitiveComplexity(text: string): number {
    const lowercaseText = text.toLowerCase();
    let complexVerbs = 0;

    for (const verb of this.cognitiveVerbs) {
      const variations = this.irregularVerbs.get(verb) || [
        verb + "s",
        verb + "ing",
      ];

      if (
        lowercaseText.includes(verb) ||
        variations.some((form) => lowercaseText.includes(form))
      ) {
        complexVerbs++;
      }
    }

    return complexVerbs;
  }

  private assessComplexity(analysis: PromptAnalysis): number {
    const normalizeScore = (value: number, max: number) =>
      Math.min(value / max, 1);

    return (
      normalizeScore(analysis.structure.informationDensity, 4.5) * 0.05 +
      normalizeScore(analysis.structure.nonAlphanumericRatio, 0.3) * 0.1 +
      normalizeScore(analysis.readability.wordLength, 8) * 0.3 +
      normalizeScore(analysis.readability.sentenceLength, 20) * 0.3 +
      normalizeScore(analysis.readability.clauseDepth, 10) * 0.12 +
      normalizeScore(analysis.readability.cognitiveComplexity, 2) * 0.4
    );
  }

  private createEmptyAnalysis(): PromptAnalysis {
    return {
      structure: {
        characterCount: 0,
        informationDensity: 0,
        nonAlphanumericRatio: 0,
      },
      readability: {
        wordLength: 0,
        sentenceLength: 0,
        clauseDepth: 0,
        cognitiveComplexity: 0,
      },
      complexity: 0,
    };
  }
}
