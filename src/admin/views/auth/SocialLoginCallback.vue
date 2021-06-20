<template>
    <div class="text-center" style="margin-top: 20px">
        <div class="preloader">
            <div class="spinner-layer pl-red">
                <div class="circle-clipper left">
                    <div class="circle"></div>
                </div>
                <div class="circle-clipper right">
                    <div class="circle"></div>
                </div>
            </div>
        </div>
        <div>Please wait while we log you in...</div>
    </div>
</template>

<script>
export default {
    name: "SocialLoginCallback",
    data() {
        return {
            token: this.$route.query.token ?? "",
            provider: this.$route.query.provider ?? ""
        };
    },

    mounted() {
        axios
            .post("auth/login/social", { token: this.token, provider: this.provider })
            .then((res) => {
                this.$store.commit("auth/authSuccess", res.data);

                toast.fire({
                    icon: "success",
                    title: "Login Successful!"
                });

                this.$router.push({ name: "admin.home" });
            })
            .catch((err) => {
                console.log(err.response);
            });
    },
    methods: {}
};
</script>

<style scoped></style>
