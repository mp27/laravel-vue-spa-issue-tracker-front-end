<template>
    <v-app>
        <router-view></router-view>
        <v-snackbar
                :key="index"
                @input="updateNotification($event, index)"
                v-for="(snackbar, index) in allNotifications"
                v-model="snackbar.show"
        >
            {{ snackbar.text }}
            <v-btn
                    @click="removeNotification(index)"
                    color="pink"
                    text
            >
                Close
            </v-btn>
        </v-snackbar>
    </v-app>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';

    export default {
        name: 'App',
        created() {
            console.log(this.$constants, "TEST");
            this.checkUserState().then(() => {
                if (this.isLoggedIn) {
                    this.me().then(() => {
                        console.log(this.$can('view-developer-dashboard'))
                    });
                }
            });
        },
        computed: {
            ...mapGetters({
                isLoggedIn: 'user/loggedIn',
                allNotifications: 'application/notifications'
            })
        },
        methods: {
            ...mapActions({
                checkUserState: 'user/setLoggedInState',
                removeNotification: 'application/removeNotification',
                addNotification: 'application/addNotification',
                me: 'user/me'
            }),
            updateNotification(show, index) {
                if (!show) {
                    this.removeNotification(index)
                }
            }
        }
    };
</script>
