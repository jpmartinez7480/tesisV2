import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import routes from "../routes/routes.js"
import ToolSidebar from "../components/Sidebar/toolSidebar";
import ToolbarActions from "../components/Sidebar/ToolbarActions"
const styles = theme => {}

class layout extends Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    render(){
        const { classes } = this.props;
        const { value } = this.state;
        return(
            <div className = {classes.wrapper}>
                <Sidebar {...this.props}/>
                <Switch>
                    {routes.map((prop,key) =>{
                        if(prop.redirect)
                            return <Redirect from = {prop.path} to = {prop.to} key = {key} />;
                        return (
                            <Route path = {prop.path} component={prop.component} key = {key} />
                        );
                    })}
                </Switch>
            </div>
        );
    }

}

layout.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(layout);