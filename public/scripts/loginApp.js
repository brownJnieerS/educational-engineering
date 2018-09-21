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

      const emailText = document.getElementById('user')
      const passwordText = document.getElementById('password')
      const btnLogin = document.getElementById('loginButton')

      btnLogin.addEventListener('click', e=> {
          const email = emailText.value
          const password = passwordText.value
          const auth = firebase.auth()
          // Sign in
          const promise = auth.signInWithEmailAndPassword(email, password)
          

      })
}());
