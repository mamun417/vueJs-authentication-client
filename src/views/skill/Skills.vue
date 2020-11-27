<template>
    <section class="content">
        <vue-headful
            title="SKILLS | VUE-AUTH"
        />

        <div class="container-fluid">
            <!-- Body Copy -->
            <div class="row clearfix">

                <loader v-if="loader"/>

                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="card">
                        <div class="header">
                            <h2>
                                SKill List
                            </h2>
                        </div>
                        <div class="body">
                            <div class="row">
                                <div class="col-sm-6">
                                    <div class="form-horizontal">
                                        <div v-for="(skill, index) in newSkills" class="input-group">

                                            <div class="form-line">
                                                <input v-model="skill.name" type="text" class="form-control"
                                                       placeholder="Skill Name"
                                                       @input="formErrors['name.'+index] = ''">
                                            </div>

                                            <label v-if="formErrors['name.'+index]" class="error">
                                                {{ formErrors['name.' + index] }}
                                            </label>

                                            <span @click="addMoreSkill" v-if="index === 0" class="input-group-addon">
                                                <button class="btn btn-sm btn-info">More</button>
                                            </span>

                                            <span @click="removeSkill('name', index)" v-else class="input-group-addon">
                                                <button class="btn btn-sm btn-danger">Remove</button>
                                            </span>
                                        </div>

                                        <div class="input-group m-t-25">
                                            <button @click="createSkills" class="btn btn-success">SUBMIT</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <table class="table table-bordered">
                                        <thead>
                                        <tr>
                                            <th>NAME</th>
                                            <th class="text-center">CREATED AT</th>
                                            <th class="text-center">ACTION</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="(skill, key) in skills">
                                            <td>{{ skill.name }}</td>
                                            <td class="text-center">{{ $dateFormat(skill.created_at) }}</td>
                                            <td class="text-center">
                                                <button @click="deleteSkill(skill.id)" type="button"
                                                        class="btn btn-xs btn-danger waves-effect">
                                                    <i class="material-icons">delete</i><span>DELETE</span>
                                                </button>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div v-for="chunkSkills in $_.chunk(skills, 4)" class="row">
                                <div v-for="skill in chunkSkills" class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                    <div class="info-box bg-cyan hover-expand-effect">
                                        <div class="icon">
                                            <i class="material-icons">playlist_add_check</i>
                                        </div>
                                        <div class="content">
                                            <div class="text">{{ skill.name }}</div>
                                            Date : {{ $dateFormat(skill.created_at) }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>

export default {
    name: 'Skills',

    data() {
        return {
            loader: false,
            skills: {},
            formData: {},
            formErrors: {},
            newSkills: [
                {
                    name: ''
                }
            ]
        }
    },

    computed: {
        skillName: function () {
            return this.newSkills.map(skill => {
                return skill.name
            })
        }
    },

    mounted() {
        this.getSkills()
    },

    methods: {
        getSkills() {
            this.loader = true

            this.$store.dispatch('skill/getSkills')
                .then(res => {
                    this.loader = false
                    this.skills = res.data.skills
                })
                .catch(err => {
                    this.loader = false
                })
        },

        addMoreSkill() {
            this.newSkills.push({name: ''});
        },

        removeSkill(field, index) {
            this.newSkills.splice(index, 1);
            delete this.formErrors[field + '.' + index]
        },

        createSkills() {
            this.loader = true

            this.formData.name = this.skillName
            this.submittedData = this.formData

            this.$store.dispatch('skill/createSkill', {
                inputs: this.formData
            })
                .then(res => {
                    this.loader = false
                    this.resetForm()
                    this.getSkills()
                    this.$successToast('Skill has been created Successful!')
                })
                .catch(err => {
                    this.loader = false

                    if (err.response.data.errors) {
                        this.formErrors = err.response.data.errors
                    } else {
                        this.$errorToast(err.response.data.message)
                    }
                })
        },

        deleteSkill(id) {
            this.loader = true

            this.$store.dispatch('skill/deleteSkill', {
                id: id
            })
                .then(res => {
                    this.loader = false
                    this.getSkills()
                    this.$successToast('Skill has been deleted Successful!')
                })
                .catch(err => {
                    //
                })
        },

        resetForm() {
            this.newSkills = [{name: ''}]
            this.formErrors = {}
        }
    }
}
</script>
