import React from 'react';
import Context from "../context";

const { Provider } = Context;

export default props => <Provider value={props.client}>{props.children}</Provider>
