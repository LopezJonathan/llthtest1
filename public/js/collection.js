// Initialize Firebase
var config = {
	apiKey: "AIzaSyBi8HNIbweZnYK0RE3oEt0gjj9zpnV9TJo",
	authDomain: "llth-firebasetest.firebaseapp.com",
	databaseURL: "https://llth-firebasetest.firebaseio.com",
	projectId: "llth-firebasetest",
	storageBucket: "llth-firebasetest.appspot.com",
	messagingSenderId: "212300061606"
};
firebase.initializeApp(config);

// Create reference
const dbRefObject = firebase.database().ref();
const dbRefList = dbRefObject.child('stuff');

//Get elements
const txtName = document.getElementById('txtName');
const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');
const txtLogin = document.getElementById('btnLogin');
const txtSignUp = document.getElementById('btnSignUp');
const txtLogout = document.getElementById('btnLogout');
const LoginMessage = document.getElementById('LoginMessage')

//Add Login Event
btnLogin.addEventListener('click', e => {
    //Get email and pass
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    //Sign in
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
});

//Add signup event
btnSignUp.addEventListener('click', e => {
    //Get email and pass
    //TODO: Check for real Emails

    const name = txtName.value;
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    //Sign in
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));

-
});

//
btnLogout.addEventListener('click', e => {
    firebase.auth().signOut();
});

//Add a realtime Listner
firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        console.log(firebaseUser);
        LoginMessage.classList.add('hide');
        btnLogout.classList.remove('hide');
        btnLogin.classList.add('hide');
        btnSignUp.classList.add('hide');
    } else {
        console.log('not Logged in');
        LoginMessage.classList.remove('hide');
        btnLogout.classList.add('hide');
        btnLogin.classList.remove('hide');
        btnSignUp.classList.remove('hide');
    }
});

//egg collection function
firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        const collection = document.getElementById('collection')

        //const e1 = document.getElementById('e1')
        const dbUserRef = firebase.database().ref();
        const dbEggRef = dbUserRef.child('users').child(firebaseUser.uid).child('eui');

        //const notCollected = 0;
        //const collected = 0;

        dbEggRef.orderByChild('eggNum').on('child_added', function(snap) {
            if (snap.val().bool == "true") {
                const section = document.createElement('section');
                section.classList.add('eggItem');
                collection.appendChild(section);

                const h1 = document.createElement('h1');
                h1.innerText = 'Egg ' + snap.val().eggNum;
                section.appendChild(h1);

                const img = document.createElement('img');
                const linkText = document.createTextNode('egg' + snap.val().eggNum);
                img.appendChild(linkText);
                img.classList.add('eggImage');
                img.title = 'egg' + snap.val().eggNum;
                img.id = 'egg' + snap.val().eggNum;

                ////until more images are added this is here so that if any eggs that are listed as greater or less than 101 to 103 have an image
                ////when new images are added all you will need to do is save an image with the number of the egg and a string value that is static and it will pick it up.
                //img.src = 'images/TestEgg' + snap.val().eggNum + '.png';
                if (snap.val().eggNum <= 100 || snap.val().eggNum >= 104) {
                    img.src = 'images/TestEgg102.png';
                } else {
                    img.src = 'images/TestEgg' + snap.val().eggNum + '.png';
                }
                ////similarly to the image if the name of a website contains the egg value then it should be able to be pulled up this way.
                //img.href = 'https://haakonj.github.io/Prototype-Firebase-App/egg' + snap.val().eggNum + '.html'

                section.appendChild(img)
                    //collected++;
            } else {
                const section = document.createElement('section');
                section.classList.add('eggItem');
                collection.appendChild(section);

                const h1 = document.createElement('h1');
                h1.innerText = 'Egg ' + snap.val().eggNum;
                section.appendChild(h1);

                const img = document.createElement('img');
                const linkText = document.createTextNode('egg' + snap.val().eggNum);
                img.appendChild(linkText);
                img.classList.add('eggImage');
                img.title = 'egg' + snap.val().eggNum;
                img.id = 'egg' + snap.val().eggNum;
                img.src = 'images/NewMysteryEgg.png';

                section.appendChild(img);
                //notCollected++;
                //collected++;
            }
            //const pecentCollect;
            //const collectedegg = notCollected / collected;
            // pecentCollect = Math.round(collectedegg * 100);
        });

    }

});