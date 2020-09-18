<template>
    <section class="content">
        <div class="container-fluid">
            <div data-toggle="modal" data-target="#defaultModal" class="cart_button_section"
                 :class="{ 'animated bounce': addAnimationClass }">
                <span class="counter"></span>
                <button type="button" class="btn btn-primary waves-effect">
                    <i class="material-icons">shopping_cart</i>
                    <span>CART</span> <span class="badge">{{ cartProducts.length }}</span><br>
                    <b>TK {{ cartTotalPrice }}</b>
                </button>
            </div>

            <!--Cart modal-->
            <div class="modal fade" id="defaultModal" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 class="modal-title m-r-5" style="display: inline-block" id="defaultModalLabel">Cart
                                Products</h4>
                            <button @click="emptyCart" type="button" class="btn btn-xs btn-danger waves-effect">
                                EMPTY CART
                            </button>
                        </div>

                        <div>
                            <div class="modal-body" style="padding-bottom: 0">
                                <div class="body table-responsive">
                                    <table class="table">
                                        <tbody>
                                        <tr v-for="(cartProduct, index) in cartProducts">
                                            <td>
                                                <div class="input-group spinner" style="margin-bottom: 0">
                                                    <div class="input-group-addon">
                                                        <a @click="updateQuantity(cartProduct.id, 'up')"
                                                           href="javascript:void(0)" class="spin-up" style="width: auto"
                                                           data-spin="up"><i class="glyphicon glyphicon-chevron-up"></i>
                                                        </a>
                                                        <div class="m-t-10 m-b-10" style="color: #999">
                                                            {{ cartProduct.quantity }}
                                                        </div>
                                                        <a @click="updateQuantity(cartProduct.id, 'down')"
                                                           href="javascript:void(0)" class="spin-down"
                                                           style="width: auto"
                                                           data-spin="down"><i
                                                            class="glyphicon glyphicon-chevron-down"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                            </td>

                                            <td><img :src="cartProduct.image" style="height: 50px"></td>

                                            <td>
                                                {{ cartProduct.name }}<br>
                                                TK {{ cartProduct.price }}
                                            </td>
                                            <td>TK {{ cartProduct.price * cartProduct.quantity }}</td>
                                            <td>
                                                <button @click="removeCart(index)" type="button" class="close hover_red"
                                                        aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div v-if="!cartProducts.length" class="alert alert-info">
                                    <strong>Heads up!</strong> Your cart is empty.
                                </div>
                            </div>

                            <div class="modal-footer" style="padding-top: 0">
                                <div v-if="cartProducts.length"  class="row clearfix">
                                    <div class="col-sm-3">
                                        <div class="form-group" style="margin-bottom: 0">
                                            <div class="form-line">
                                                <input type="text" placeholder="Promotion code"
                                                       class="form-control">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-3">
                                        <button type="button" class="btn btn-primary waves-effect">
                                            APPLY PROMO
                                        </button>
                                    </div>

                                    <div class="col-sm-6">
                                        <button type="button"
                                                class="btn btn-primary waves-effect">
                                            PLACE ORDER | TK {{ cartTotalPrice }}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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
                                <div v-for="product in products" class="col-sm-6 col-md-3">
                                    <div class="thumbnail">
                                        <img :src="product.image" style="padding: 10px">
                                        <div class="caption">
                                            <h3>{{ product.name }}</h3>
                                            <p>{{ product.details }}</p>
                                            <div style="padding: 5px" class="text-center">
                                                <a @click="addToCart(product.id)" href="javascript:void(0);"
                                                   class="btn btn-primary waves-effect"
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
import {mapGetters} from 'vuex'

export default {
    data() {
        return {
            addAnimationClass: false
        }
    },

    computed: {
        ...mapGetters({
            products: 'cart/products',
            cartProducts: 'cart/cartProducts',
            cartTotalPrice: 'cart/cartTotal',
        })
    },

    methods: {
        addToCart(id) {
            this.$store.dispatch('cart/addToCart', id)
        },

        removeCart(index) {
            this.$store.dispatch('cart/removeCart', index)
        },

        updateQuantity(id, type) {
            this.$store.dispatch('cart/updateQuantity', {id, type})
        }
    },

    watch: {
        cartProducts() {
            this.addAnimationClass = true
            let self = this

            setTimeout(function () {
                self.addAnimationClass = false
            }, .6 * 1000)

            $('.counter').rollNumber({
                number: this.cartTotalPrice,
                fontStyle: {
                    'color': 'red',
                    'font-weight': 'bold'
                }
            })
        }
    }
}
</script>
