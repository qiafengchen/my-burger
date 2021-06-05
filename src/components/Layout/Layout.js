import React , { Component } from 'react';
import { connect } from 'react-redux';

import Auxiliary from '../../hoc/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerToggleHandler = () => {
        this.setState ( (prevState) => {
            return {showSideDrawer:!prevState.showSideDrawer};
        });//secure way to use old state
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer:false});
    }

    render () {
        return (
        <Auxiliary>
            <Toolbar isAuth={this.props.isAuthenticated} showMenu={this.sideDrawerToggleHandler}/>
            <SideDrawer isAuth={this.props.isAuthenticated} open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Auxiliary>
        )
    }
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
} 

export default connect(mapStateToProps)(layout);