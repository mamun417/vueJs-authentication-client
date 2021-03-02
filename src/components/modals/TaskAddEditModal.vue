<template>
    <div class="modal fade" id="defaultModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="defaultModalLabel">
                        {{ updateModal ? 'Update ' + formData.name : 'Create' }} task
                    </h4>
                </div>
                <div class="modal-body">
                    <div>
                        <div class="form-group">
                            <div class="form-line">
                                <select class="form-control"
                                        v-model="formData.user_id"
                                        @change="formErrors.user_id = ''">
                                    <option :selected=true>Select User</option>
                                    <option v-for="user in users" :value="user.id">{{ user.name}}</option>
                                </select>
                            </div>
                            <label v-if="formErrors.user_id" class="error">{{ formErrors.user_id }}</label>
                        </div>

                        <div class="form-group">
                            <div class="form-line">
                                <input type="text" class="form-control"
                                       v-model="formData.title" autofocus
                                       @input="formErrors.title = ''"
                                       placeholder="Title">
                            </div>
                            <label v-if="formErrors.title" class="error">{{ formErrors.title }}</label>
                        </div>

                        <div class="form-group">
                            <div class="form-line">
                                <textarea class="form-control" id="InputExperience"
                                          v-model="formData.description"
                                          @input="formErrors.description = ''"
                                          rows="3" placeholder="Description"
                                >
                                </textarea>
                            </div>
                            <label v-if="formErrors.description" class="error">{{ formErrors.description }}</label>
                        </div>

                        <div class="form-group">
                            <div class="form-line">
                                <input type="date"
                                       class="form-control" id="DueDate"
                                       v-model="formData.due_date"
                                       @input="formErrors.due_date = ''"
                                       placeholder="Due Date"
                                >
                            </div>
                            <label v-if="formErrors.due_date" class="error">{{ formErrors.due_date }}</label>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger waves-effect" data-dismiss="modal">CLOSE</button>
                    <button @click="updateModal ? updateUser() : addTask()" type="button"
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
            users: {},
            formData: {},
            formErrors: {},
            loader: false
        }
    },

    mounted() {
        this.getUsers();
    },

    methods: {
        resetModal() {
            this.formData = {}
            this.formErrors = {}
        },

        addTask() {
            this.loader = true

            this.$store.dispatch('task/addTask', {
                inputs: this.formData
            })
                .then(res => {
                    this.loader = false
                    this.$successToast('Task has been created Successful!')
                    $('#defaultModal').modal('hide')
                    this.$emit('addTask')
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
        },

        getUsers() {
            this.loader = true

            this.$store.dispatch('task/getUsers')
                .then(res => {
                    this.loader = false
                    console.log(res.data)
                    this.users = res.data.users
                })
                .catch(err => {
                    console.error(err)
                    this.loader = false
                })
        },
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
