import React from 'react';
import Context from '../../context';

const { Consumer } = Context;

export default Component => {
    return props => (
        <Consumer>
            {
                client => (
                    <Component
                        {...props}
                        client={client}
                    />
                )
            }
        </Consumer>
    );
}