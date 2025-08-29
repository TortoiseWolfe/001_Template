/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WEB3FORMS_ACCESS_KEY: string;
  readonly VITE_CALENDLY_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}

interface Window {
  Calendly?: {
    initInlineWidget: (options: {
      url: string;
      parentElement: Element | null;
      prefill?: {
        email?: string;
        name?: string;
        customAnswers?: {
          a1?: string;
        };
      };
    }) => void;
  };
}
