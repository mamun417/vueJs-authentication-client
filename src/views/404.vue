<template>
    <div class="four-zero-four">
        <div class="four-zero-four-container">
            <div class="error-code col-red">404</div>
            <div class="error-message">This page doesn't exist</div>
            <div class="button-place">
                <router-link :to="{name: 'home'}" class="btn btn-success btn-lg waves-effect">
                    GO TO HOMEPAGE
                </router-link>
            </div>
        </div>
    </div>
</template>
