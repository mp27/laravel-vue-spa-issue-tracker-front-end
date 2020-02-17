import axios from "../../axios";

export default {
    registerUser(ctx, payload) {
        return new Promise((resolve, reject) => {
            axios
                .post('register', payload)
                .then((response) => {
                    if (response.data) {
                        resolve(response);
                    } else {
                        reject(response);
                    }
                })
                .catch((error) => {
                    reject(error);
                })
        })
    },
    loginUser(ctx, payload) {
        return new Promise((resolve, reject) => {
            axios
                .post('login', payload)
                .then((response) => {
                    if (response.data.access_token) {
                        localStorage.setItem('token', response.data.access_token);
                        ctx.commit('setLoggedIn', true);
                        ctx.dispatch('me').then(() => resolve(response));
                    } else {
                        reject(response);
                    }
                })
                .catch((error) => {
                    reject(error);
                })
        })
    },
    loginGithub() {
        return new Promise((resolve, reject) => {
            axios
                .get('authorize/github/redirect')
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                })
        })
    },
    loginGithubCallback(ctx, payload) {
        return new Promise((resolve, reject) => {
            axios
                .get('authorize/github/callback', {
                    params: payload
                })
                .then((response) => {
                    if (response.data.access_token) {
                        localStorage.setItem('token', response.data.access_token);
                        ctx.commit('setLoggedIn', true);
                        ctx.dispatch('me').then(() => resolve(response));
                    } else {
                        reject(response);
                    }
                })
                .catch((error) => {
                    reject(error);
                })
        })
    },
    logoutUser(ctx) {
        return new Promise((resolve) => {
            localStorage.removeItem('token');
            ctx.commit('setLoggedIn', false);
            resolve(true);
        })
    },
    setLoggedInState(ctx) {
        return new Promise((resolve) => {
            if (localStorage.getItem('token')) {
                ctx.commit('setLoggedIn', true);
                resolve(true)
            } else {
                ctx.commit('setLoggedIn', false);
                resolve(false)
            }
        });
    },
    forgotPassword(ctx, payload) {
        return new Promise((resolve, reject) => {
            axios
                .post('forgot-password', payload)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                })
        })
    },
    resetPassword(ctx, payload) {
        return new Promise((resolve, reject) => {
            axios
                .post('reset-password', payload)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                })
        })
    },
    me(ctx) {
        return new Promise((resolve, reject) => {
            axios
                .get('me')
                .then((response) => {
                    ctx.commit('setUserDetails', response.data.data);
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                })
        })
    },
    changePassword(ctx, payload) {
        return new Promise((resolve, reject) => {
            axios
                .post('change-password', payload)
                .then((response) => {
                    if (response.data.success) {
                        resolve(response);
                    } else {
                        reject(response);
                    }
                })
                .catch((error) => {
                    reject(error);
                })
        })
    },
    updateDetails(ctx, payload) {
        return new Promise((resolve, reject) => {
            axios
                .post('change-details', payload)
                .then((response) => {
                    if (response.data.success) {
                        resolve(response);
                    } else {
                        reject(response);
                    }
                })
                .catch((error) => {
                    reject(error);
                })
        })
    },
};
