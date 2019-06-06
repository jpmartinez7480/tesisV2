import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Delete from '@material-ui/icons/Delete';
import Save from '@material-ui/icons/Save';
import blue from '@material-ui/core/colors/blue';

const styles = theme => ({
  rootChecked:{
    color:blue[700],
    '&$checked': {
      color: blue[600],
    },
  },
  checked:{},
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
      marginLeft:'10px'
    },
    textSelected:{
      color:'#fff',
      marginTop:'2px',
      letterSpacing:'1.1px',
      fontSize:'15px',
      marginLeft:'10px'
    },
    mySaveIcon:{
      color: '#9a9a9a',
      margin:'5px',
      cursor:'pointer'
    },
})


class History extends Component{
    constructor(props){
        super(props);
        this.state = {
            history: this.props.history,
            key: this.props.key,
            active: 1,
            checked:[1],
            indexSignalToDelete: 0
        }
    }

    handleToggle = value => () => {
      const { checked } = this.state;
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];
  
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
      this.setState({
        checked: newChecked,
      });
    }

    onChange(e){
      this.setState({filename:e.target.files[0]})
    }

    static getDerivedStateFromProps(props, state) {
      if (props.history !== state.history) {
        return {
          history: props.history
        };
      }
      return null;
    }

    chooseSignalToDelete(index){
      this.setState({indexSignalToDelete:index},()=>{console.log("H:" + this.state.indexSignalToDelete)})
      this.props.chooseSignalToDelete(index)
    }

    render(){
        const { classes } = this.props
        return(
            <Paper className = {classes.myCard} style = {{marginTop:'30px'}}>
              <Typography variant = "subtitle1" align = "center" style = {{color:'#fff',letterSpacing:'1.1px',paddingTop:'5px'}}>Historial</Typography>
              <List>
                {this.props.history.length !== 0 ? 
                  this.state.history.map((h,index) => (
                  <ListItem button style = {{paddingRight:'5px',paddingLeft:'5px'}} key = {index}>
                    <ListItemIcon>
                      <Save className = {classes.mySaveIcon}/>
                    </ListItemIcon>
                  <ListItemText style = {{padding:'0 5px'}} primary ={<Typography style={{ color: '#9a9a9a' }}>{h.name}</Typography>} secondary = {<Typography style={{ color: 'rgba(154,154,154,0.54)' }}>{h.data}</Typography>} />
                    <ListItemSecondaryAction>
                      <Delete onClick = {() => {this.chooseSignalToDelete(index)}} style = {{color: '#9a9a9a',fontSize:'20px',cursor:'pointer'}}/>
                    </ListItemSecondaryAction>
                </ListItem>
                ))
                :
                <Typography  variant = "body2" align = "center" style = {{color:'#9a9a9a',letterSpacing:'1.1px',paddingTop:'5px',fontStyle:'italic',fontSize:'0.667em'}}>No ha usado ningún filtro</Typography>
              }
              </List>
            </Paper>
        )
    }

}


export default (withStyles(styles)(History));