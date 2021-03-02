<template>
    <div class="modal fade" id="defaultModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="defaultModalLabel">
                        {{ updateModal ? 'Update ' + formData.name : 'Create' }} user
                    </h4>
                </div>
                <div class="modal-body">
                    <div>
                        <div class="form-group">
                            <div class="form-line">
                                <input type="text" class="form-control"
                                       v-model="formData.name" autofocus
                                       @input="formErrors.name = ''"
                                       placeholder="Name">
                            </div>
                            <label v-if="formErrors.name" class="error">{{ formErrors.name }}</label>
                        </div>

                        <div class="form-group">
                            <div class="form-line">
                                <input type="email" class="form-control"
                                       v-model="formData.email" autofocus
                                       @input="formErrors.email = ''"
                                       placeholder="Email">
                            </div>
                            <label v-if="formErrors.email" class="error">{{ formErrors.email }}</label>
                        </div>

                        <div class="form-group">
                            <div class="form-line">
                                <input type="text" class="form-control"
                                       v-model="formData.phone" autofocus
                                       @input="formErrors.phone = ''"
                                       placeholder="Phone Number">
                            </div>
                            <label v-if="formErrors.phone" class="error">{{ formErrors.phone }}</label>
                        </div>

                        <div class="form-group">
                            <div class="form-line">
                                <input type="password" class="form-control"
                                       v-model="formData.password" autofocus
                                       @input="formErrors.password = ''"
                                       placeholder="Password">
                            </div>
                            <label v-if="formErrors.password" class="error">{{ formErrors.password }}</label>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger waves-effect" data-dismiss="modal">CLOSE</button>
                    <button @click="updateModal ? updateUser() : addUser()" type="button"
                            class="btn btn-success waves-effect">
                        {{ updateModal ? 'Update' : 'Submit' }}
                    </button>
                </div>

                <loader v-if="loader"/>

            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'User-Add-Edit-Modal',
    props: {
        editData: {
            type: Object,
            default: () => ({})
        },
        updateModal: {
            type: Boolean,
            default: false
        },
        countResetModal: {
            type: Number,
            default: 1
        }
    },

    data() {
        return {
            formData: {},
            formErrors: {},
            loader: false
        }
    },

    methods: {
        resetModal() {
            this.formData = {}
            this.formErrors = {}
        },

        addUser() {
            this.loader = true

            this.$store.dispatch('user/addUser', {
                inputs: this.formData
            })
                .then(res => {
                    this.loader = false
                    this.$successToast('User has been created Successful!')
                    $('#defaultModal').modal('hide')
                    this.$emit('addUser')
                })
                .catch(err => {
                    this.handleError(err)
                })
        },

        updateUser() {
            this.loader = true

            this.$store.dispatch('user/updateUser', {
                inputs: this.formData
            })
                .then(res => {
                    this.loader = false
                    this.$successToast('User has been updated Successful!')
                    $('#defaultModal').modal('hide')
                    this.$emit('updateUser')
                })
                .catch(err => {
                    this.handleError(err)
                })
        },

        handleError(err) {
            this.loader = false

            if (err.response.data.errors) {
                this.formErrors = err.response.data.errors
            } else {
                this.$errorToast(err.response.data.message)
            }
        }
    },

    watch: {
        countResetModal: {
            handler() {
                this.resetModal()

                if (this.updateModal) {
                    let tempData = this.$_.cloneDeep(this.editData)

                    Object.keys(tempData).forEach(key => {
                        if (tempData[key]) {
                            this.formData[key] = tempData[key]
                        }
                    })
                }
            },
            deep: true,
            immediate: true
        }
    }
}
</script>
