export const formValidation = {
    data(){
        return {
            error: {
                email: '',
                password: '',
            }
        }
    },
    methods: {
        validatePassword(password) {
            if (password.length < 5) {
                this.error.password = 'Password must be at least 5 characters long.';
            } else {
                this.error.password = '';
            }
        },
        validateEmail(email) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                this.error.email = 'Please enter a valid email address.';
            } else {
                this.error.email = '';
            }
        },
        resetError(){
            this.error = {
                email: '',
                password: '',
            }
            console.log('errors reseted');
        }
    }
}