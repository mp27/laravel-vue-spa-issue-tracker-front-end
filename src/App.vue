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
                loggedIn: 'user/loggedIn'
            })
        },
        methods: {
            ...mapActions({
                logoutUser: 'user/logoutUser',
                checkUserState: 'user/setLoggedInState'
            }),
            logout() {
                this.logoutUser()
                    .then(() => {
                        this.$router.push({name: 'login'});
                    })
            }
        }
    };
</script>
