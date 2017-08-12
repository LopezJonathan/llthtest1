src = "https://www.gstatic.com/firebasejs/4.2.0/firebase.js";
// Initialize Firebase
 
var config = {
    apiKey: "AIzaSyC42UIRETC_VVO7cXGqo9ru8TlfDi_-El8",
    authDomain: "test-project-4d8c5.firebaseapp.com",
    databaseURL: "https://test-project-4d8c5.firebaseio.com",
    projectId: "test-project-4d8c5",
    storageBucket: "test-project-4d8c5.appspot.com",
    messagingSenderId: "591336136232"
};
firebase.initializeApp(config);


// Create reference
const dbRefObject = firebase.database().ref();
const dbRefList = dbRefObject.child('stuff');

//Get elements
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
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    //Sign in
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
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
                img.title = linkText;
                img.src = 'images/TestEgg1.png'
                    //img.href = 'egg' + 101 + '.html'

                section.appendChild(img)
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
                img.title = linkText;
                img.src = 'images/NewMysteryEgg.png'

                section.appendChild(img)
            }
            //console.log(snap.val())
        });

    }

});