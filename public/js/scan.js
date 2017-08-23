<<<<<<< HEAD
 src = "https://www.gstatic.com/firebasejs/4.3.0/firebase.js"

   // Initialize Firebase
  
 var config = {   apiKey: "AIzaSyC42UIRETC_VVO7cXGqo9ru8TlfDi_-El8",   authDomain: "test-project-4d8c5.firebaseapp.com",   databaseURL: "https://test-project-4d8c5.firebaseio.com",   projectId: "test-project-4d8c5",   storageBucket: "test-project-4d8c5.appspot.com",   messagingSenderId: "591336136232"  }; 
 firebase.initializeApp(config);


 //Get elements
 const txtName = document.getElementById('txtName');
 const txtEmail = document.getElementById('txtEmail');
 const txtPassword = document.getElementById('txtPassword');
 const txtLogin = document.getElementById('btnLogin');
 const txtSignUp = document.getElementById('btnSignUp');
 const txtLogout = document.getElementById('btnLogout');

 const LoginMessage = document.getElementById('LoginMessage');
 const map = document.getElementById('map');
 const btnScan = document.getElementById('btnScan');

 const nRef = firebase.database().ref();
 const eggs = nRef.child('eggs');

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

     const dbUserRef = firebase.database().ref();

     firebase.auth().onAuthStateChanged(firebaseUser => {
         if (firebaseUser) {
             dbUserRef.child('users').child(firebaseUser.uid).set({
                 UserName: name,
                 Email: email,
                 timeStamp: new Date().toString(),
                 eui: {
                     e1ui: { bool: false, eggNum: 1 },
                     e2ui: { bool: false, eggNum: 2 },
                     e3ui: { bool: false, eggNum: 3 },
                     e4ui: { bool: false, eggNum: 4 },
                     e5ui: { bool: false, eggNum: 5 },
                     e6ui: { bool: false, eggNum: 6 },
                     e7ui: { bool: false, eggNum: 7 },
                     e8ui: { bool: false, eggNum: 8 },
                     e9ui: { bool: false, eggNum: 9 },
                     e10ui: { bool: false, eggNum: 10 },
                     e11ui: { bool: false, eggNum: 11 },
                     e12ui: { bool: false, eggNum: 12 },
                     e13ui: { bool: false, eggNum: 13 },
                     e14ui: { bool: false, eggNum: 14 },
                     e15ui: { bool: false, eggNum: 15 },
                     e16ui: { bool: false, eggNum: 16 },
                     e17ui: { bool: false, eggNum: 17 },
                     e18ui: { bool: false, eggNum: 18 },
                     e19ui: { bool: false, eggNum: 19 },
                     e20ui: { bool: false, eggNum: 20 },
                     e21ui: { bool: false, eggNum: 21 },
                     e22ui: { bool: false, eggNum: 22 },
                     e23ui: { bool: false, eggNum: 23 },
                     e24ui: { bool: false, eggNum: 24 },
                     e25ui: { bool: false, eggNum: 25 },
                     e26ui: { bool: false, eggNum: 26 },
                     e27ui: { bool: false, eggNum: 27 },
                     e28ui: { bool: false, eggNum: 28 },
                     e29ui: { bool: false, eggNum: 29 },
                     e30ui: { bool: false, eggNum: 30 },
                     e31ui: { bool: false, eggNum: 31 },
                     e32ui: { bool: false, eggNum: 32 },
                     e33ui: { bool: false, eggNum: 33 },
                     e34ui: { bool: false, eggNum: 34 },
                     e35ui: { bool: false, eggNum: 35 },
                     e36ui: { bool: false, eggNum: 36 },
                     e37ui: { bool: false, eggNum: 37 },
                     e38ui: { bool: false, eggNum: 38 },
                     e39ui: { bool: false, eggNum: 39 },
                     e40ui: { bool: false, eggNum: 40 },
                     e41ui: { bool: false, eggNum: 41 },
                     e42ui: { bool: false, eggNum: 42 },
                     e43ui: { bool: false, eggNum: 43 },
                     e44ui: { bool: false, eggNum: 44 },
                     e45ui: { bool: false, eggNum: 45 },
                     e46ui: { bool: false, eggNum: 46 },
                     e47ui: { bool: false, eggNum: 47 },
                     e48ui: { bool: false, eggNum: 48 },
                     e49ui: { bool: false, eggNum: 49 },
                     e50ui: { bool: false, eggNum: 50 },
                     e101ui: { bool: false, eggNum: 101 },
                     e102ui: { bool: false, eggNum: 102 }
                 }
             });
         }
     });
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
         btnScan.classList.remove('hide');
     } else {
         console.log('not Logged in');
         LoginMessage.classList.remove('hide');
         btnLogout.classList.add('hide');
         btnLogin.classList.remove('hide');
         btnSignUp.classList.remove('hide');
         btnScan.classList.add('hide');
     }
 });

 const scannedEggs = document.getElementById('scannedEggs');


 firebase.auth().onAuthStateChanged(firebaseUser => {
     if (firebaseUser) {

         function errorCallback(error) {
             alert('ERROR(' + error.code + '): ' + error.message);
         };

         btnScan.addEventListener('click', e => {
                 var output = document.getElementById("");

                 if (!navigator.geolocation) {
                     output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
                     return;
                 }

                 function success(position) {
                     var latitude = position.coords.latitude;
                     var longitude = position.coords.longitude;
                     var found = longitude + "," + latitude;
                     const map = document.getElementById('map');
                     const dbUserRef = firebase.database().ref();
                     // map.src = 'https://www.arcgis.com/home/webmap/viewer.html?webmap=ee17122bc13e41e2977d75ef541647dc&extent=-122.3642,47.7973,' + found + '&level=18&marker=' + found;

                     eggs.orderByChild('egg').on('child_added', function(snap) {
                         if (snap.val().longitude >= (longitude - 0.0001) && snap.val().longitude <= (longitude + 0.0001) && snap.val().latitude >= (latitude - 0.0001) && snap.val().latitude <= (latitude + 0.0001)) {
                             //console.log('Egg' + snap.val().egg + 'Bool')
                             //console.log(latitude, longitude)
                             const dbUserRef = firebase.database().ref();
                             //Date.now() gives you the number of milliseconds since january 1 1970 since the newest scanned egg will always be the largest meaning that it will always show up in most recent eggs in profile
                             dbUserRef.child('users').child(firebaseUser.uid).child('eui').child('e' + snap.val().egg + 'ui').set({ bool: "true", eggNum: snap.val().egg, timeStamp: Date.now() });

                             const scanned = document.getElementById('scanned');
                             const updateCard = document.getElementById('updateCard');

                             scanned.innerText = 'Egg ' + snap.val().egg + ' has been scanned!';
                             const br = document.createElement('br');
                             scanned.appendChild(br);

                             const img = document.createElement('img');
                             img.classList.add('eggImage');
                             img.setAttribute("style", "margin-top:10px;");
                             img.title = 'egg' + snap.val().egg;

                             ////until more images are added this is here so that if any eggs that are listed as greater or less than 101 to 103 have an image
                             ////when new images are added all you will need to do is save an image with the number of the egg and a string value that is static and it will pick it up.
                             //img.src = 'images/TestEgg' + snap.val().eggNum + '.png';
                             if (snap.val().eggNum <= 100 || snap.val().egg >= 104) {
                                 img.src = 'images/TestEgg102.png';
                             } else {
                                 img.src = 'images/TestEgg' + snap.val().egg + '.png';
                             }
                             ////similarly to the image if the name of a website contains the egg value then it should be able to be pulled up this way.
                             //img.href = 'https://haakonj.github.io/Prototype-Firebase-App/egg' + snap.val().eggNum + '.html'

                             scanned.appendChild(img);

                             updateCard.classList.remove('hide');
                         }
                     });

                     //var radlat1 = Math.PI * latitude / 180;
                     //var radlat2 = Math.PI * (latitude + .0002) / 180;
                     //var theta = longitude - (longitude + .0002);
                     //var radtheta = Math.PI * theta / 180;
                     //var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
                     //dist = Math.acos(dist);
                     //dist = dist * 180 / Math.PI;
                     //dist = dist * 60 * 1.1515;
                     //distFinal = dist * 5280;

                     //console.log("   Distance between two Geolocations:  " + distFinal);
                 }

                 function error() {
                     //document.getElementById('map').src = 'http://lynnwoodwa.maps.arcgis.com/apps/StoryMapBasic/index.html?appid=9da6d2bdffa144d99748e259e417176c&extent=-122.3463,47.8138,-122.3463,47.8138';
                 }

                 navigator.geolocation.getCurrentPosition(success, error);
             },

             function prompt(window, pref, message, callback) {
                 let branch = Components.classes["@mozilla.org/preferences-service;1"]
                     .getService(Components.interfaces.nsIPrefBranch);

                 if (branch.getPrefType(pref) === branch.PREF_STRING) {
                     switch (branch.getCharPref(pref)) {
                         case "always":
                             return callback(true);
                         case "never":
                             return callback(false);
                     }
                 }

                 let done = false;

                 function remember(value, result) {
                     return function() {
                         done = true;
                         branch.setCharPref(pref, value);
                         callback(result);
                     }
                 }

                 let self = window.PopupNotifications.show(
                     window.gBrowser.selectedBrowser,
                     "geolocation",
                     message,
                     "geo-notification-icon", {
                         label: "Share Location",
                         accessKey: "S",
                         callback: function(notification) {
                             done = true;
                             callback(true);
                         }
                     }, [{
                             label: "Always Share",
                             accessKey: "A",
                             callback: remember("always", true)
                         },
                         {
                             label: "Never Share",
                             accessKey: "N",
                             callback: remember("never", false)
                         }
                     ], {
                         eventCallback: function(event) {
                             if (event === "dismissed") {
                                 if (!done) callback(false);
                                 done = true;
                                 window.PopupNotifications.remove(self);
                             }
                         },
                         persistWhileVisible: true
                     });
             });
     }
 });

 const btnHide = document.getElementById('btnHide');
 btnHide.addEventListener('click', e => {
     updateCard.classList.add('hide');
 });
=======
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

//Get elements
const txtName = document.getElementById('txtName');
const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');
const txtLogin = document.getElementById('btnLogin');
const txtSignUp = document.getElementById('btnSignUp');
const txtLogout = document.getElementById('btnLogout');

const LoginMessage = document.getElementById('LoginMessage');
const map = document.getElementById('map');
const btnScan = document.getElementById('btnScan');

const nRef = firebase.database().ref();
const eggs = nRef.child('eggs');

//Add a realtime Listner
firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        console.log(firebaseUser);
        LoginMessage.classList.add('hide');
        btnLogout.classList.remove('hide');
        btnLogin.classList.add('hide');
        btnSignUp.classList.add('hide');
        btnScan.classList.remove('hide');
    } else {
        console.log('not Logged in');
        LoginMessage.classList.remove('hide');
        btnLogout.classList.add('hide');
        btnLogin.classList.remove('hide');
        btnSignUp.classList.remove('hide');
        btnScan.classList.add('hide');
    }
});


firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {

        function errorCallback(error) {
            alert('ERROR(' + error.code + '): ' + error.message);
        };

        btnScan.addEventListener('click', e => {
                var output = document.getElementById("");

                if (!navigator.geolocation) {
                    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
                    return;
                }

                function success(position) {
                    var latitude = position.coords.latitude;
                    var longitude = position.coords.longitude;
                    var found = longitude + "," + latitude;
                    const map = document.getElementById('map');
                    const dbUserRef = firebase.database().ref();
                    map.src = 'http://lynnwoodwa.maps.arcgis.com/apps/StoryMapBasic/index.html?appid=9da6d2bdffa144d99748e259e417176c&extent=-122.3463,47.8138,' + found + '&level=18&marker=' + found;

                    eggs.orderByChild('latitude').startAt(latitude - 0.0001).endAt(latitude + 0.0001).on('child_added', function(snap) {
                        if (snap.val().longitude >= (longitude - 0.0001) && snap.val().longitude <= (longitude + 0.0001)) {
                            console.log('Egg' + snap.val().egg + 'Bool')
                            console.log(latitude, longitude)
                            const dbUserRef = firebase.database().ref();
                            dbUserRef.child('users').child(firebaseUser.uid).child('eui').child('e' + snap.val().egg + 'ui').set({ bool: "true", eggNum: snap.val().egg, timeStamp: new Date().toString() });
                        }
                    });
                }

                function error() {
                    document.getElementById('map').src = 'http://lynnwoodwa.maps.arcgis.com/apps/StoryMapBasic/index.html?appid=9da6d2bdffa144d99748e259e417176c&extent=-122.3463,47.8138,-122.3463,47.8138';
                }

                navigator.geolocation.getCurrentPosition(success, error);
            },

            function prompt(window, pref, message, callback) {
                let branch = Components.classes["@mozilla.org/preferences-service;1"]
                    .getService(Components.interfaces.nsIPrefBranch);

                if (branch.getPrefType(pref) === branch.PREF_STRING) {
                    switch (branch.getCharPref(pref)) {
                        case "always":
                            return callback(true);
                        case "never":
                            return callback(false);
                    }
                }

                let done = false;

                function remember(value, result) {
                    return function() {
                        done = true;
                        branch.setCharPref(pref, value);
                        callback(result);
                    }
                }

                let self = window.PopupNotifications.show(
                    window.gBrowser.selectedBrowser,
                    "geolocation",
                    message,
                    "geo-notification-icon", {
                        label: "Share Location",
                        accessKey: "S",
                        callback: function(notification) {
                            done = true;
                            callback(true);
                        }
                    }, [{
                            label: "Always Share",
                            accessKey: "A",
                            callback: remember("always", true)
                        },
                        {
                            label: "Never Share",
                            accessKey: "N",
                            callback: remember("never", false)
                        }
                    ], {
                        eventCallback: function(event) {
                            if (event === "dismissed") {
                                if (!done) callback(false);
                                done = true;
                                window.PopupNotifications.remove(self);
                            }
                        },
                        persistWhileVisible: true
                    });
            });
    }
});
>>>>>>> JonsBranch
