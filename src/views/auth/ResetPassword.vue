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
                            <v-form ref="resetPasswordForm">
                                <v-text-field
                                        :rules="[...requiredRules, ...emailRules]"
                                        label="Email"
                                        name="email"
                                        type="email"
                                        v-model="user.email"
                                />

                                <v-text-field
                                        id="password"
                                        label="Password"
                                        name="password"
                                        :rules="[...requiredRules, ...passwordRules, passwordValidator]"
                                        type="password"
                                        v-model="user.password"
                                />
                                <v-text-field
                                        id="password_confirmation"
                                        label="Password Confirmation"
                                        :rules="[...requiredRules, ...passwordRules, passwordValidator]"
                                        name="password_confirmation"
                                        type="password"
                                        v-model="user.password_confirmation"
                                />
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer/>
                            <v-btn @click="sendResetPassword" color="primary">Reset password</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>

        <router-link :to="{name: 'login'}">Login</router-link>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';

    export default {
        name: "ResetPassword",
        data() {
            return {
                user: {
                    email: '',
                    password: '',
                    password_confirmation: ''
                },
                requiredRules: [
                    v => !!v || 'This field is required'
                ],
                passwordRules: [
                    v => (!!v && v.length > 6) || 'Password is too short!'
                ],
                emailRules: [
                    v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                ]
            }
        },
        methods: {
            ...mapActions({
                resetPassword: 'user/resetPassword',
                addNotification: 'application/addNotification'
            }),
            sendResetPassword() {
                if (this.$refs.resetPasswordForm.validate()) {
                    const token = this.$route.query.token;
                    this.resetPassword({...this.user, token})
                        .then(() => {
                            this.addNotification({
                                text: 'Password changed!',
                                show: true
                            }).then(() => {
                                this.$router.push({name: 'login'});
                            });

                        }).catch(() => {
                        this.addNotification({
                            text: 'Failed to change password!',
                            show: true
                        });
                    });

                }
            },
            passwordValidator() {
                return (this.user.password_confirmation === this.user.password) || 'Password is not confirmed';
            }
        }
    }
</script>

<style scoped>

</style>
