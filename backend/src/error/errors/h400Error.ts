import httpStatus from "http-status";
import BaseError from "../BaseError";

export default class Http400Error extends BaseError {
	constructor(
		public readonly code: string = 'BAD_REQUEST',
		public readonly message: string = 'Provided request format is invalid.',
	) {
		super('BadRequest', httpStatus.BAD_REQUEST, true, code, message)
	}
}
