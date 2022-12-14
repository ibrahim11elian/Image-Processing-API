import {
  DisplayProcessor,
  SpecReporter,
  StacktraceOption,
} from 'jasmine-spec-reporter';
import { CustomReporterResult } from 'jasmine-spec-reporter/built/spec-reporter';
import SuiteInfo = jasmine.JasmineStartedInfo;

class CustomProcessor extends DisplayProcessor {
  public displayJasmineStarted(info: SuiteInfo, log: string): string {
    return `${log}`;
  }
  public displaySuite(suite: CustomReporterResult, log: string): string {
    return `${log}`;
  }
  public displaySpecStarted(spec: CustomReporterResult, log: string): string {
    return `${log}`;
  }
  public displaySuccessfulSpec(
    spec: CustomReporterResult,
    log: string
  ): string {
    return `${log}`;
  }
  public displayFailedSpec(spec: CustomReporterResult, log: string): string {
    return `${log}`;
  }
  public displaySpecErrorMessages(
    spec: CustomReporterResult,
    log: string
  ): string {
    return `${log}`;
  }
  public displaySummaryErrorMessages(
    spec: CustomReporterResult,
    log: string
  ): string {
    return `${log}`;
  }
  public displayPendingSpec(spec: CustomReporterResult, log: string): string {
    return `${log}`;
  }
}

jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(
  new SpecReporter({
    spec: {
      displayStacktrace: StacktraceOption.NONE,
    },
    customProcessors: [CustomProcessor],
  })
);
