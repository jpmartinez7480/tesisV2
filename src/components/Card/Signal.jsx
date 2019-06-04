import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon'
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import MenuList from '@material-ui/core/MenuList';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Timeline from '@material-ui/icons/Timeline';

const styles = theme => ({
    myCard:{
        backgroundColor:'#27293D',
        height:'250px',
        overflowY:'auto',
        '&::-webkit-scrollbar': {
          width: '0.4em'
        },
        '&::-webkit-scrollbar-track': {
          '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.2)'
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(30,30,47,.8)',
          outline: '1px solid slategrey',
          borderRadius:'30px'
        }
      },
      myCardTitle:{
        textAlign:'center'
      },
      textSignal:{
        color:'#9a9a9a',
        marginTop:'2px',
        letterSpacing:'1.1px',
        fontSize:'15px',
        
      },
      textSelected:{
        color:'#fff',
        marginTop:'2px',
        letterSpacing:'1.1px',
        fontSize:'15px',
        marginLeft:'10px'
      },
      selected:{
        backgroundColor: '#ED7602 !important',
        color:'#fff'
      },
})


class Signal extends Component{
    constructor(props){
        super(props);
        this.state = {
            signals: this.props.signals_history,
            key: 3,
            active: 1
        }
    }

    static getDerivedStateFromProps(props, state) {
      if (props.signals_history !== state.signals_history) {
        return {
          signals: props.signals_history
        };
      }
      return null;
    }

    render(){
        const { classes } = this.props
        return(
            <Paper className = {classes.myCard}>
                <Typography variant = "subtitle1" align = "center" style = {{color:'#fff',letterSpacing:'1.1px',paddingTop:'5px'}}>Señales</Typography>
                <MenuList>
                {this.props.signals_history.length !== 0 ? 
                  
                  this.state.signals.map((s,index) => (
                  <MenuItem  button className = {classes.menuItem} key = {index} classes = {{selected:classes.selected}} >
                    <ListItemIcon>
                      <Timeline style = {{color:'#fff',width:'32px',height:'26px'}}/>
                    </ListItemIcon>
                    <ListItemText disableTypography className = {classes.textSignal} primary = {s.filter} />
                  </MenuItem>
                ))
                :
                <Typography  variant = "body2" align = "center" style = {{color:'#9a9a9a',letterSpacing:'1.1px',paddingTop:'5px',fontStyle:'italic',fontSize:'0.667em'}}>No ha cargado ninguna señal</Typography>
              }
              </MenuList>
                </Paper>
        )
    }

}


export default (withStyles(styles)(Signal));