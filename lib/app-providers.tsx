import { IdProvider } from "@radix-ui/react-id";
import { Provider } from "next-auth/client";
import React from "react";
import { HydrateProps, QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";

import DynamicIntercomProvider from "@ee/lib/intercom/providerDynamic";

import { Session } from "@lib/auth";
import { createTelemetryClient, TelemetryProvider } from "@lib/telemetry";

export const queryClient = new QueryClient();

type AppProviderProps = {
  pageProps: {
    session?: Session;
    dehydratedState?: HydrateProps;
  };
};

const AppProviders: React.FC<AppProviderProps> = ({ pageProps, children }) => {
  return (
    <TelemetryProvider value={createTelemetryClient()}>
      <QueryClientProvider client={queryClient}>
        <DynamicIntercomProvider>
          <Hydrate state={pageProps.dehydratedState}>
            <IdProvider>
              <Provider session={pageProps.session}>{children}</Provider>
            </IdProvider>
          </Hydrate>
        </DynamicIntercomProvider>
      </QueryClientProvider>
    </TelemetryProvider>
  );
};

export default AppProviders;
