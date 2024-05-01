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

type QueryParams = {
  query?: LogParams["q"];
  projectIds?: Array<string>;
  start?: LogParams["start"];
  end?: LogParams["end"];
  cursor?: LogParams["cursor"];
  limit?: LogParams["limit"];
  relativeDate?: LogParams["rel"];
}

function createHttpClient(apiKey: string) {
  return createClient<paths>({
    baseUrl: BASE_API_URL,
    headers: {
      "x-moonbase-token": apiKey,
      "User-Agent": AGENT
    }
  });
}

export class Core {
  private apiKey: string;
  private projectId: string;

  constructor(options: ClientOptions) {
    if (!options.apiKey) {
      throw new Error("@moonbasehq/core: Cannot instantiate service without required parameter: [apiKey]")
    }

    if (!options.projectId) {
      throw new Error("@moonbasehq/core: Cannot instantiate service without required parameter: [projectId]")
    }

    this.apiKey = options.apiKey;
    this.projectId = options.projectId;
  }

  ingest(data: LogBodyData) {
    // @ts-expect-error
    return createHttpClient(this.apiKey).POST(`/projects/${this.projectId}/logs?levelKey=level`, {
      body: data
    });
  }
}
