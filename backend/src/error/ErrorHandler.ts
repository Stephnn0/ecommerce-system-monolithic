import BaseError from "./BaseError"
import Http500Error from "./errors/h500Error"

export default class ErrorHandler {

    public static isTrustedError(err: Error): boolean {
		if (err instanceof BaseError) return err.isOperatinal
		return false
	}

    public static handle(err: Error): BaseError {

        if (this.isTrustedError(err) && err instanceof BaseError) return err

        
        console.log('error handler working')
        return new Http500Error()

    }
}