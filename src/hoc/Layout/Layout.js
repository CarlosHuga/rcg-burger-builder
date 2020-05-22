import React,{Component} from 'react'
import {connect} from 'react-redux'
import Aux from '../Aux/Aux'
import classes from './Layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'


class Layout extends Component {

    state = {
        showSideDrawer: false,

    }
    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }

    toggleSideDrawer = () => {
        this.setState(prevState => ({
            showSideDrawer: !prevState.SideDrawer
          }))
    }
    
    render() {
        return (
            <Aux>
                <div>
                    <Toolbar
                        isAuth={this.props.isAuthenticated}
                        toggle={this.toggleSideDrawer}    
                    /> 
                    <SideDrawer
                        isAuth={this.props.isAuthenticated}
                        open={this.state.showSideDrawer} 
                        closed={this.sideDrawerClosedHandler}
                    />
                </div>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
            )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout)