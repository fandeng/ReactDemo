'use strict';
import React from 'react';
import {connect} from 'react-redux';
import MinePage from '../pages/MinePage';

class MineContainer extends React.Component {
    render() {
        return (
            <MinePage {...this.props} />
        )
    }
}

export default connect((state) => {

    const { MinePage } = state;
    return {
        MinePage
    }
})(MineContainer);
