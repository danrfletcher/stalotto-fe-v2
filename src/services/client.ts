import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

const baseApiUrl = import.meta.env.VITE_API_BASE_URL;
const graphQlApiUrl = `${baseApiUrl}/graphql`

const httpLink = new HttpLink({
    uri: graphQlApiUrl,
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('userToken');

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.forEach((err) => {
            const { message, locations, path } = err;
            console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`, err);
        });
    if (networkError) console.error(`[Network error]: `, networkError);
});

const client = new ApolloClient({
    link: from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache(),
});

export default client