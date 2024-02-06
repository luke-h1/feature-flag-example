import * as LaunchDarkly from "@launchdarkly/node-server-sdk";

let launchDarklyClient: LaunchDarkly.LDClient;

async function initialize() {
  launchDarklyClient = LaunchDarkly.init(process.env.NEXT_PUBLIC_LD_SDK_KEY);

  launchDarklyClient.waitForInitialization();
}
export async function getClient() {
  if (launchDarklyClient) {
    launchDarklyClient.waitForInitialization();
    return launchDarklyClient;
  }
  await initialize();
  return launchDarklyClient;
}

export async function getFlagValue(
  key: string,
  user: LaunchDarkly.LDUser | null,
  defaultValue: any = false
): Promise<LaunchDarkly.LDFlagValue> {
  const ldClient = await getClient();
  let flagValue: LaunchDarkly.LDFlagValue;
  if (!user) {
    user = {
      key: "anonymous",
    };
  }
  flagValue = await ldClient.variation(key, user, defaultValue);
  return flagValue;
}
