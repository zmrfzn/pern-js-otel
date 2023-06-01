"use strict";
const opentelemetry = require("@opentelemetry/sdk-node");
const { getNodeAutoInstrumentations } = require("@opentelemetry/auto-instrumentations-node");

const {
  CompositePropagator,
  W3CBaggagePropagator,
  W3CTraceContextPropagator,
} = require("@opentelemetry/core");

const { OTLPTraceExporter } = require("@opentelemetry/exporter-trace-otlp-proto");


// For troubleshooting, set the log level to DiagLogLevel.DEBUG
const { diag, DiagConsoleLogger, DiagLogLevel } = require("@opentelemetry/api");
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

const COLLECTOR_STRING = "https://otlp.nr-data.net:4318/v1/traces";

/**
 * The `newRelicExporter` is an instance of OTLPTraceExporter 
 * configured to send traces to New Relic's OTPL-compatible backend. 
 * Make sure you have added your New Relic Ingest License to NR_LICENSE env-var
 */
const newRelicExporter = new OTLPTraceExporter({
  url: COLLECTOR_STRING,
  headers: {
    "api-key": `${process.env.NR_LICENSE}`,
  },
});

const sdk = new opentelemetry.NodeSDK({
  serviceName: "node-express-otel",
  traceExporter: newRelicExporter,
  // Configure the propagator to enable context propagation between services using the W3C Trace Headers
  textMapPropagator: new CompositePropagator({
    propagators: [new W3CBaggagePropagator(), new W3CTraceContextPropagator()],
  }),
  instrumentations: [
    getNodeAutoInstrumentations({
      // Enable Instrumentations for PostgreSQL Database
      "@opentelemetry/instrumentation-pg": {
        requireParentSpan: true,
        enhancedDatabaseReporting: true,
      },
      "@opentelemetry/instrumentation-http": {
        // Ignore routes to avoid the trace capture, e.g. RegEx to ignore the incoming route /api/telemetry
        ignoreIncomingRequestHook(req) {
          // Ignore routes to avoid the trace capture, e.g. ignore the route /api/telemetry
          const isIgnoredRoute = !!req.url.match(
            /^(https?:\/\/)?([\da-z\.-]+)(\/[\d|\w]{2})(\/api\/traces)/
          );
          return isIgnoredRoute;
        },
      },
      "@opentelemetry/instrumentation-express": {
        enabled: true,
      },
    }),
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