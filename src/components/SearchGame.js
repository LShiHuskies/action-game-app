import React, { Component, Fragment } from 'react';


import { TextField, Button } from '@mui/material';
import { Field, reduxForm } from 'redux-form';

class SearchGame extends Component {

    constructor(props) {
      super(props);

      this.state = {
        Game_Name: '',
        Game_ID: '',
      }
    }

    handleChange = (event) => {
      const { name, value } = event.target;

      this.setState({
        [name]: value,
      });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const { user, searchGameById } = this.props;
        const { name } = e.target;

        if (name === "Game_ID") {
          await searchGameById({
            user,
            game_id: this.state[name],
          });
        } else if (name === "Game_Name") {
          
        }
    }

    renderField = (props) => {
        const { label, required, input: { name, onBlur, onChange }, meta: { touched } } = props;
        return (
            <Fragment>
                <label className="form_label">{label}</label>
                <TextField
                    name={name}
                    variant="outlined"
                    id="standard-error-helper-text"
                    // helperText={required ? `Please enter your ${name}` : `Please enter your ${label.toLowerCase()}`}
                    // error={touched && !'' && required ? true : false}
                    onChange={e => onChange(e)}
                    onBlur={onBlur}
                    value={this.state[name]}
                    {...props}
                    style={{ padding: '0px', margin: '0 13px 13px' }}
                />
            </Fragment>
      )
    }


    render() {
        return (
        <div style={{ width: '50%', height: '100%', backgroundColor: '#C0C0C0', color: 'black' }}>
          <h1 style={{ textAlign: "center", padding: '13.4px 0', margin: '0', fontSize: '20px', height: '16%' }}>
            Search Available Game
          </h1>
          <div className="App-header" style={{ justifyContent: 'flex-start', backgroundColor: '#C0C0C0', color: 'black', minHeight: '0', height: '87%' }}>
            <form name="Game_Name" style={{ width: '100%' }} onSubmit={this.handleSubmit}>
              <Field 
                type="text"
                label="Name of Game"
                name="Game_Name"
                component={this.renderField}
                onChange={this.handleChange}
                value={this.state.Game_Name}
              />
              <Button id="submit" type="submit" variant="contained" color="primary"
                style={{ margin: '0 15px 15px', height: '35px', width: '20px' }}>
                Search
              </Button>
            </form>
            <form name="Game_ID" style={{ width: '100%' }} onSubmit={this.handleSubmit}>
              <Field
                type="text"
                label="ID of Game"
                name="Game_ID"
                component={this.renderField}
                onChange={this.handleChange}
                value={this.state.Game_ID}
              />
              <Button id="submit" type="submit" variant="contained" color="primary"
                style={{ margin: '0 15px 15px', height: '35px', width: '20px' }}>
                  Search
              </Button>
            </form>
          </div>
        </div>
        )
    }
}


const reForm = reduxForm({
    form: 'SearchGame',
    touchOnChange: true,
    touchOnBlur: true
})(SearchGame);

export default reForm;
