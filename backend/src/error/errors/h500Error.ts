import httpStatus from "http-status";
import BaseError from "../BaseError";

export default class Http500Error extends BaseError {
	constructor(
		public readonly code: string = 'INTERNAL_SERVER_ERROR',
		public readonly message: string = 'Something went wrong please try again later.',
	) {
		super(
			'InternalServerError',
			httpStatus.INTERNAL_SERVER_ERROR,
			true,
			code,
			message,
		)
	}
}