export class Environment {
  private static env: string;

  static init(envName?: string) {
    Environment.env = (envName || process.env.NODE_ENV || 'development')
      .trim()
      .toLowerCase();
  }

  static get envName(): string {
    return Environment.env;
  }

  static get isDev(): boolean {
    return ['dev', 'development'].includes(Environment.env);
  }

  static get isProd(): boolean {
    return Environment.env === 'production';
  }

  static get isStaging(): boolean {
    return ['stage', 'staging'].includes(Environment.env);
  }

  static get isTest(): boolean {
    return Environment.env === 'test';
  }
}
