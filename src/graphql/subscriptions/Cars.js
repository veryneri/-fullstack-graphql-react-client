import React from 'react';
import gql from 'graphql-tag';

const SUBSCRIPTION = gql(`
    subscription {
        carAdded {
            id
            brand
            color
        }
    }
`);

export default class Cars extends React.Component {
    componentDidMount() {
        this.props.subscribeToMore({
            document: SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) {
                    return prev;
                }

                const car = subscriptionData.data.carAdded;
                const newCars = Object.assign(
                    {},
                    prev,
                    {
                        cars: [...prev.cars, car,]
                    },
                );

                return newCars;
            },
        });
    }

    render() {
        return (
            <div>
                <p>All cars</p>
                {
                    this.props.cars.map(car => (
                        <div key={car.id}>
                            {car.id} {car.brand} {car.color}
                        </div>
                    ))
                }
            </div>
        );
    }
}
