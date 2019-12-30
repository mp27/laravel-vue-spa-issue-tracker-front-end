<template>
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
                        <v-toolbar-title>Details</v-toolbar-title>
                        <v-spacer/>
                    </v-toolbar>
                    <v-card-text>
                        <p><strong>Name:</strong> {{userDetails.name}}</p>
                        <p><strong>Email:</strong> {{userDetails.email}}</p>
                        <p><strong>Joined:</strong> {{userDetails.created_at}}</p>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
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
                        <v-toolbar-title>Change details</v-toolbar-title>
                        <v-spacer/>
                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="changeDetailsForm">
                            <v-text-field
                                    :rules="requiredRules"
                                    label="Name"
                                    name="name"
                                    type="text"
                                    v-model="userDetails.name"
                            />

                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer/>
                        <v-btn @click="changeDetails" color="primary">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
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
                        <v-toolbar-title>Change password</v-toolbar-title>
                        <v-spacer/>
                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="changePasswordForm">
                            <v-text-field
                                    :rules="[...requiredRules, ...passwordRules]"
                                    label="Old Password"
                                    name="oldPassword"
                                    type="password"
                                    v-model="user.oldPassword"
                            />
                            <v-text-field
                                    :rules="[...requiredRules, ...passwordRules, newPasswordValidator]"
                                    label="New Password"
                                    name="newPassword"
                                    ref="newPasswordInput"
                                    type="password"
                                    v-model="user.newPassword"
                            />
                            <v-text-field
                                    :rules="[...requiredRules, ...passwordRules, newPasswordValidator]"
                                    label="New Password Confirmation"
                                    name="newPasswordConfirmation"
                                    ref="newPasswordConfirmationInput"
                                    type="password"
                                    v-model="user.newPasswordConfirmation"
                            />

                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer/>
                        <v-btn @click="changePassword" color="primary">Change password</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    export default {
        data() {
            return {
                user: {
                    oldPassword: '',
                    newPassword: '',
                    newPasswordConfirmation: '',
                },
                requiredRules: [
                    v => !!v || 'This field is required'
                ],
                passwordRules: [
                    v => (!!v && v.length > 6) || 'Password is too short!'
                ]
            }
        },
        computed: {
            ...mapGetters({
                userDetails: "user/userDetails"
            })
        },
        methods: {
            ...mapActions({
                updateDetails: "user/updateDetails",
                changeUserPassword: "user/changePassword",
                addNotification: "application/addNotification"
            }),
            changeDetails() {
                if (!this.$refs.changeDetailsForm.validate()) {
                    return false;
                }

                this.updateDetails(this.userDetails)
                    .then(() => {
                        this.addNotification({
                            show: true,
                            text: 'Details changed'
                        })
                    })
                    .catch(() => {
                        this.addNotification({
                            show: true,
                            text: 'Failed to change details!!!'
                        })
                    })
            },
            changePassword() {
                if (!this.$refs.changePasswordForm.validate()) {
                    return false;
                }

                this.changeUserPassword(this.user)
                    .then(() => {
                        this.addNotification({
                            show: true,
                            text: 'Password changed'
                        })
                    })
                    .catch(() => {
                        this.addNotification({
                            show: true,
                            text: 'Failed to change password!!!'
                        })
                    })
            },
            newPasswordValidator() {
                return (this.user.newPasswordConfirmation === this.user.newPassword) || 'New password is not confirmed';
            }
        }
    }
</script>
