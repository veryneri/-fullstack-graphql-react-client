import React from 'react';
import gql from 'graphql-tag';
import { WithProvider } from '../hocs';

class Car extends React.Component {
    state = {
        car: {},
        loading: true,
    };

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

    componentWillMount() {
        this.loadData();
    }

    render() {
        if (this.state.loading) {
            return 'Loading...';
        }
        return (
            <div>
                {this.state.car.brand}
            </div>
        );
    }
}

export default WithProvider(Car);