<template>
    <div class="dashboard">
        <h1>This is an dashboard page</h1>
        <h1 v-if="$can($constants.permissions.viewDeveloperDashboard)">You can see this if you are a developer</h1>
    </div>
</template>

<script>
    export default {}
</script>
