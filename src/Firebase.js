import * as firebase from 'firebase';
import 'firebase/firestore';

const config = {
	apiKey: "AIzaSyAFsU19TdHpg76BQGx273Uk1_Kxinzd3_U",
	authDomain: "proep-project.firebaseapp.com",
	databaseURL: "https://proep-project.firebaseio.com",
	projectId: "proep-project",
	storageBucket: "proep-project.appspot.com",
	messagingSenderId: "638784865688"
};

firebase.initializeApp(config);
firebase.firestore().settings({timestampsInSnapshots: true});

