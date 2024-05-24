import createClient from "openapi-fetch";

import { paths, operations } from "./api";

const BASE_API_URL = process.env.MOONBASE_URL || "https://api.moonbasehq.com/v1";
const CORE_VERSION = "v0";

type ClientOptions = {
  apiKey: string;
  projectId: string;
}

export type LogParams = Exclude<Exclude<operations["logs-list"]["parameters"]["query"], "teamId">, undefined>;
export type LogBodyData = { [key: string]: any } | { [key: string]: any }[];

const AGENT = `moonbasehq/sdk-core-${CORE_VERSION}`;

export class Core {
  private projectId: string;
  private client: any;

  constructor(options: ClientOptions) {
    if (!options.apiKey) {
      throw new Error("@moonbasehq/core: Cannot instantiate service without required parameter: [apiKey]")
    }

    if (!options.projectId) {
      throw new Error("@moonbasehq/core: Cannot instantiate service without required parameter: [projectId]")
    }

    this.projectId = options.projectId;

    this.client = createClient<paths>({
      baseUrl: BASE_API_URL,
      headers: {
        "x-moonbase-token": options.apiKey,
        "User-Agent": AGENT
      }
    });
  }

  ingest(data: LogBodyData): Promise<{ success: boolean }> {
    return this.client.POST(`/projects/${this.projectId}/logs?levelKey=level`, {
      body: data
    });
  }
}
