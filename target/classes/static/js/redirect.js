async function signIn(){
    const config = {
        auth: {
            clientId: '4decc0c0-8022-4698-bc7e-6d2a498d6f5b',
            authority: 'https://login.microsoftonline.com/368e69d2-6e39-4f7d-a4c2-c1af88eeab75/',
            redirectUri: 'http://localhost:8080/html/admin.html'
        }
    };
    var client = new Msal.UserKAgentApplication(config);
    var request = {
        scopes: ['user.read']
    };
    let loginResponse = await client.loginPopup(request);
    location.href += "html/admin.html"
    localStorage.infoUsuario = JSON.stringify(loginResponse.account.username);
    console.dir(loginResponse);
}