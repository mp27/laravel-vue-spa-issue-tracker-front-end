<template>
    <v-app>
        <v-app-bar app>
            <v-toolbar-title class="headline text-uppercase">
                <span>Issue</span>
                <span class="font-weight-light">Tracker</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn @click="logout" small v-if="loggedIn">
                Logout
            </v-btn>
        </v-app-bar>

        <v-content>
            <router-view></router-view>
        </v-content>
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
    import {mapGetters, mapActions} from 'vuex';

    export default {
        name: 'App',
        data: () => ({}),
        created() {
            this.checkUserState();
        },
        computed: {
            ...mapGetters({
                loggedIn: 'user/loggedIn',
                allNotifications: 'application/notifications'
            })
        },
        methods: {
            ...mapActions({
                logoutUser: 'user/logoutUser',
                checkUserState: 'user/setLoggedInState',
                removeNotification: 'application/removeNotification',
                addNotification: 'application/addNotification'
            }),
            logout() {
                this.logoutUser()
                    .then(() => {
                        return this.addNotification({
                            show: true,
                            text: 'Logged out!'
                        })
                    })
                    .then(() => {
                        this.$router.push({name: 'login'});
                    })
            },
            updateNotification(show, index) {
                if (!show) {
                    this.removeNotification(index)
                }
            }
        }
    };
</script>
