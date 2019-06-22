import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

const httpLink = new HttpLink({
    uri: 'http://localhost:4000/graphql',
});
const wsLink = new WebSocketLink({
    options: {
        reconnect: true,
    },
    uri: 'ws://localhost:4000/graphql',
});
const splitter = split(
    ({ query }) => {
        const {
            kind,
            operation,
        } = getMainDefinition(query);

        return (
            kind === 'OperationDefinition' &&
            operation === 'subscription'
        );
    },
    wsLink,
    httpLink,
);

export default new ApolloClient({
    cache: new InMemoryCache(),
    link: splitter, 
});