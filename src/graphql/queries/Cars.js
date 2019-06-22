import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

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
                    <div>
                        <p>All cars</p>
                        {
                            data.cars.map(car => (
                                <div key={car.id}>
                                    {car.id} {car.brand} {car.color}
                                </div>
                            ))
                        }
                    </div>
                );
            }
        }
    </Query>
);