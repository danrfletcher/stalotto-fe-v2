export class StaticPageDataTypeFetchError extends Error {
    constructor(message = 'There was a problem fetching data for this page. Please click reload or try again later.') {
        super(message);
        this.name = this.constructor.name; // Set the error name as the class name
        if ((Error as any).captureStackTrace) {
            (Error as any).captureStackTrace(this, StaticPageDataTypeFetchError);
        }
    }
}
