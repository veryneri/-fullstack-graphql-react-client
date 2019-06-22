import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const ADD_CAR = gql`
    mutation AddCar(
        $brand: String!,
        $color: String!,
        $doors: Int!,
        $type: CarTypes!
    ) {
        addCar(
            brand: $brand,
            color: $color,
            doors: $doors,
            type: $type
        ) {
            brand
            color
            id
        }
    }
`;

const CARS = gql`
    query {
        cars {
            id
            brand
            color
        }
    }
`;

export default class AddCar extends React.Component {
    render() {
        return (
            <Mutation
                mutation={ADD_CAR}
                update={(cache, { data: { addCar } }) => {
                    const data = cache.readQuery({
                        query: CARS
                    });
                    data.cars.push(addCar);
                    cache.writeQuery({ query: CARS, data });
                }}
            >
                {
                    (
                        addCar,
                        {
                            loading,
                            data,
                            error,
                            called,
                        },
                    ) => (
                        <div>
                            <button
                                onClick={() => {
                                    addCar({
                                        variables: {
                                            brand: 'Honda',
                                            color: 'Midnight Blue',
                                            doors: 2,
                                            type: 'Coupe',
                                        }
                                    })
                                }}
                            >
                                Add Car
                            </button>
                            { loading && <div>Loading ...</div> }
                            {
                                data && (
                                    <div>
                                        { data.addCar.id }
                                        { data.addCar.brand }
                                        { data.addCar.color }
                                    </div>
                                )
                            }
                        </div>
                    )
                }
            </Mutation>
        );
    }
}
