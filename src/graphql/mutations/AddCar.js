import React from 'react';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';

class AddCar extends React.Component {
    state = {
        insertedCar: {} 
    };

    addCar = async () => {
        const result = await this.props.client.mutate({
            mutation: gql`
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
            `,
            variables: {
                brand: 'Honda',
                color: 'Midnight Blue',
                doors: 4,
                type: 'Coupe'
            },
        });
        console.log(result);
        this.setState({
            insertedCar: result.data.addCar
        });
    }

    componentDidMount() {
        this.addCar();
    }

    render() {
        const {
            brand,
            color,
            id,
        } = this.state.insertedCar;

        return (
            <div>
                {id}
                {brand}
                {color}
            </div>
        );
    }
}

export default withApollo(AddCar);
