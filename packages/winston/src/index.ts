import Transport, { TransportStreamOptions } from 'winston-transport';
import { Moonbase } from '@moonbasehq/js';

export interface MoonbaseTransportOptions extends TransportStreamOptions {
  projectId: string;
  apiKey: string;
}

export class MoonbaseTransport extends Transport {
  private client: Moonbase;

  constructor(options: MoonbaseTransportOptions) {
    super(options);
    this.client = new Moonbase({ apiKey: options.apiKey, projectId: options.projectId });
  }

  log(info: any, callback: () => void) {
    // send log message to Moonbase
    this.ingest(info, (err) => {
      if (err) {
        return this.emit('error', err);
      }

      return this.emit('logged', info);
    });

    if (callback) {
      setImmediate(callback);
    }
  }

  ingest(info: any, callback: (err: Error | null) => void) {
    return this.client
      .ingest(info)
      .then(() => callback(null))
      .catch(callback);
  }
}
