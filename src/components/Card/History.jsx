import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Clear from '@material-ui/icons/Clear';

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
        marginLeft:'10px'
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
            history: this.props.history,
            key: this.props.key,
            active: 1
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

    render(){
        const { classes } = this.props
        return(
            <Paper className = {classes.myCard} style = {{marginTop:'30px'}}>
              <Typography variant = "subtitle1" align = "center" style = {{color:'#fff',letterSpacing:'1.1px',paddingTop:'5px'}}>Historial</Typography>
              <List>
                {this.state.history.map((h,index) => (
                  <ListItem button style = {{paddingRight:'5px',paddingLeft:'5px'}} key = {index}>
                    <ListItemAvatar>
                      <Checkbox
                        classes={{
                            root: classes.rootChecked,
                            checked: classes.checked,
                        }}
                        onChange={this.handleToggle(1)}
                        checked={this.state.checked.indexOf(1) !== -1}
                      />
                    </ListItemAvatar>
                  <ListItemText style = {{padding:'0 5px'}} primary ={<Typography style={{ color: '#9a9a9a' }}>{h.name}</Typography>} secondary = {<Typography style={{ color: 'rgba(154,154,154,0.54)' }}>{h.data}</Typography>} />
                    <ListItemSecondaryAction>
                      <Clear style = {{color: '#D50000',fontSize:'16px'}}/>
                    </ListItemSecondaryAction>
                </ListItem>
                ))}
                
              </List>
            </Paper>
        )
    }

}


export default (withStyles(styles)(Signal));