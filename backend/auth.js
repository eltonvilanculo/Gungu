// const use_display = document.getElementById('logged_users') ;

var database = firebase.database();
// hide(use_display)
verifyUser() ;
// const phone = document.getElementById('reg_phone').value ;
function userRegisterListenner() {

    const email = document.getElementById('your-email').value ;

    const password = document.getElementById('password').value ;


    //const password2 = document.getElementById('reg_password2').value ;

    firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {


        attemptLogin(email,password)



    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log({
            "code" : errorCode ,
            "message" : errorMessage
        })
        // ...
    });


}

 function attemptLogin(email , password) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
        Alert('logado com suesso !')

    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });


}

function verifyUser() {

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            //use_display.innerText = email ;
            // show(use_display)
            //           console.log(user.uid)
            user.updateProfile({
                displayName: name,
                phoneNumber: document.getElementById('your-phone')
            }).then(function() {

                writeUserData(user.uid , email , document.getElementById('your-phone').value , document.getElementById('full-name').value)

                console.log(user)

                // Update successful.
            }).catch(function(error) {

                console.log(error)
                // An error happened.
            });

            // ...
        } else {

            // hide(use_display)

            // User is signed out.
            // ...
        }
    });


}

function hide(element) {

    if(element.style.visibility='visible'){
        element.style.visibility = 'hidden'
    }


}

function show(element) {

    if(element.style.visibility='hidden'){
        element.style.visibility = 'visible'
    }


}
async function writeUserData(userId, email , phone,name) {

    firebase.database().ref('users/' + userId).set({
        id:await userId,
        email: email,
        phone : phone ,
        displayName: name

    });


}
