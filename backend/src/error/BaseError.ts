export default class BaseError extends Error {
	constructor(
		public readonly name: string,
		public readonly status: number,
		public readonly isOperatinal: boolean,
		public readonly code: string,
		public readonly message: string,
	) {
		super(message)

		Object.setPrototypeOf(this, new.target.prototype)
		this.name = name
		this.status = status
		this.isOperatinal = isOperatinal
		this.code = code
		this.message = message

		Error.captureStackTrace(this)
	}
}

