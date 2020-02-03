<template>
    <div>
        <v-container
                class="fill-height"
                fluid
        >
            <v-row
                    align="center"
                    justify="center"
            >
                <v-col
                        cols="12"
                        md="4"
                        sm="8"
                >
                    <v-card class="elevation-12">
                        <v-toolbar
                                color="primary"
                                dark
                                flat
                        >
                            <v-toolbar-title>Login form</v-toolbar-title>
                            <v-spacer/>
                        </v-toolbar>
                        <v-card-text>
                            <v-form ref="loginForm">
                                <v-text-field
                                        :rules="emailRules"
                                        label="Email"
                                        name="email"
                                        type="email"
                                        v-model="user.email"
                                />

                                <v-text-field
                                        :rules="passwordRules"
                                        id="password"
                                        label="Password"
                                        name="password"
                                        type="password"
                                        v-model="user.password"
                                />
                            </v-form>
                            <v-btn @click="loginGithub" color="info">Login with github</v-btn>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer/>
                            <v-btn @click="loginUser" color="primary">Login</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <router-link :to="{name: 'register'}">Register</router-link>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';
    import PasswordValidationMixin from '../../mixins/passwordValidationMixin';

    export default {
        name: "Login",
        mixins: [PasswordValidationMixin],
        data() {
            return {
                user: {
                    email: '',
                    password: ''
                }
            }
        },
        methods: {
            ...mapActions({
                login: 'user/loginUser',
                loginGithubAction: 'user/loginGithub',
                addNotification: 'application/addNotification'
            }),
            loginUser() {
                if (this.$refs.loginForm.validate()) {
                    this.login(this.user)
                        .then(() => {
                            this.addNotification({
                                show: true,
                                text: 'Welcome'
                            }).then(() => {
                                this.$router.push({name: 'dashboard'});
                            })
                        })
                        .catch(() => {
                            this.addNotification({
                                show: true,
                                text: 'Failed to login!!!'
                            })
                        })

                }
            },
            loginGithub() {
                this.loginGithubAction().then((resp) => {
                    if (resp.data.url) {
                        window.location.href = resp.data.url
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
