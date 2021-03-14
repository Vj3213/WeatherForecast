import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {
    render() {
        console.log("props----", this.props.isLoading)
        return null;
    }
}

const mapStateToProps = (state) => ({ ...state })

export default connect(mapStateToProps)(Home);