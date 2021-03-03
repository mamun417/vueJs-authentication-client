<template>
    <section class="content">
        <vue-headful
            title="USERS | VUE-AUTH"
        />

        <div class="container-fluid">
            <div class="row clearfix">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="card">
                        <div class="header">
                            <button v-if="role_id === 1" @click="handleCreateButtonClick" type="button"
                                    data-toggle="modal" data-target="#defaultModal"
                                    class="btn btn-sm btn-success waves-effect pull-right"
                                    style="top: -8px">
                                <i class="material-icons">add</i><span>CREATE</span>
                            </button>
                            <h2>Users</h2>
                        </div>

                        <task-list
                            ref="taskList"
                            @editButtonClick="handleEditButtonClick"
                        />

                        <task-add-edit-modal
                            :count-reset-modal="countResetModal"
                            :edit-data="selectedForEdit"
                            :update-modal="updateModal"
                            @addTask="loadTasks"
                            @updateTask="loadTasks"
                        />

                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import TaskList from "@/views/task/TaskList";
import TaskAddEditModal from "@/components/modals/TaskAddEditModal";

export default {
    name: 'Task',
    components: {
        TaskList,
        TaskAddEditModal,
    },

    data() {
        return {
            countResetModal: 1,
            updateModal: false,
            selectedForEdit: {},
            role_id: ''
        }
    },

    mounted() {
        let userInfo = localStorage.getItem('user');
        this.role_id = JSON.parse(userInfo).role_id
    },

    methods: {
        handleResetModal() {
            this.countResetModal++
        },

        handleCreateButtonClick() {
            this.updateModal = false
            this.handleResetModal()
        },

        loadTasks() {
            this.$refs.taskList.getTasks();
        },

        handleEditButtonClick(data) {
            this.updateModal = true
            this.handleResetModal()
            this.selectedForEdit = data
        }
    }
}
</script>
