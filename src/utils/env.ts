export function getPort(): number {
  return process.env.PORT ? Number(process.env.PORT) : 3000;
}

export function getHost(): string {
  return process.env.HOST ?? '0.0.0.0';
}

export function getDbUri(): string {
  return process.env.DB_URI ?? ':memory:';
}
