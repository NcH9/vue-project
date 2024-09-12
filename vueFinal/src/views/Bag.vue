<template>
    <main>
        <h1>Bag</h1>
        <div v-if="products.length==0">Bag is empty for now :(</div>
        <product v-for="product in products"
            @click="goToProduct(product.id)"
            :product="product"
            @delete-product="toggleInBag(product.id)"
        />
    </main>
</template>
<script type="module">
import product from '@/components/product.vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
export default {
    name: 'bag',
    components: {
        product,
    },
    setup(){
        const 
            products = ref([]),
            productInBag = ref('');

        const router = useRoute();
        function goToProduct(id){
            router.push({
                name: 'product-page',
                params: {
                    id: id
                }
            })
        };

        function toggleInBag(id){
            products.value = products.value.filter(product => product.id != id)
        };

        function getProductsInBag(){
            products.value = JSON.parse(localStorage.getItem('bag'));
            if (products.value){
                products.value.forEach(product => {
                    product.inBag = true;
                })
            } 
        };

        onMounted(() => {
            getProductsInBag();
        });

        return {
            // data
            products, productInBag, 

            // methods
            goToProduct, toggleInBag, getProductsInBag,
        }
    }
}
// export default {
    // data(){
    //     return {
    //         products: [],
    //         productInBag: '',
    //     }
    // },
    // methods: {
    //     getProducts(){
    //         this.products = JSON.parse(localStorage.getItem('bag'));
    //         if (this.products){
    //             this.products.forEach(product => {
    //                 product.inBag = true;
    //             })
    //         } 
    //     },
    //     goToProduct(id){
    //         this.$router.push({
    //             name: 'product-page',
    //             params: {
    //                 id: id
    //             }
    //         })
    //     },
    //     toggleInBag(id){
    //         this.products = this.products.filter(product => product.id != id)
    //     }
    // },
    // mounted(){
    //     this.getProducts()
    // },
// }
</script>
<style>
.bubble{
    background-color: white;
    border-radius: 15px;
    margin: 15px;
    padding: 15px;
    border: solid 1px rgb(69, 69, 69)
}
</style>