<template>
    <div class="flex-center">
        <input 
            class="searchbar" 
            type="text" 
            v-model="searchTerm" 
            placeholder="search the product..."
        />
        <v-btn @click="findProduct">Search</v-btn>
    </div>
    <div v-if="!errors">
        <div v-for="(product, index) in productToShow" 
        :key="index"
        @click="goToProduct(product.id)">
            <product 
                
                :product="product"
            />
        </div>
    </div>
    <div v-else>
        <p class="error">
            There is some mistake on the server
        </p>
    </div>
</template>
  
<script>
import product from '@/components/product.vue';

import { useProductStore } from '@/stores/productStore';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
    name: 'Search',
    components: {
        product
    },
    setup(){
        const
            productStore = useProductStore(),
            productToShow = ref([]),
            searchTerm = ref(''),
            errors = ref(false);

        const router = useRouter();
        onMounted(async ()=>{
            await productStore.getProducts('');
            if (!productStore.state.error){
                productToShow.value = productStore.state.products;
            } else {
                errors.value = true;
            }
        })
        function findProduct(){
            productToShow.value = []
            for (let product of productStore.state.products){
                console.log(product.title)
                console.log(searchTerm)
                if (product.title.toLowerCase().trim().includes(searchTerm.value.toLowerCase().trim())){
                    productToShow.value.push(product);
                }
            }
        };
        function goToProduct(id){
            router.push({
                name: 'product-page',
                params: {
                    id: id
                }
            })
        };
        return {
            findProduct,
            goToProduct,

            productStore,
            productToShow,
            searchTerm,
            errors
        }
    }
}

// export default {
//     name: 'Search',
//     data(){
//         return{
//             products: [],
//             productToShow: [],
//             searchTerm: '',
//         }
//     },
//     methods: {
//         getProducts(){
//             axiosInstance.get(`products/category/jewelery`)
//                 .then(response => {
//                     this.products = response.data;
//                     this.productToShow = response.data;
//                 })
//                 .catch(error => {
//                     console.log(error)
//                 })        
//         },
//         findProduct(){
//             this.productToShow = []
//             for (let product of this.products){
//                 console.log(product.title)
//                 console.log(this.searchTerm)
//                 if (product.title.toLowerCase().trim().includes(this.searchTerm.toLowerCase().trim())){
//                     this.productToShow.push(product);
//                 }
//             }
//         },
//         goToProduct(id){
//             this.$router.push({
//                 name: 'product-page',
//                 params: {
//                     id: id
//                 }
//             })
//         },
//     },
//     mounted(){
//         this.getProducts();
//     },
//     components: {
//         product,
//     },
// };
</script>
<style scoped>
.searchbar{
    min-width: 350px;
    border-radius: 15px;
    background-color: rgb(255, 255, 255);
    border: 1px solid black;
    padding: 5px;
    padding-left: 20px;
    margin-right: 10px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: large;
}
.flex-center {
    display: flex;
    justify-content: center;
    place-items: center;
}
.grid3 {
    display: grid;
    grid-template-columns: repeat(2, auto);
}
.error {
    display: flex;
    justify-content: center;
    place-items: center;
    font-size: 30px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    color: rgb(66, 66, 66);
    font-weight: 700;
}
</style>
