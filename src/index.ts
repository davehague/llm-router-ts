import { LanguageModelRouter } from "./router";
import { testCases } from "./test-cases";

const router = new LanguageModelRouter();

function formatModelOutput(text: string, model: "strong" | "weak"): string {
  const colorCode = model === "strong" ? "\x1b[32m" : "\x1b[36m";
  return `${colorCode}${text}\x1b[0m`;
}

function formatResultIndicator(
  isCorrect: boolean,
  expected: string,
  actual: string
): string {
  if (isCorrect) return "\x1b[32m✓\x1b[0m";
  return expected === "WEAK" && actual === "STRONG"
    ? "\x1b[33m⚠\x1b[0m"
    : "\x1b[31m✗\x1b[0m";
}

function padText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text.padEnd(maxLength);
  return text.slice(0, maxLength - 3) + "...";
}

function formatAnalysisReport(
  analysis: any,
  expected: string,
  actual: string
): string {
  const decisionThreshold = 0.5;
  const isOverClassified = expected === "WEAK" && actual === "STRONG";

  const headerSymbol = isOverClassified
    ? "⚠ Classification Analysis:"
    : "✗ Classification Analysis:";
  const headerColor = isOverClassified ? "\x1b[33m" : "\x1b[31m";

  // Normalize values for display
  const normalize = (value: number, max: number) => Math.min(value / max, 1);

  const structureScores = {
    density: normalize(analysis.structure.informationDensity, 4.5),
    symbols: normalize(analysis.structure.nonAlphanumericRatio, 0.3),
  };

  const readabilityScores = {
    words: normalize(analysis.readability.wordLength, 8),
    sentences: normalize(analysis.readability.sentenceLength, 20),
    clauses: normalize(analysis.readability.clauseDepth, 10),
  };

  const cognitionScore = normalize(analysis.readability.cognitiveComplexity, 2);

  return `
│ ${headerColor}${headerSymbol}\x1b[0m
│ ----------------
│ Complexity Score: ${analysis.complexity.toFixed(
    3
  )} (Threshold: ${decisionThreshold})
│ 
│ Score Components:
│   • Structure:
│     - Information Density: ${analysis.structure.informationDensity.toFixed(
    3
  )} (normalized: ${structureScores.density.toFixed(3)})
│     - Non-Alphanumeric Ratio: ${analysis.structure.nonAlphanumericRatio.toFixed(
    3
  )} (normalized: ${structureScores.symbols.toFixed(3)})
│ 
│   • Readability:
│     - Word Length: ${analysis.readability.wordLength.toFixed(
    2
  )} (normalized: ${readabilityScores.words.toFixed(3)})
│     - Sentence Length: ${analysis.readability.sentenceLength.toFixed(
    2
  )} (normalized: ${readabilityScores.sentences.toFixed(3)})
│     - Clause Depth: ${
    analysis.readability.clauseDepth
  } (normalized: ${readabilityScores.clauses.toFixed(3)})
│ 
│   • Cognitive Complexity:
│     - Complex Verbs: ${
    analysis.readability.cognitiveComplexity
  } (normalized: ${cognitionScore.toFixed(3)})
│ 
│ Decision: ${
    analysis.complexity > decisionThreshold ? "STRONG" : "WEAK"
  } (${analysis.complexity.toFixed(3)} ${
    analysis.complexity > decisionThreshold ? ">" : "<="
  } ${decisionThreshold})`;
}

function runRouterTests() {
  console.clear();
  console.log("🤖 Model Router Test Results");
  console.log("===========================\n");

  console.log("Legend: ✓ Correct  ⚠ Over-classified  ✗ Under-classified\n");

  console.log("│ PROMPT │ EXPECTED │ ACTUAL │ MATCH │ REASON │");
  console.log("├" + "─".repeat(150) + "┤");

  let correctCount = 0;
  let overClassified = 0;
  let underClassified = 0;
  const totalTests = testCases.length;

  testCases.forEach((test) => {
    const result = router.route(test.prompt);
    const actual = result.model.toUpperCase();
    const isCorrect = actual === test.expected_result;

    if (isCorrect) {
      correctCount++;
    } else if (test.expected_result === "WEAK" && actual === "STRONG") {
      overClassified++;
    } else {
      underClassified++;
    }

    const formattedRow = [
      padText(test.prompt, 40),
      test.expected_result.padEnd(8),
      formatModelOutput(actual.padEnd(8), result.model),
      formatResultIndicator(isCorrect, test.expected_result, actual),
      padText(test.reason, 80),
    ].join(" │ ");

    console.log(`│ ${formattedRow} │`);

    if (!isCorrect) {
      console.log("├" + "─".repeat(150) + "┤");
      console.log(
        formatAnalysisReport(result.analysis, test.expected_result, actual)
      );
      console.log("├" + "─".repeat(150) + "┤");
    }
  });

  console.log("├" + "─".repeat(150) + "┤");
  const accuracy = ((correctCount / totalTests) * 100).toFixed(1);
  console.log(
    `│ Results: ${correctCount}/${totalTests} correct (${accuracy}% accuracy)`
  );
  console.log(`│         ${overClassified} over-classified as STRONG`);
  console.log(`│         ${underClassified} under-classified as WEAK`);
  console.log("└" + "─".repeat(150) + "┘");
}

runRouterTests();
