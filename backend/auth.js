const use_display = document.getElementById('logged_users') ;
hide(use_display)
verifyUser() ;
function userRegisterListenner() {

    const email = document.getElementById('reg_email').value ;
    const phone = document.getElementById('reg_phone').value ;
    const password = document.getElementById('reg_password').value ;
    const password2 = document.getElementById('reg_password2').value ;

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


        const user = verifyUser() ;

        console.log(user)

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
            use_display.innerText = email ;
            show(use_display)
            return user ;
            // ...
        } else {

            return null ;
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

