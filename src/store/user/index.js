import mutations from "./mutations";
import state from "./state";
import actions from "./actions";
import getters from "./getters";

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
