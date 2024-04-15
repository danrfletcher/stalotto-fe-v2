export const getStaticPageQuery = `
    query GetCMSPage($id: String!) {
        cmsPage(identifier: $id) {
            identifier
            url_key
            title
            content
            meta_title
            meta_description
            meta_keywords
        }
    }
`;