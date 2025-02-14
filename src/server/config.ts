import path from "path";
import convict from "convict";

export interface Config {
  readonly ip: string;
  readonly port: number;
  readonly filesPath: string;
  readonly jwksUri: string;
  readonly publishApiValidClients: string;
  readonly filenamesInParallel: number;
  readonly otelEnable: string;
}

export const schema = convict<Config>({
  ip: {
    doc: "The IP address to bind.",
    format: "ipaddress",
    default: "0.0.0.0",
    env: "IP_ADDRESS",
  },
  port: {
    doc: "The port to bind.",
    format: "port",
    default: 4500,
    env: "PORT",
  },
  filesPath: {
    doc: "Where to store the published files.",
    format: "String",
    default: path.join(__dirname, "../../uploads/"),
    env: "FILES_PATH",
  },
  jwksUri: {
    doc: "Where to find keys used to verify JWT.",
    format: "url",
    default: "https://keycloak.promaster.se/auth/realms/promaster/protocol/openid-connect/certs",
    env: "JWKS_URI",
  },
  publishApiValidClients: {
    doc: "Comma separated list of allowed client_id's to access the publish endpoint",
    format: "String",
    default: "promaster-edit-backend",
    env: "PUBLISH_API_VALID_CLIENTS",
  },
  filenamesInParallel: {
    doc: "Files to read in parallel in publish middleware",
    format: "int",
    default: 50,
    env: "READ_FILES_PARALLEL",
  },
  otelEnable: {
    doc: "Controls if OpenTelemetry SDK is loaded",
    format: ["true", "false"],
    default: "false",
    env: "OTEL_ENABLE",
  },
});

schema.validate({ allowed: "strict" });

export const config = schema.getProperties();
