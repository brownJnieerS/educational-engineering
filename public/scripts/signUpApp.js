(function() {
      // Initialize Firebase
      var config = {
        apiKey: "AIzaSyAn_1ljl18uTo-2fuOLeT5aMXNmAwGU47U",
        authDomain: "software-engineering-project-1.firebaseapp.com",
        databaseURL: "https://software-engineering-project-1.firebaseio.com",
        projectId: "software-engineering-project-1",
        storageBucket: "software-engineering-project-1.appspot.com",
        messagingSenderId: "495472687615"
      }
      firebase.initializeApp(config);

      // Get the elements

      const emailText = document.getElementById('email')
      const passwordText = document.getElementById('password')
      const btnSignUp = document.getElementById('signUp')

      btnSignUp.addEventListener('click', e=> {
          const email = emailText.value
          const password = passwordText.value
          const auth = firebase.auth()
          // Sign up
          const promise = auth.createUserWithEmailAndPassword(email, password)
          promise.catch(e => console.log(e.message))

      })
}());
