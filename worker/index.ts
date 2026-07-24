import { onRequest as handleApiRequest } from "../functions/api/[[path]]";

type ApiContext = Parameters<typeof handleApiRequest>[0];

type WorkerEnv = ApiContext["env"] & {
  ASSETS: {
    fetch: (request: Request) => Promise<Response>;
  };
};

type WorkerExecutionContext = {
  waitUntil: (promise: Promise<unknown>) => void;
};

export default {
  async fetch(request: Request, env: WorkerEnv, executionContext: WorkerExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api" || url.pathname.startsWith("/api/")) {
      const path = url.pathname
        .slice("/api/".length)
        .split("/")
        .filter(Boolean);

      return handleApiRequest({
        request,
        env,
        params: { path },
        waitUntil: (promise) => executionContext.waitUntil(promise),
      });
    }

    return env.ASSETS.fetch(request);
  },
};
