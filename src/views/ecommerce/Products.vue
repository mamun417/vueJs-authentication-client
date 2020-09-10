<template>
    <section class="content">
        <div class="container-fluid">

            <div data-toggle="modal" data-target="#defaultModal" class="cart_button_section">
                <button type="button" class="btn btn-primary waves-effect">
                    <i class="material-icons">shopping_cart</i>
                    <span>CART</span> <span class="badge">{{ cartProducts.length }}</span><br>
                    <b>TK 500</b>
                </button>
            </div>

            <div class="modal fade" id="defaultModal" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title" id="defaultModalLabel">Cart Products</h4>
                        </div>
                        <div class="modal-body" style="padding-bottom: 0px">
                            <div class="body table-responsive">
                                <table class="table">
                                    <tbody>
                                    <tr v-for="n in cartProducts">
                                        <td>
                                            <img :src="n.image" style="height: 50px">
                                        <td>{{n.name}}</td>
                                        <td>
                                            <button class="btn btn-danger btn-sm" type="button">Remove</button>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="modal-footer" style="padding-top: 0px">
                            <button type="button" class="btn btn-link waves-effect" data-dismiss="modal">CLOSE</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Body Copy -->
            <div class="row clearfix">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="card">
                        <div class="header">
                            <h2>
                                PRODUCT LIST
                            </h2>
                        </div>
                        <div class="body">
                            <div class="row">
                                <div class="row">
                                    <div class="col-sm-6">
                                        <pre>{{products}}</pre>
                                    </div>
                                    <div class="col-sm-6">
                                        <pre>{{cartProducts}}</pre>
                                    </div>
                                </div>
                                <div v-for="(product, n) in products" class="col-sm-6 col-md-3">
                                    <div class="thumbnail">
                                        <img :src="product.image" style="padding: 10px">
                                        <div class="caption">
                                            <h3>{{ product.name }}</h3>
                                            <p>{{ product.details }}</p>
                                            <div style="padding: 5px" class="text-center">
                                                <a @click="addToCart(product.id)" href="javascript:void(0);" class="btn btn-primary waves-effect"
                                                   role="ADD TO CART">ADD TO CART</a>
                                            </div>
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
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            cart: {}
        }
    },

    computed: {
        ...mapGetters({
            products: 'cart/products',
            cartProducts: 'cart/cartProducts',
        })
    },

    methods: {
        addToCart(id) {
            this.$store.dispatch('cart/addToCart', id)
        }
    }
}
</script>
