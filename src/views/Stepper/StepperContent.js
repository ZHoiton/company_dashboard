import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from "material-ui/Button";
import TextField from "material-ui/TextField/TextField";
import Chip from "material-ui/Chip";
import './styles.css';

export default class Stepper extends Component {
	static defaultProps = {
		completed: false,
		text: 'Missing text',
	}
	static propTypes = {
		step: PropTypes.object.isRequired,
	}

	render() {
		const { step } = this.props;
		return (
			<Fragment>
				<TextField
					label="Name"
					className="text-field"
					onChange={this.onChange("companyName")}
					margin="normal"
				/>
				{step.index === 0?
					<Fragment>
						<TextField
							id="company-location"
							label="Location"
							className="text-field"
							onChange={this.onChange("companyLocation")}
							margin="normal"
						/>
						<TextField
							id="company-founded"
							label="Founded"
							className="text-field"
							onChange={this.onChange("companyFounded")}
							margin="normal"
						/>
					</Fragment>:undefined}
				{step.index > 0?
					<Fragment>
						<Button
							variant="raised"
							color="primary"
							className="create-card-button"
							onClick={this.onAddChip}
						>
							{step.label}
						</Button>
						<div>
							{step.list.map((data, index) => {
								const avatar = null;
								return (
									<Chip
										key={index}
										avatar={avatar}
										label={data}
										onDelete={this.onDeleteChip(data)}
										className="chip"
									/>
								);
							})}
						</div>
					</Fragment>:undefined}
			</Fragment>
		);
	}
}
