import createClient from "openapi-fetch";

import { paths, operations } from "./api";

const BASE_API_URL = process.env.SDK_BASE_URL || "http://api.moonbase.com/v1";

const CORE_VERSION = "v0";

export interface ICore {
  ingest(): Promise<void>;
}

type ClientOptions = {
  apiKey: string;
  projectId: string;
}

export class Core implements ICore {
  private client: any;

  constructor(options: ClientOptions) {
    if (!options.apiKey) {
      throw new Error("@moonbasehq/core: Cannot instantiate service without required parameter: [apiKey]")
    }

    if (!options.projectId) {
      throw new Error("@moonbasehq/core: Cannot instantiate service without required parameter: [apiKey]")
    }

    const client = createClient<paths>({
      baseUrl: BASE_API_URL,
      headers: {
        "x-moonbase-token": options.apiKey,
        "User-Agent": `moonbasehq/sdk-core-${CORE_VERSION}`
      }
    });

    this.client = client;
  }

  async ingest() {

  }
}

// create fetch operations
// const getSingleDeployment = fetcher
//   .path("/deployments/{id}")
//   .method("get")
//   .create();
// const getDeploymentWithRuns = fetcher
//   .path("/deployments/{id}/runs")
//   .method("get")
//   .create();
// const upsertDeploymentFetcher = fetcher
//   .path("/deployments")
//   .method("post")
//   .create();
// const getDeploymentByProjectFetcher = fetcher
//   .path("/projects/{id}/deployments")
//   .method("get")
//   .create();