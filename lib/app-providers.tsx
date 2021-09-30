import { IdProvider } from "@radix-ui/react-id";
import { Provider } from "next-auth/client";
import { AppProps } from "next/dist/shared/lib/router/router";
import React from "react";

import DynamicIntercomProvider from "@ee/lib/intercom/providerDynamic";

import { createTelemetryClient, TelemetryProvider } from "@lib/telemetry";

const AppProviders = (props: AppProps) => {
  return (
    <TelemetryProvider value={createTelemetryClient()}>
      <IdProvider>
        <DynamicIntercomProvider>
          <Hydrate state={pageProps.dehydratedState}>
            <IdProvider>
              <Provider session={pageProps.session}>{children}</Provider>
            </IdProvider>
          </Hydrate>
        </DynamicIntercomProvider>
      </IdProvider>
    </TelemetryProvider>
  );
};

export default AppProviders;
