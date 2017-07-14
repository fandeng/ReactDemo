'use strict';
import React from 'react';
import {connect} from 'react-redux';
import FindPage from '../pages/FindPage';

class FindContainers extends React.Component {
    render() {
        return (
            <FindPage {...this.props} />
        )
    }
}

export default connect((state) => {

    const { FindPage } = state;
    return {
        FindPage
    }
})(FindContainers);
