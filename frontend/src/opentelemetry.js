import { WebTracerProvider } from "@opentelemetry/sdk-trace-web";
import { getWebAutoInstrumentations } from "@opentelemetry/auto-instrumentations-web";
import { ZoneContextManager } from "@opentelemetry/context-zone";

import {
  CompositePropagator,
  W3CBaggagePropagator,
  W3CTraceContextPropagator,
} from "@opentelemetry/core";

import { Resource } from "@opentelemetry/resources";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";

import { registerInstrumentations } from "@opentelemetry/instrumentation";

//exporters
import {
  ConsoleSpanExporter,
  SimpleSpanProcessor,
  BatchSpanProcessor,
} from "@opentelemetry/sdk-trace-base";

import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";

//const COLLECTOR_STRING = `${import.meta.env.VITE_APP_OTLP_URL}`;
const COLLECTOR_STRING = "http://localhost:4318/v1/traces";

console.log(`CollectorString: ${COLLECTOR_STRING}`);

const resourceSettings = new Resource({
  [SemanticResourceAttributes.SERVICE_NAME]: "react-tutorials-otel-nxt-gen",
  [SemanticResourceAttributes.SERVICE_VERSION]: '0.0.1',
});

const newRelicExporter = new OTLPTraceExporter({
  url: COLLECTOR_STRING,
  headers: {
    'api-key': `${import.meta.env.VITE_APP_NR_LICENSE}`
  }
});

const provider = new WebTracerProvider({resource: resourceSettings});

//Uncomment this to enable debugging using consoleExporter
provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));

provider.addSpanProcessor(
new BatchSpanProcessor(
  newRelicExporter,
   //Optional BatchSpanProcessor Configurations
    {
      // The maximum queue size. After the size is reached spans are dropped.
      maxQueueSize: 100,
      // The maximum batch size of every export. It must be smaller or equal to maxQueueSize.
      maxExportBatchSize: 50,
      // The interval between two consecutive exports
      scheduledDelayMillis: 500,
      // How long the export can run before it is canceled
      exportTimeoutMillis: 30000,
    }
)
);

provider.register({
contextManager: new ZoneContextManager(),
propagator: new CompositePropagator({
  propagators: [new W3CBaggagePropagator(), new W3CTraceContextPropagator()],
}),
});

const startOtelInstrumentation = () => {
  console.error(`Registering Otel ${new Date().getMilliseconds()}`);
  // Registering instrumentations
  registerInstrumentations({
    instrumentations: [
      // getWebAutoInstrumentations({
      //   "@opentelemetry/instrumentation-xml-http-request": {
      //     enabled:true,
      //     ignoreUrls: ["/localhost:8081/sockjs-node"],
      //     clearTimingResources: true,
      //     propagateTraceHeaderCorsUrls: [/.+/g],
      //   },
      //   "@opentelemetry/instrumentation-document-load": {
      //     enabled: true,
      //   },
      //   "@opentelemetry/instrumentation-user-interaction": {
      //     enabled:true,
      //     eventNames: [
      //       "click",
      //       "load",
      //       "loadeddata",
      //       "loadedmetadata",
      //       "loadstart",
      //       "error",
      //     ],
      //   },
      // }),
    ],
  });
};

export { startOtelInstrumentation };
