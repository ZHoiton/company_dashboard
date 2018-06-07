import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField/TextField";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Chip from "@material-ui/core/Chip";

export default class Stepper extends Component {
	static propTypes = {
		step: PropTypes.object.isRequired,
		onDeleteChip: PropTypes.func,
		onAddChip: PropTypes.func,
		onTextChange: PropTypes.func.isRequired,
		review: PropTypes.object,
	}

	render() {
		const { step, onDeleteChip, onAddChip, onTextChange, review } = this.props;
		return (
			<CardContent className="create-company-card-content">
				<div className="create-company-step">
					{!step.isLast?
						<TextField
							id='name'
							label="Name"
							className="text-field"
							onChange={onTextChange}
							margin="normal"
						/>:
						<div className="create-company-step">
							<Typography>Make sure everything is correct</Typography>
							{Object.keys(review).map((key)=> {
								return (<Typography key={key}>{`${key}: ${review[key]}`}</Typography>);
							})}
						</div>}
					{step.index === 0?
						<Fragment>
							<TextField
								id='location'
								label="Location"
								className="text-field"
								onChange={onTextChange}
								margin="normal"
							/>
							<TextField
								id='founded'
								label="Founded"
								className="text-field"
								onChange={onTextChange}
								margin="normal"
							/>
						</Fragment>:undefined}
					{(step.data)?
						<Fragment>
							<Button
								variant="raised"
								color="primary"
								className="create-card-button"
								onClick={onAddChip.bind(this,step.index)}
							>
								{(step.text)?step.text.slice(0,-1):undefined}
							</Button>
							<div>
								{step.data.map((data, index) => {
									const avatar = null;
									return (
										<Chip
											key={index}
											avatar={avatar}
											label={data}
											onDelete={onDeleteChip.bind(this,index,step.index)}
											className="chip"
										/>
									);
								})}
							</div>
						</Fragment>:undefined}
				</div>
			</CardContent>
		);
	}
}
