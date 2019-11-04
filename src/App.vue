<template>
    <v-app>
        <v-app-bar app>
            <v-toolbar-title class="headline text-uppercase">
                <span>Issue</span>
                <span class="font-weight-light">Tracker</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn small @click="logout" v-if="loggedIn">
                Logout
            </v-btn>
        </v-app-bar>

        <v-content>
            <router-view></router-view>
        </v-content>
    </v-app>
</template>

<script>
    export default {
        name: 'App',
        data: () => ({
            loggedIn: false
        }),
        created() {
            if (localStorage.getItem('token')) {
                this.loggedIn = true
            }
        },
        methods: {
            logout() {
                localStorage.removeItem('token');
                this.$router.push({name: 'login'});
            }
        }
    };
</script>
