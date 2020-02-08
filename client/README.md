# FANCY TODO DOCUMENTATION

### CLIENT SIDE

* THIRD PARTY API

    * Google Sign In

        Automatically signed in to FANCY TODO APP using your google email
        #### Google Sign In Documentation

        1. Configure a project
        2. Load the Google Platform Library

            Put element below inside < body > element and above any script.js file source
        ```
            <script src="https://apis.google.com/js/platform.js" async defer></script>
        ```
        3. Specify your app's client ID

            Put element below inside < head > element
        ```
            <meta name="google-signin-client_id" content="YOUR_CLIENT_ID.apps.googleusercontent.com">
        ```
        4. Add a Google Sign-In button
        ```
            <div class="g-signin2" data-onsuccess="onSignIn"></div>
        ```
        5. Sign out a user
        ```javascript
            $("button.logout").on("click", () => {
                var auth2 = gapi.auth2.getAuthInstance()
                auth2.signOut().then(() => {
                    localStorage.clear()
                })
            })
        ```
        6. Send the ID token to your server
        ```javascript
        function onSignIn(googleUser) {
            let id_token = googleUser.getAuthResponse().id_token;
            axios({
                method: "POST",
                url: "http://localhost:3000/user/gSignIn",
                headers: {id_token}
            })
                .then((response) => {
                    localStorage.setItem('token', response.data.token)
                    localStorage.setItem('id', response.data.id)
                    localStorage.setItem('name', response.data.name)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        ```
        7. Verify the integrity of the ID token

            Install google-auth-library
            ```
            npm install google-auth-library
            ```
            then verify in the controller
            ```javascript
            const {OAuth2Client} = require('google-auth-library');
            const client = new OAuth2Client(CLIENT_ID)
                let payload = '' 
                client.verifyIdToken({
                    idToken: req.headers.id_token,
                    audience: process.env.CLIENT_ID
                })
                    .then((result) => {
                        payload = result.payload
                        return User.findOne({
                            where: {
                                email: payload.email
                            }
                        })
                    })
                    .then((data) => {
                        if (!data) {
                            return User.create({
                                email: payload.email,
                                password: process.env.GOOGLE_PASS
                            })
                        }
                        else return data
                    })
                    .then((data) => {
                        let payload = {
                            id: data.id,
                            email: data.email
                        }
                        let token = jwt.sign(payload, privateKey)
                        let username = data.email.split('@')
                        let name = username[0]
                        res.status(200).json({
                            token,
                            id: data.id,
                            name
                        })
                    })
                    .catch((err) => { next(err) })
            ```

    * Guardian News Third Party

        #### Guardian News Documentation

        1. Get the API Token
        ```
        https://open-platform.theguardian.com/access/
        ```
        2. Get the News
        ```javascript
        function findNews() {
            $("div.query-news").empty()
            let API_guardian = "yuagdaw7dtwga7dgwdgq7g87s8awsbwa8b"
            let query = $("input.query-news").val()
            axios({
                method: "GET",
                url: `https://content.guardianapis.com/search?q=${query}&api-key=${API_guardian}`
            })
                .then((data) => {
                    let news = data.data.response.results
                    console.log(news)
                    news.forEach((i) => {
                        $("div.query-news").append(`
                            <div class="news-bar">
                                <a href="${i.webUrl}">${i.webTitle}</a>
                            </div>
                        `)
                    })
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        ```
