
var config = {
    userStore: new Oidc.WebStorageStateStore({ store: window.localStorage }),
    authority: "https://localhost:5001/",
    client_id: "WebClient_ID",
    redirect_uri: "https://localhost:5025/Home/SignIn",
    response_type: "code",
    scope: "openid profile main_api"
};

var userManager = new Oidc.UserManager(config);

var signIn = function () {
    userManager.signinRedirect();
};

userManager.getUser().then(user => {
    console.log("user:", user);
    if (user) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + user.access_token;
    }
});

var callApi = function () {
    axios.get("https://localhost:7201/")
        .then(res => {
            console.log(res);

        });
};

var refreshing = false;

axios.interceptors.response.use(
    function (response) { return response; },
    function (error) {
        console.log("axios error:", error.response);

        var axiosConfig = error.response.config;

        //if error response is 401 try to refresh token
        if (error.response.status === 401) {
            console.log("axios error 401");
            var userManger = new Oidc.UserManager({
                userStore: new Oidc.WebStorageStateStore({ store: window.localStorage }),
                response_mode: 'query'
            });

            userManger.signinCallback().then(res => {
                console.log(res);

                window.location.href = 'https://localhost:7201/';
            });
            var  signIn = function () {
                userManager.signinRedirect();
            };

            signIn();

            // if already refreshing don't make another request
            if (!refreshing) {
                console.log("starting token refresh");
                refreshing = true;

                // do the refresh
                return userManager.signinSilent().then(user => {
                    console.log("new user:", user);
                    //update the http request and client
                    axios.defaults.headers.common["Authorization"] = "Bearer " + user.access_token;
                    axiosConfig.headers["Authorization"] = "Bearer " + user.access_token;
                    //retry the http request
                    return axios(axiosConfig);
                });
            }
        }

        return Promise.reject(error);
    });