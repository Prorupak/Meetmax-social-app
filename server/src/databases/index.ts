import config from "@config";

interface IDBConnection {
  url: string;
  options: object;
}

export const dbConnection: IDBConnection = {
  url: config.mongoose.url,
  options: config.mongoose.options,
};
