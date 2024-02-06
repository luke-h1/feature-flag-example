import "@frontend/styles/globals.css";
import type { AppProps } from "next/app";
import { withLDProvider } from "launchdarkly-react-client-sdk";

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default withLDProvider({
  clientSideID: "65c20a0635d04c104ae5d611",
  options: {
    bootstrap: "localStorage",
  },
  reactOptions: {
    useCamelCaseFlagKeys: true,
  },
})(App as any);
