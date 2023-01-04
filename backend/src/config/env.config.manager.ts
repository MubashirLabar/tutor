import 'dotenv/config';

class Environment {
  private env: { [k: string]: string | undefined };
  constructor(env: NodeJS.ProcessEnv) {
    this.env = env;
  }

  public getEnvValue(key: string, throwOnMissing = true): string {
    const value = this.env[key] || '';
    if (!value && throwOnMissing) {
      throw new Error(
        `\tmissing env.${key}.\n \n\tPlease add ${key} in .env file\n`
      );
    }
    return value;
  }
}

export default new Environment(process.env);
