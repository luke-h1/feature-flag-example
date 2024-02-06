declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_LD_CLIENT_SIDE_ID: string;
      NEXT_PUBLIC_LD_SDK_KEY: string;
    }
  }
}

export {};
