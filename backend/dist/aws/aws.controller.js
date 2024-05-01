"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsController = void 0;
const aws_1 = require("./aws");
class AwsController {
    constructor() {
        this.generateAWSurl = async (req, res) => {
            try {
                const url = await (0, aws_1.generateUploadURL)();
                res.send({ url });
            }
            catch (err) {
                console.log(err);
            }
        };
    }
}
exports.AwsController = AwsController;
//# sourceMappingURL=aws.controller.js.map