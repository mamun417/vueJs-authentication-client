<template>
    <div role="tabpanel" class="tab-pane fade in" id="profile_image">

        <loader v-if="loader"/>

        <div class="form-horizontal">
            <div class="form-group">
                <div class="col-sm-10">
                    <div class="form-line">
                        <input @change="onLoadProfileImage" type="file" ref="profileImage" class="form-control">
                    </div>
                    <label v-if="formErrors.image" class="error">
                        {{ formErrors.image }}
                    </label>
                </div>
            </div>

            <div class="form-group">
                <div class="col-sm-offset-2 col-sm-10">
                    <button @click="updateProfile" class="btn btn-success">SUBMIT</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Change-Image',
        data() {
            return {
                loader: false,
                formErrors: {},
                image: ''
            }
        },

        methods: {
            onLoadProfileImage(e) {
                this.formErrors = {}
                this.image = e.target.files[0]
            },

            updateProfile() {
                this.loader = true

                let fd = new FormData()
                fd.append('image', this.image)

                this.$store.dispatch('profile/changeImage', {
                    inputs: fd
                })
                    .then(res => {
                        this.loader = false
                        this.$refs.profileImage.value = null
                        this.image = ''
                        this.$successToast('Image has been changed Successful!')
                    })
                    .catch(err => {
                        this.loader = false

                        if (err.response.data.errors) {
                            this.formErrors = err.response.data.errors
                        } else {
                            this.$errorToast(err.response.data.message)
                        }
                    })
            }
        }
    }
</script>
