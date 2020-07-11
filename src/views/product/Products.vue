<template>
    <section class="content">
        <div class="container-fluid">
            <div class="row clearfix">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="card">
                        <div class="header">
                            <h2>Products</h2>
                        </div>
                        <div class="body table-responsive">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>NAME</th>
                                        <th>DESCRIPTION</th>
                                        <th>PRICE</th>
                                        <th>IMAGE</th>
                                        <th>CREATE AT</th>
                                        <th>ACTION</th>
                                    </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(product, key) in products">
                                    <td>{{ product.name }}</td>
                                    <td>{{ product.description }}</td>
                                    <td>{{ product.price }} TK</td>
                                    <td>
                                        <img :src="product.image_url" height="60px" width="60px" alt="image not found">
                                    </td>
                                    <td>{{ $dateFormat(product.created_at) }}</td>
                                    <td></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'Product',
        data(){
            return {
                products: {},
            }
        },
        
        mounted() {
            this.getProducts();
        },
        
        methods: {
            getProducts(){
                //console.log(moment(parseInt("2020-06-15T17:38:11.000000Z")).format('DD MM YYYY'))
                this.$store.dispatch('product/getProducts')
                    .then(res => {
                        this.products = res.data.products;
                    })
                    .catch(err => {
                        //handle error
                    })
            }
        }
    }
</script>
