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
                            <v-toolbar-title>Register form</v-toolbar-title>
                            <v-spacer/>
                        </v-toolbar>
                        <v-card-text>
                            <v-form :value="formValid" ref="registerForm">
                                <v-text-field
                                        label="Email"
                                        name="email"
                                        type="email"
                                        v-model="newUser.email"
                                />

                                <v-text-field
                                        label="Name"
                                        name="name"
                                        type="text"
                                        v-model="newUser.name"
                                />

                                <v-text-field
                                        id="password"
                                        label="Password"
                                        name="password"
                                        type="password"
                                        v-model="newUser.password"
                                />
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer/>
                            <v-btn @click="registerUser" color="primary">Register</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <v-snackbar
                v-model="snackbar.show"
        >
            {{ snackbar.text }}
            <v-btn
                    @click="snackbar.show = false"
                    color="pink"
                    text
            >
                Close
            </v-btn>
        </v-snackbar>
        <router-link :to="{name: 'login'}">Login</router-link>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "Register",
        data() {
            return {
                formValid: false,
                newUser: {
                    email: '',
                    name: '',
                    password: ''
                },
                snackbar: {
                    show: false,
                    text: 'Success'
                }
            }
        },
        methods: {
            registerUser() {
                if (this.$refs.registerForm.validate()) {
                    axios
                        .post('http://localhost:8000/api/register', this.newUser)
                        .then((response) => {
                            if (response.data && response.data.success) {
                                this.snackbar = {
                                    show: true,
                                    text: 'Success!'
                                };

                                this.$router.push({
                                    name: 'login'
                                })
                            }

                        })
                        .catch(() => {
                            this.snackbar = {
                                show: true,
                                text: 'Failed!!!'
                            }
                        });
                }
            }
        }
    }
</script>

<style scoped>

</style>
