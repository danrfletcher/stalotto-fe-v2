export class StaticPageDataFetchError extends Error {
    constructor(message = 'There was a problem fetching data for this page. Please click reload or try again later.') {
        super(message);
        this.name = this.constructor.name;
        if ((Error as any).captureStackTrace) {
            (Error as any).captureStackTrace(this, StaticPageDataFetchError);
        }
    }
}

export class AuthenticationError extends Error {
    constructor(message = 'User credentials were missing or invalid. Please log in & try again.') {
        super(message);
        this.name = this.constructor.name;
        if ((Error as any).captureStackTrace) {
            (Error as any).captureStackTrace(this, AuthenticationError);
        }
    }
}
