import axios from 'axios';

const state = {
  isLoggedIn: false,
  userDetails: {}
};

const getters = {
    loggedIn(state) {
        return state.isLoggedIn;
    }
};

const mutations = {
    setLoggedIn(state, payload) {
        state.isLoggedIn = payload;
    }
};

const actions = {
    loginUser(ctx, payload) {
        return new Promise((resolve, reject) => {
            axios
                .post('http://localhost:8000/api/login', payload)
                .then((response) => {
                    if (response.data.access_token) {
                        localStorage.setItem('token', response.data);
                        ctx.commit('setLoggedIn', true);
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
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
