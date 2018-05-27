import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import NativeSelect from "@material-ui/core/NativeSelect";

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500
  }
});

class FullWidthTabs extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <Tab label="Personal Settings" />
            <Tab label="Company Settings" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
            <div className={classes.container}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="name-simple">First Name</InputLabel>
                <Input
                  id="name-simple"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
              </FormControl>
            </div>

            <div className={classes.container}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="name-simple">Last Name</InputLabel>
                <Input
                  id="name-simple"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
              </FormControl>
            </div>
            <div className={classes.container}>
              <form className={classes.container} noValidate>
                <TextField
                  id="date"
                  label="Date of birth"
                  type="date"
                  defaultValue="2017-05-24"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </form>
            </div>
            <div className={classes.container}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="uncontrolled-native">Gender</InputLabel>
                <NativeSelect
                  defaultValue={30}
                  input={<Input id="uncontrolled-native" />}
                >
                  <option value={"Male"}>Male</option>
                  <option value={"Female"}>Female</option>
                  <option value={"Alien"}>Alien</option>
                </NativeSelect>
              </FormControl>
            </div>

            <div className={classes.container}>
                <TextField
                  id="multiline-flexible"
                  label="Description"
                  fullWidth
                  multiline
                  rowsMax="4"  
                  margin="normal"
                />
            </div>
          </TabContainer>

          <TabContainer dir={theme.direction}>Company Settings</TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}

FullWidthTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(FullWidthTabs);
