export default {
    addNotification(state, payload) {
        state.notifications.push(payload);
    },
    removeNotification(state, payload) {
        state.notifications.splice(payload, 1);
    }
};
