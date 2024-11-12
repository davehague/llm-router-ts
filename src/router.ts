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
  };
}

export class GeneralizedRouter {
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
      },
    };
  }

  private calculateEntropy(text: string): number {
    // Calculate Shannon entropy as a measure of information density
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
    // Estimate nested clause depth using common clause markers
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
    // Normalize and combine metrics into a single score
    const normalize = (value: number, max: number) => Math.min(value / max, 1);

    return (
      normalize(metrics.structural.entropy, 4.5) * 0.3 + // Max entropy for English text
      normalize(metrics.structural.symbolRatio, 0.3) * 0.2 + // Symbol ratio weight
      normalize(metrics.linguistic.avgWordLength, 8) * 0.2 + // Avg English word length
      normalize(metrics.linguistic.avgSentenceLength, 20) * 0.15 + // Reasonable sentence length
      normalize(metrics.linguistic.nestedClauses, 10) * 0.15 // Clause complexity
    );
  }

  private getEmptyMetrics(): ComplexityMetrics {
    return {
      structural: { length: 0, entropy: 0, symbolRatio: 0 },
      linguistic: { avgWordLength: 0, avgSentenceLength: 0, nestedClauses: 0 },
    };
  }
}
