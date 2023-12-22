export function getPort(): number {
  return process.env.PORT ? Number(process.env.PORT) : 3000;
}

export function getHost(): string {
  return process.env.HOST ?? '0.0.0.0';
}

export function getDbFilename(): string {
  return process.env.DB_FILENAME ?? ':memory:';
}

export function getDbTable(): string {
  return process.env.DB_TABLENAME ?? 'urls';
}
