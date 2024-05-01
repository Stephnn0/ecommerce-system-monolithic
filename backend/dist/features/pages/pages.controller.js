"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageController = void 0;
const pages_service_1 = require("./pages.service");
class PageController {
    constructor() {
        this.getSinglePage = async (request, response) => {
            const { id } = request.query;
            console.log(id, 'id');
            try {
                const singlePage = await this.pageService.getSinglePage(id);
                response.status(200).json(singlePage);
            }
            catch (err) {
                console.log('error', err);
                response.status(500).json({ message: err });
            }
        };
        this.pageService = new pages_service_1.PageService();
    }
}
exports.PageController = PageController;
//# sourceMappingURL=pages.controller.js.map