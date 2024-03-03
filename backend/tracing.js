"use strict";
const opentelemetry = require("@opentelemetry/sdk-node");
const { ConsoleSpanExporter } = require('@opentelemetry/sdk-trace-node');
const { getNodeAutoInstrumentations } = require("@opentelemetry/auto-instrumentations-node");
const { ExpressInstrumentation } = require("@opentelemetry/instrumentation-express");
const { HttpInstrumentation } = require("@opentelemetry/instrumentation-http");
const { PgInstrumentation } = require('@opentelemetry/instrumentation-pg');

const {
  CompositePropagator,
  W3CBaggagePropagator,
  W3CTraceContextPropagator,
} = require("@opentelemetry/core");

const { OTLPTraceExporter } = require("@opentelemetry/exporter-trace-otlp-proto");


// For troubleshooting, set the log level to DiagLogLevel.DEBUG
const { diag, DiagConsoleLogger, DiagLogLevel } = require("@opentelemetry/api");
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

// const COLLECTOR_STRING = "http://localhost:4318/v1/traces";
const COLLECTOR_STRING = "COLLECTOR_ENDPOINT_HERE";

/**
 * The `otelTraceExporter` is an instance of OTLPTraceExporter 
 * configured to send traces to OTPL-compatible backends. 
 * In this instance, it is configured to send it to local collector's endpoint
 */
const otelTraceExporter = new OTLPTraceExporter({
  url: COLLECTOR_STRING
});

const sdk = new opentelemetry.NodeSDK({
  serviceName: "node-express-otel-nxt-gen",
//   traceExporter: otelTraceExporter,
traceExporter: new ConsoleSpanExporter(),
  // Configure the propagator to enable context propagation between services using the W3C Trace Headers
  textMapPropagator: new CompositePropagator({
    propagators: [new W3CBaggagePropagator(), new W3CTraceContextPropagator()],
  }),
  instrumentations: [
    // new ExpressInstrumentation(),
    // new HttpInstrumentation({
    //     // Ignore routes to avoid the trace capture, e.g. RegEx to ignore the incoming route /api/telemetry
    //     ignoreIncomingRequestHook(req) {
    //       // Ignore routes to avoid the trace capture, e.g. ignore the route /api/telemetry
    //       const isIgnoredRoute = !!req.url.match(
    //         /^(https?:\/\/)?([\da-z\.-]+)(\/[\d|\w]{2})(\/api\/traces)/
    //       );
    //       return isIgnoredRoute;
    //     }
    // }),
    // new PgInstrumentation({
    //     enabled:true,
    //     requireParentSpan: true,
    //     enhancedDatabaseReporting: true,
    // })
  ],
  autoDetectResources: true,
});

// Register the SDK instance as the global OpenTelemetry tracer provider
sdk.start();

// You can also use the shutdown method to gracefully shut down the SDK before process shutdown
// or on some operating system signal.
const proc = require("process");
proc.on("SIGTERM", () => {
  sdk
    .shutdown()
    .then(
      () => console.log("OpenTelemetry Node SDK shut down successfully"),
      (err) => console.log("Error shutting down SDK", err)
    )
    .finally(() => proc.exit(0));
});