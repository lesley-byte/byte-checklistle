// use this to decode a token and get the user's information out of it
import decode from "jwt-decode";

// create a new class to instantiate for a user
class AuthService {
  // get user data from JSON web token by decoding it

  getProfile() {
    const decodedToken = decode(this.getToken());
    console.log("Decoded token:", decodedToken);
    return {
      id: decodedToken.data._id,
      email: decodedToken.data.email,
      username: decodedToken.data.username,
    };
  }

  getUser() {
    const decodedToken = decode(this.getToken());
    console.log("Decoded token:", decodedToken);
    return decodedToken;
  }

  // return `true` or `false` if token exists (does not verify if it's expired yet)
  loggedIn() {
    const token = this.getToken();
    return token ? true : false;
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem("id_token");
  }

  login(idToken) {
    // Saves user token to localStorage and reloads the application for logged in status to take effect
    localStorage.setItem("id_token", idToken);
    window.location.assign("/");
  }

  logout() {
    // Clear user token and user data from localStorage
    localStorage.removeItem("id_token");
    // navigate to the home page
    window.location.assign("/");
  }
}

const authServiceInstance = new AuthService();
export default authServiceInstance;
