<template>
    <div class="dashboard">
        <h1>This is an dashboard page</h1>
    </div>
</template>

<script>
    export default {
        mounted() {
            this.$store.dispatch('user/me')
        }
    }
</script>
