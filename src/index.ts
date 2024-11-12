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

    // Print metrics if there's a mismatch
    if (!matches_expectation) {
      console.log('├' + '─'.repeat(150) + '┤');
      console.log('│ Metrics for failed test:');
      console.log('│ Structural:', JSON.stringify(result.metrics.structural, null, 2));
      console.log('│ Linguistic:', JSON.stringify(result.metrics.linguistic, null, 2));
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