export class StaticPageDataClass {
    identifier: string;
    urlKey: string;
    title: string;
    innerHtml: string;
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;

    constructor(data: StaticPageDataType) {
        this.identifier = data.identifier;
        this.urlKey = data.urlKey;
        this.title = data.title;
        this.innerHtml = data.innerHtml;
        this.metaTitle = data.metaTitle;
        this.metaDescription = data.metaDescription;
        this.metaKeywords = data.metaKeywords;
    }
}
