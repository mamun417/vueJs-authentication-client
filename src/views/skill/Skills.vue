<template>
    <section class="content">

        <loader v-if="loader"/>

        <div class="container-fluid">
            <!-- Body Copy -->
            <div class="row clearfix">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="card">
                        <div class="header">
                            <h2>
                                SKill List
                            </h2>
                        </div>
                        <div class="body">
                            <div class="row">
                                <div class="col-sm-4">
                                    <div class="form-horizontal">
                                        <div v-for="(skill, index) in newSkills" class="input-group">
                                            <div class="form-line">
                                                <input v-model="skill.name" type="text" class="form-control"
                                                       placeholder="Skill Name">
                                            </div>
                                            <span @click="addMoreSkill" v-if="index === 0" class="input-group-addon">
                                                <button class="btn btn-sm btn-info">More</button>
                                            </span>
                                            <span @click="removeSkill(index)" v-else class="input-group-addon">
                                                <button class="btn btn-sm btn-danger">Remove</button>
                                            </span>
                                        </div>

                                        <div class="input-group m-t-25">
                                            <button @click="clickSkillSubmit" class="btn btn-success">SUBMIT</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-8">
                                    <table class="table table-bordered">
                                        <thead>
                                        <tr>
                                            <th>NAME</th>
                                            <th class="text-center">CREATED AT</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="(skill, key) in skills">
                                            <td>{{ skill.name }}</td>
                                            <td class="text-center">{{ $dateFormat(skill.created_at) }}</td>
                                        </tr>
                                        </tbody>
                                    </table>
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

        removeSkill(index) {
            this.newSkills.splice(index, 1);
        },

        clickSkillSubmit() {
            this.formData.name = this.skillName
            this.submittedData = this.formData


        }
    }
}
</script>
