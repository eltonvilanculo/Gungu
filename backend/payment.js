// Get a reference to the database service
var database = firebase.database();
function verifyUser() {

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {

          const id = user.uid ;

          getUserData(id)


            // ...
        } else {

            // hide(use_display)

            // User is signed out.
            // ...
        }
    });


}

verifyUser()


function getUserData(id) {

   const starCountRef =  database.ref('users/'+id);
    starCountRef.on('value', function(snapshot) {
        const user = snapshot.val() ;
     // console.log(snapshot.val().displayName)

        document.getElementById('name_pay').value = user.displayName ;
        document.getElementById('phone_pay').value = user.phone ;
        document.getElementById('email_pay').value = user.email ;
    });

}

function payListenner() {

    console.log('requesting')
    const phone = document.getElementById('phone_pay').value ;
    console.log(phone)
    fetch(`http://3.90.6.87:8002/v1/pay?number=${phone}&amount=250`)
        .then(response => response.json())
        .then(json=>console.log(json));

}