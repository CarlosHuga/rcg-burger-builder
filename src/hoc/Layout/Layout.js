import React, { useState } from 'react'
import {connect} from 'react-redux'
import Aux from '../Aux/Aux'
import classes from './Layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'


const layout = (props) => {

    const [showSideDrawer, setShowSideDrawer] = useState(false)
    
    const sideDrawerClosedHandler = () => {
        setShowSideDrawer(false)
    }

    const toggleSideDrawer = () => {
        
        setShowSideDrawer((prevState) => {
            setShowSideDrawer(!prevState)
        })
        
    }
    
    
    return (
        <Aux>
            <div>
                <Toolbar
                    isAuth={props.isAuthenticated}
                    toggle={toggleSideDrawer}    
                /> 
                <SideDrawer
                    isAuth={props.isAuthenticated}
                    open={showSideDrawer} 
                    closed={sideDrawerClosedHandler}
                />
            </div>
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>
    )

}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(layout)