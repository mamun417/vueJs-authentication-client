<template>
    <div>
        <loader v-if="loader"/>

        <div v-if="tasks.length" class="body table-responsive">
            <table class="table table-bordered">
                <thead>
                <tr>
                    <th style="width: 2%">ID</th>
                    <th style="width: 15%">ASSIGN USER</th>
                    <th style="width: 20%">TITLE</th>
                    <th style="width: 20%">DESCRIPTION</th>
                    <th style="width: 5%" class="text-center">STATUS</th>
                    <th style="width: 10%">DUE DATE</th>
                    <!--<th style="width: 10%">CREATED AT</th>-->
                    <th style="width: 10%">ACTION</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(task, key) in tasks">
                    <td>{{ task.id }}</td>
                    <td>
                        <b>Name</b>: {{ task.user.name }} <br>
                        <b>Email</b>: {{ task.user.email }}
                    </td>
                    <td>{{ task.title }}</td>
                    <td>{{ task.description }}</td>

                    <td class="text-center">
                        <span class="badge bg-black" v-if="task.status === 'pending'">{{ $_.upperFirst(task.status)
                            }}</span>
                        <span class="badge bg-green" v-else>{{ $_.upperFirst(task.status) }}</span>
                    </td>

                    <td>{{ $dateFormat(task.due_date) }}</td>
                    <!--<td class="text-center">{{ $dateFormat(task.created_at) }}</td>-->

                    <td class="text-center">
                        <button @click="handleEditButtonClick(task)"
                                data-toggle="modal" data-target="#defaultModal"
                                type="button" class="btn btn-xs btn-primary waves-effect m-r-5">
                            <i class="material-icons">edit</i>
                        </button>
                        <button v-if="role_id === 1" @click="deleteTask(task.id)" type="button"
                                class="btn btn-xs btn-danger waves-effect">
                            <i class="material-icons">delete</i>
                        </button>
                    </td>

                </tr>
                </tbody>
            </table>

            <div style="display: flex;align-items: center">
                <div class="m-r-30">
                    <!--Showing {{ paginationMeta.from }} to {{ paginationMeta.to }} of {{ paginationMeta.total }} entries-->
                </div>

                <pagination
                    :pagination-meta="paginationMeta"
                    @handlePagination="handlePagination"
                />
            </div>
        </div>

        <div v-else class="text-center p-b-25 m-t-20">No tasks found</div>
    </div>
</template>

<script>
export default {
    name: 'TaskList',
    props: {
        //
    },

    data() {
        return {
            loader: false,
            tasks: {},
            paginationMeta: {
                last_page: 1,
                current_page: 1
            },
            role_id: '',
        }
    },

    mounted() {
        this.getTasks();

        let userInfo = localStorage.getItem('user');
        this.role_id = JSON.parse(userInfo).role_id
    },

    methods: {
        getTasks() {
            this.loader = true

            this.$store.dispatch('task/getTasks', {
                paginationMeta: this.paginationMeta
            })
                .then(res => {
                    this.loader = false
                    this.tasks = res.data.tasks.data
                    delete res.data.tasks.data
                    this.paginationMeta = res.data.tasks
                })
                .catch(err => {
                    console.error(err)
                    this.loader = false
                })
        },

        deleteTask(id) {
            this.$showConfirmMessage().then(result => {
                if (result.value) {
                    this.$store.dispatch('task/deleteTask', {
                        id: id
                    })
                        .then(res => {
                            this.getTasks()
                            this.$successToast('Task has been deleted Successful!');
                        })
                        .catch(err => {
                            console.error(err)
                        })
                }
            })
        },

        handleEditButtonClick(data) {
            this.$emit('editButtonClick', data)
        },

        handlePagination(page) {
            this.paginationMeta.current_page = page
            this.getTasks()
        }
    }
}
</script>
