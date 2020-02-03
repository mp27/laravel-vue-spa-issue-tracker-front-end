<template>
    <div>
        <h1>Login with Github, please wait!</h1>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';

    export default {
        name: "LoginGithub",
        methods: {
            ...mapActions({
                login: 'user/loginGithubCallback',
            }),
            loginUser() {
                this.login({
                    code: this.$route.query.code
                }).then((resp) => {
                    if (resp.data.access_token) {
                        this.$router.push({
                            name: 'dashboard'
                        })
                    } else {
                        this.$router.push({
                            name: 'home'
                        })
                    }
                })
            },
        },
        created() {
            this.loginUser()
        }
    }
</script>

<style scoped>

</style>
