<template>
    <div>
        <h1>Verifying email</h1>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';

    export default {
        name: "VerifyEmail",
        methods: {
            ...mapActions({
                verifyEmail: 'user/verifyEmail',
                addNotification: 'application/addNotification'
            }),
        },
        created() {
            this.verifyEmail(this.$route.query).then((response) => {
                this.addNotification({
                    show: true,
                    text: response.data.message
                }).then(() => {
                    this.$router.push({name: 'login'})
                })
            });
        }
    }
</script>

<style scoped>

</style>
