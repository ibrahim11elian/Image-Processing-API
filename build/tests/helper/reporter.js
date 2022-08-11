"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jasmine_spec_reporter_1 = require("jasmine-spec-reporter");
classCustomProcessorextendsDisplayProcessor;
{
    displayJasmineStarted(info, SuiteInfo, log, string);
    string;
    {
        return "".concat(log);
    }
}
jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(new jasmine_spec_reporter_1.SpecReporter({
    spec: {
        displayStacktrace: jasmine_spec_reporter_1.StacktraceOption.NONE
    },
    customProcessors: [CustomProcessor],
}));
