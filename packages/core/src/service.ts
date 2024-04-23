import createClient from "openapi-fetch";

import { paths, operations } from "./api";

const BASE_API_URL = process.env.MOONBASE_URL || "https://api.moonbasehq.com/v1";
const CORE_VERSION = "v0";

type ClientOptions = {
  apiKey: string;
}

export type LogParams = Exclude<Exclude<operations["logs-list"]["parameters"]["query"], "teamId">, undefined>;
export type LogBodyData =
  operations["logs-create"]["requestBody"]["content"]["application/json"]["data"];

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

  constructor(options: ClientOptions) {
    if (!options.apiKey) {
      throw new Error("@moonbasehq/core: Cannot instantiate service without required parameter: [apiKey]")
    }

    this.apiKey = options.apiKey;
  }

  ingest(projectId: string, data: LogBodyData) {
    return createHttpClient(this.apiKey).POST('/logs', {
      body: {
        projectId,
        data,
      }
    });
  }

  query(params: QueryParams) {
    return createHttpClient(this.apiKey).GET("/logs", {
      params: {
        query: {
          q: params.query,
          projectIds: params.projectIds,
          start: params.start,
          end: params.end,
          cursor: params.cursor,
          limit: params.limit,
          rel: params.relativeDate
        }
      }
    });
  }
}
