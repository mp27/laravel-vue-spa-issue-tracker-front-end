const state = {
  notifications: []
};

const getters = {
    notifications(state) {
        return state.notifications;
    }
};

const mutations = {
    addNotification(state, payload){
        state.notifications.push(payload);
    },
    removeNotification(state, payload){
        state.notifications.splice(payload, 1);
    }
};

const actions = {
    addNotification(ctx, payload) {
        return new Promise((resolve) => {
            ctx.commit('addNotification', payload);
            resolve(true)
        })
    },
    removeNotification(ctx, payload) {
        return new Promise((resolve) => {
            ctx.commit('removeNotification', payload);
            resolve(true)
        })
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
