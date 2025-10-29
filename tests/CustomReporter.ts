// customReporter.js
import fs from 'fs';
import type {
  FullConfig,
  Suite,
  TestCase,
  TestResult,
  TestStep,
  Reporter,
} from '@playwright/test/reporter';

export default class CustomReporter implements Reporter {
  private file: string;

  constructor() {
    this.file = 'custom-report.csv';
    fs.writeFileSync(this.file, 'Test Name,Step Name,Expected,Actual,Status\n');
  }

  onTestBegin(test: TestCase): void {
    console.log(`Starting test: ${test.title}`);
  }

  onStepBegin(test: TestCase, result: TestResult, step: TestStep): void {
    this._log(test, step.title, '-', '-', 'In Progress');
  }

  onStepEnd(test: TestCase, result: TestResult, step: TestStep): void {
    const status = step.error ? 'Failed' : 'Passed';
    this._log(test, step.title, '-', '-', status);
  }

  onTestEnd(test: TestCase, result: TestResult): void {
    const status = result.status === 'passed' ? 'PASSED' : 'FAILED';
    console.log(`\n${status}: ${test.title}\n`);
  }

  private _log(
    test: TestCase,
    step: string,
    expected: string,
    actual: string,
    status: string
  ): void {
    const line = `"${test.title}","${step}","${expected}","${actual}","${status}"\n`;
    fs.appendFileSync(this.file, line);
  }
}
