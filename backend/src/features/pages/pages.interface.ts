interface IPage {
    id?: string;
    title: string;
    color: string;
}


interface IPageService {
    getSinglePage(pageId: string): any
}


export {IPage,  IPageService}