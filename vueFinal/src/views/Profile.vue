
<template>
    <main>
        <h1>Profile page</h1>
        <div>
            <p class="info">Your email: {{ currentUser.email }}</p>
        </div>
        <button type="submit" v-if="isLoggedIn" @click="logout">Log out</button>
    </main>
</template>

<script module>
import { auth } from '@/main'
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
export default {
    name: 'Profile',
    setup(){
        const 
            currentUser = ref(''),
            isLoggedIn = ref(false);
        const router = useRouter();
        async function logout(){
            if (isLoggedIn.value){
                try {
                    await signOut(auth);
                    isLoggedIn.value = !isLoggedIn.value;
                    console.log('logout successful!');
                    router.push({name: 'home'});
                } catch (error){
                    alert('Some mistake occured. You were not logged out');
                }
            }
        };
        function checkAuthState() {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    isLoggedIn.value = true;
                    getCurrentUser();
                } else {
                    isLoggedIn.value = false;
                }
            })
        };
        function getCurrentUser() {
            currentUser.value = auth.currentUser;
            console.log(currentUser.value.email)
        };

        onMounted(()=>{
            checkAuthState();
        })
        return {
            // data
            currentUser, isLoggedIn,

            // methods
            logout, checkAuthState, getCurrentUser,
        }
    }

}

// export default {
//     name: 'Profile',
//     data(){
//         return{
//             currentUser: '',
//             isLoggedIn: false,
//             isUserAdmin: '',
//         }
//     },
//     methods: {
//         async logout(){
//             if (this.isLoggedIn){
//                 try {
//                     await signOut(auth);
//                     this.isLoggedIn = !this.isLoggedIn;
//                     console.log('logout successful!');
//                     this.$router.push({name: 'home'});
//                 } catch (error){
//                     console.log(error);
//                 }
//             }
//         },
//         checkAuthState() {
//             onAuthStateChanged(auth, (user) => {
//                 if (user) {
//                     this.isLoggedIn = true;
//                     this.getCurrentUser();
//                 } else {
//                     this.isLoggedIn = false;
//                 }
//             })
//         },
//         getCurrentUser() {
//             this.currentUser = auth.currentUser;
//             console.log(this.currentUser.email)
//         },
//     },
//     mounted(){
//         // test@test.test
//         // 123qwe
//         this.checkAuthState();
//     },
// }
</script>

<style scoped>
button{
    background-color: rgb(196, 196, 196);
    margin: 15px;
    padding: 10px;
    border-radius: 15px;
    color: rgb(21, 21, 21);
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 20px;
    font-weight: 600;
}
.info{
    font-size: 25px;
    margin: 15px;
}
</style>
