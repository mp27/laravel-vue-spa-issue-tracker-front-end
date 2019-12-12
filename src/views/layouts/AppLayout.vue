<template>
    <v-content>
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
    </v-content>

</template>

<script>
    import {mapActions, mapGetters} from 'vuex';

    export default {
        name: 'AppLayout',
        computed: {
            ...mapGetters({
                loggedIn: 'user/loggedIn'
            })
        },
        methods: {
            ...mapActions({
                logoutUser: 'user/logoutUser',
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
            }
        }
    };
</script>
