<template>
    <paginate
        v-if="paginationMeta.last_page > 1"
        v-model="paginationMeta.current_page"
        :click-handler="handlePagination"
        :page-count="paginationMeta.last_page"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'pagination'"
        style="margin: 0"
    />
</template>

<script>
import Paginate from 'vuejs-paginate'

export default {
    name: 'Pagination',
    components: {
        Paginate
    },
    props: {
        paginationMeta: {
            type: Object,
            default: () => ({})
        }
    },

    methods: {
        handlePagination(page) {
            this.$emit('handlePagination', page)
        }
    }
}
</script>
