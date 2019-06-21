import React from 'react';
import { AddCar, Cars } from '../../graphql';

class Car extends React.Component {
    render() {
        return (
            <>
                <AddCar />
                <Cars />
            </>
        );
    }
}

export default Car;