import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';

class Car extends React.Component {
    state = {};

    loadData = async (client) => {
        const car = await client.query({
            query: gql`
                {
                    carById(id: "a") {
                        color
                        brand
                        parts {
                        name
                        }
                    }
                }
            `,
        });

        this.setState({
            car: car.data.carById,
            loading: car.loading,
        });
    }

    render() {
        if (this.state.loading) {
            return 'Loading...';
        }
        
        return (
            <>
                {
                    this.state.car && (
                        <div>
                            {this.state.car.brand}
                        </div>
                    )
                }
                <ApolloConsumer>
                    {
                        client => (
                            <button onClick={() => this.loadData(client)}>Query</button>
                        )
                    }
                </ApolloConsumer>
            </>
        );
    }
}

export default Car;