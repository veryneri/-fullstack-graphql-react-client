import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const CAR_BY_ID = gql`
    query CarById($id: ID!) {
        carById(id: $id) {
            brand
        }
    }
`;

export default ({id}) => (
    <Query
        query={CAR_BY_ID}
        variables={{id}}
    >
        {
            ({
                loading,
                error,
                data,
                refetch,
                networkStatus,
            }) => {
                if (loading) {
                    return 'Loading...';
                }
                if (error) {
                    return 'Error';
                }

                setTimeout(() => refetch({ id: 'b' }), 2000);

                return data.carById.brand;
            }
        }
    </Query>
);