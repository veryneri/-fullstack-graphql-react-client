import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

const httpLink = new HttpLink({
    uri: 'http://localhost:4000/graphql',
});

export default new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink, 
});