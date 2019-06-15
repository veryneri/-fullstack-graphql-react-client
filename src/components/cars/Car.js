import React from 'react';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';

class Car extends React.Component {
    state = {};

    loadData = async () => {
        const car = await this.props.client.query({
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
                <button onClick={this.loadData}>Query</button>
            </>
        );
    }
}

export default withApollo(Car);