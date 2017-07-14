'use strict';
import React from 'react';
import {connect} from 'react-redux';
import HomePage from '../pages/HomePage';

class HomeContainers extends React.Component {
    render() {
        return (
            <HomePage {...this.props} />
        )
    }
}

export default connect((state) => {

    const { HomePage } = state;
    return {
        HomePage
    }
})(HomeContainers);
