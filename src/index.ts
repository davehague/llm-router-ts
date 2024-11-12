// src/index.ts
import { GeneralizedRouter } from './router';
import { testCases } from './test-cases';

const router = new GeneralizedRouter();

function formatOutput(text: string, model: 'strong' | 'weak'): string {
  const colorCode = model === 'strong' ? '\x1b[32m' : '\x1b[36m';
  return `${colorCode}${text}\x1b[0m`;
}

function formatMatch(matches: boolean): string {
  return matches ? '\x1b[32m✓\x1b[0m' : '\x1b[31m✗\x1b[0m';
}

function truncateString(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str.padEnd(maxLength);
  return str.slice(0, maxLength - 3) + '...';
}

function calculateScoreComponents(metrics: any): {
  structuralScore: number;
  linguisticScore: number;
  indicatorScore: number;
  total: number;
} {
  const normalize = (value: number, max: number) => Math.min(value / max, 1);

  const structuralScore =
    normalize(metrics.structural.entropy, 4.5) * 0.1 +
    normalize(metrics.structural.symbolRatio, 0.3) * 0.15;

  const linguisticScore =
    normalize(metrics.linguistic.avgWordLength, 8) * 0.3 +
    normalize(metrics.linguistic.avgSentenceLength, 20) * 0.2 +
    normalize(metrics.linguistic.nestedClauses, 10) * 0.15;

  const indicatorScore =
    normalize(metrics.linguistic.complexityIndicators, 2) * 0.4;

  return {
    structuralScore,
    linguisticScore,
    indicatorScore,
    total: structuralScore + linguisticScore + indicatorScore
  };
}

function formatFailureDetails(metrics: any): string {
  const scores = calculateScoreComponents(metrics);
  const threshold = 0.5;

  return `
│ Failure Analysis:
│ ----------------
│ Total Score: ${scores.total.toFixed(3)} (Threshold: ${threshold})
│ 
│ Score Breakdown:
│   • Structural (25%):  ${scores.structuralScore.toFixed(3)} 
│     - Entropy: ${metrics.structural.entropy.toFixed(3)} (normalized: ${(metrics.structural.entropy / 4.5).toFixed(3)})
│     - Symbol Ratio: ${metrics.structural.symbolRatio.toFixed(3)} (normalized: ${(metrics.structural.symbolRatio / 0.3).toFixed(3)})
│ 
│   • Linguistic (65%):  ${scores.linguisticScore.toFixed(3)}
│     - Word Length: ${metrics.linguistic.avgWordLength.toFixed(2)} (normalized: ${(metrics.linguistic.avgWordLength / 8).toFixed(3)})
│     - Sentence Length: ${metrics.linguistic.avgSentenceLength.toFixed(2)} (normalized: ${(metrics.linguistic.avgSentenceLength / 20).toFixed(3)})
│     - Nested Clauses: ${metrics.linguistic.nestedClauses} (normalized: ${(metrics.linguistic.nestedClauses / 10).toFixed(3)})
│ 
│   • Complexity Indicators (40%): ${scores.indicatorScore.toFixed(3)}
│     - Count: ${metrics.linguistic.complexityIndicators} (normalized: ${(metrics.linguistic.complexityIndicators / 2).toFixed(3)})
│ 
│ Decision: ${scores.total > threshold ? 'STRONG' : 'WEAK'} (${scores.total.toFixed(3)} ${scores.total > threshold ? '>' : '<='} ${threshold})`;
}

function testRouter() {
  console.clear();
  console.log('🤖 Router Test Results');
  console.log('====================\n');

  // Print header
  console.log('│ PROMPT │ EXPECTED │ ACTUAL │ MATCH │ REASON │');
  console.log('├' + '─'.repeat(150) + '┤');

  let matches = 0;
  const total = testCases.length;

  testCases.forEach((testCase, index) => {
    const result = router.route(testCase.prompt);
    const actual = result.model.toUpperCase();
    const matches_expectation = actual === testCase.expected_result;
    if (matches_expectation) matches++;

    // Format each column
    const promptCol = truncateString(testCase.prompt, 40);
    const expectedCol = testCase.expected_result.padEnd(8);
    const actualCol = formatOutput(actual.padEnd(8), result.model);
    const matchCol = formatMatch(matches_expectation);
    const reasonCol = truncateString(testCase.reason, 80);

    console.log(`│ ${promptCol} │ ${expectedCol} │ ${actualCol} │ ${matchCol}    │ ${reasonCol} │`);

    // Print detailed metrics for failures
    if (!matches_expectation) {
      console.log('├' + '─'.repeat(150) + '┤');
      console.log(formatFailureDetails(result.metrics));
      console.log('├' + '─'.repeat(150) + '┤');
    }
  });

  // Print summary
  console.log('├' + '─'.repeat(150) + '┤');
  const accuracy = (matches / total * 100).toFixed(1);
  console.log(`│ Summary: ${matches}/${total} correct (${accuracy}% accuracy)`);
  console.log('└' + '─'.repeat(150) + '┘');
}

// Run tests
testRouter();