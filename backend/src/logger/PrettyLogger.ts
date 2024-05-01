import logger, { Logger, Level } from 'pino'
 import config from 'config'


class PrettyLog {
	private readonly env = config.get<string>('server.env')
    // private readonly env = process.env.APP_PORT
	private readonly logger: Logger
	private static instance: PrettyLog

	private constructor() {
		this.logger = logger({
			transport: {
				target: 'pino-pretty',
				options: {
					levelFirst: true,
					translateTime: true,
					colorize: true,
					env: 'development',
				},
			},
		})
	}

	public static getInstance(): PrettyLog {
		if (!this.instance) this.instance = new PrettyLog()
		return this.instance
	}

	private showLogOnlyOnDevelopment(
		level: Level,
		log: unknown,
		msg?: string,
	): void {
		if (this.env === 'development') this.logger[level](log, msg)
	}

	public info(log: unknown, msg?: string): void {
		this.showLogOnlyOnDevelopment('info', log, msg)
	}

	public error(log: unknown, msg?: string): void {
		this.showLogOnlyOnDevelopment('error', log, msg)
	}

	public warn(log: unknown, msg?: string): void {
		this.showLogOnlyOnDevelopment('warn', log, msg)
	}

	public debug(log: unknown, msg?: string): void {
		this.showLogOnlyOnDevelopment('debug', log, msg)
	}
}

export default PrettyLog.getInstance()