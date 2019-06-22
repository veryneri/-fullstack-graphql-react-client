import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Cars } from '../subscriptions';

const CARS = gql`
    query {
        cars {
            id
            brand
            color
        }
    }
`;

export default () => (
    <Query query={CARS}>
        {
            ({
                loading,
                error,
                data,
                subscribeToMore,
            }) => {
                if (loading) {
                    return 'Loading...';
                }
                if (error) {
                    return 'Error';
                }

                return (
                    <Cars
                        cars={data.cars}
                        subscribeToMore={subscribeToMore}
                    />
                );
            }
        }
    </Query>
);