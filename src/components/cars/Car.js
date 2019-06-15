import React from 'react';
import { CarById } from '../../graphql';

class Car extends React.Component {
    render() {
        return <CarById id="a" />
    }
}

export default Car;