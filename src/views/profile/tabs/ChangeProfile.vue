<template>
    <div role="tabpanel" class="tab-pane fade in active" id="profile_settings">

        <loader v-if="loader"/>

        <div class="form-horizontal">
            <div class="form-group">
                <label for="NameSurname" class="col-sm-2 control-label">Name</label>
                <div class="col-sm-10">
                    <div class="form-line">
                        <input type="text" class="form-control" id="NameSurname"
                               name="NameSurname" placeholder="Name Surname"
                               v-model="formData.name"
                               @input="formErrors.name = ''"
                        >
                    </div>
                    <label v-if="formErrors.name" class="error">
                        {{ formErrors.name }}
                    </label>
                </div>
            </div>

            <div class="form-group">
                <label for="Email" class="col-sm-2 control-label">Email</label>
                <div class="col-sm-10">
                    <div class="form-line">
                        <input type="text" class="form-control" id="Email"
                               placeholder="Email"
                               v-model="formData.email"
                               @input="formErrors.email = ''"
                        >
                    </div>
                    <label v-if="formErrors.email" class="error">
                        {{ formErrors.email }}
                    </label>
                </div>
            </div>

            <div class="form-group">
                <label for="Phone" class="col-sm-2 control-label">Phone</label>
                <div class="col-sm-10">
                    <div class="form-line">
                        <input type="text" class="form-control" id="Phone"
                               placeholder="Phone Number"
                               v-model="formData.phone"
                               @input="formErrors.phone = ''"
                               autocomplete="off"
                        >
                    </div>
                    <label v-if="formErrors.phone" class="error">
                        {{ formErrors.phone }}
                    </label>
                </div>
            </div>

            <div class="form-group">
                <div class="col-sm-offset-2 col-sm-10">
                    <button @click="changeProfile" class="btn btn-success">SUBMIT</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Change-Profile',
    props: {
        userInfo: {
            type: Object,
            default: () => ({})
        }
    },

    data() {
        return {
            loader: false,
            formData: {
                name: '',
                email: '',
                phone: '',
            },
            formErrors: {}
        }
    },

    methods: {
        changeProfile() {
            this.loader = true

            this.$store.dispatch('profile/changeProfile', {
                inputs: this.formData
            })
                .then(res => {
                    this.loader = false
                    this.$successToast('Profile has been changed Successful!')
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
    },

    watch: {
        userInfo: {
            handler() {
                Object.keys(this.formData).forEach(field => {
                    this.formData[field] = this.userInfo[field]
                })
            },
            deep: true,
            immediate: true
        }
    }
}
</script>
