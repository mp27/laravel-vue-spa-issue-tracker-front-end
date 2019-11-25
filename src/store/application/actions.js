export default {
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
