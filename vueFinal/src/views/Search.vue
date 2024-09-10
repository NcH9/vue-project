<template>
    <div class="flex-around">
        <input class="searchbar" type="text" v-model="searchTerm" />
        <v-btn @click="findProduct">Search</v-btn>
    </div>
    <div>
        <div v-for="(product, index) in productToShow" :key="index">
            <product 
                @click="goToProduct(product.id)"
                :product="product"
            />
        </div>
    </div>
</template>
  
<script type="module">
import axiosInstance from '@/services/axios';
import product from '@/components/product.vue';
export default {
    name: 'Admin',
    data(){
        return{
            products: [],
            productToShow: [],
            searchTerm: '',
        }
    },
    methods: {
        getProducts(){
            axiosInstance.get(`products/category/jewelery`)
                .then(response => {
                    this.products = response.data;
                    this.productToShow = response.data;
                })
                .catch(error => {
                    console.log(error)
                })        
        },
        findProduct(){
            this.productToShow = []
            for (let product of this.products){
                console.log(product.title)
                console.log(this.searchTerm)
                if (product.title.toLowerCase().trim().includes(this.searchTerm.toLowerCase().trim())){
                    this.productToShow.push(product);
                }
            }
        },
        goToProduct(id){
            this.$router.push({
                name: 'product-page',
                params: {
                    id: id
                }
            })
        },
    },
    mounted(){
        this.getProducts();
    },
    components: {
        product,
    },
};
</script>
<style scoped>
.searchbar{
    /* margin-top: 15px; */
    
    min-width: 350px;
    border-radius: 15px;
    background-color: rgb(255, 255, 255);
    border: 1px solid black;
    padding: 5px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: large;
}
.flex-around {
    display: flex;
    justify-content: space-around;
    place-items: center;
}
.grid3 {
    display: grid;
    grid-template-columns: repeat(2, auto);
}
</style>
