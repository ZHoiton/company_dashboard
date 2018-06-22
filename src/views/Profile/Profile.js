import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import '../styles/ProfileStyles.css';
import { firestore } from "firebase";
import PropTypes from "prop-types";

export default class Profile extends Component {

	static propTypes = {
		user: PropTypes.object
	};

	constructor(props) {
		super(props);

		this.state = {
			ref: firestore().collection("users"),
			first: "",
			last: "",
			image: ""
		};
	}

	retrieveUser()
	{
		const { user } = this.props;
		const { ref } = this.state;

		ref
			.doc(user.id)
			.get()
			.then(info =>
			{
				const firstName = info.data().firstName;
				const lastName = info.data().lastName;
				const image = info.data().photoURL;
				this.setState({ first: firstName, last: lastName, image: image });
			});
	}

	componentDidMount()
	{
		this.retrieveUser();
	}

	render() {
		const { first, last, image} = this.state;
		return (
			<Card className='profile-page'>
				<CardHeader title= {first+ " " + last}/>
				<CardContent >
					<div className='profile-info-box'>
						<Avatar alt="Remy Sharp" src= {image} className='profile-picture'/>
						<Card className='profile-info'>
							<p>Height: 135 cm</p>
							<p>Weight: 43 kg</p>
							<p>Country: Netherlands</p>
							<p>Position: CEO</p>
							<p>Company: Fontys</p>
						</Card>
					</div>
					<Card className='profile-activity'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget iaculis leo. Donec ut quam tempus quam sagittis rhoncus eu sit amet eros. Fusce ullamcorper velit tellus, id cursus diam suscipit ac. Praesent a erat dignissim, rhoncus nunc volutpat, euismod justo. Maecenas et facilisis tortor, ut vulputate quam. Suspendisse enim massa, condimentum quis mauris sed, fermentum ullamcorper enim. Aliquam mollis dapibus dignissim. Vestibulum vel pharetra metus. Vestibulum interdum efficitur felis nec commodo. Ut facilisis felis vel augue lobortis volutpat.
					</Card>
					<Card className='profile-activity'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget iaculis leo. Donec ut quam tempus quam sagittis rhoncus eu sit amet eros. Fusce ullamcorper velit tellus, id cursus diam suscipit ac. Praesent a erat dignissim, rhoncus nunc volutpat, euismod justo. Maecenas et facilisis tortor, ut vulputate quam. Suspendisse enim massa, condimentum quis mauris sed, fermentum ullamcorper enim. Aliquam mollis dapibus dignissim. Vestibulum vel pharetra metus. Vestibulum interdum efficitur felis nec commodo. Ut facilisis felis vel augue lobortis volutpat.
					</Card>
					<Card className='profile-activity'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget iaculis leo. Donec ut quam tempus quam sagittis rhoncus eu sit amet eros. Fusce ullamcorper velit tellus, id cursus diam suscipit ac. Praesent a erat dignissim, rhoncus nunc volutpat, euismod justo. Maecenas et facilisis tortor, ut vulputate quam. Suspendisse enim massa, condimentum quis mauris sed, fermentum ullamcorper enim. Aliquam mollis dapibus dignissim. Vestibulum vel pharetra metus. Vestibulum interdum efficitur felis nec commodo. Ut facilisis felis vel augue lobortis volutpat.
					</Card>
					<Card className='profile-activity'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget iaculis leo. Donec ut quam tempus quam sagittis rhoncus eu sit amet eros. Fusce ullamcorper velit tellus, id cursus diam suscipit ac. Praesent a erat dignissim, rhoncus nunc volutpat, euismod justo. Maecenas et facilisis tortor, ut vulputate quam. Suspendisse enim massa, condimentum quis mauris sed, fermentum ullamcorper enim. Aliquam mollis dapibus dignissim. Vestibulum vel pharetra metus. Vestibulum interdum efficitur felis nec commodo. Ut facilisis felis vel augue lobortis volutpat.
					</Card>
				</CardContent>
			</Card>
		);
	}
}
