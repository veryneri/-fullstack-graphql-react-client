import React from 'react';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';

class Car extends React.Component {
    state = {};

    loadData = async (id) => {
        const car = await this.props.client.query({
            query: gql`
                query CarById($id: ID!){
                    carById(id: $id) {
                        brand
                    }
                }
            `,
            variables: {id},
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
                <button onClick={() => this.loadData('a')}>Query</button>
            </>
        );
    }
}

export default withApollo(Car);