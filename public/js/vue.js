console.clear();
var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        users:[],
        name: '',
        email: '',
        password: '',
        errors:[],
    },
    mounted:function(){
        this.getUsers()
    },
    methods: {
        store: function () {

            axios.post('/user', {
                name: this.name,
                email: this.email,
                password: this.password,

            })
                .then(function (response) {

                   if (response.data.status==false){
                       this.errors=response.data.errors;
                       swal("error!", "fail");

                   }else {
                       this.errors='';
                       swal("success", "success");
                       this.name = '';
                       this.email = '';
                       this.password = '';

                   }
                }.bind(this))
                .catch(function (error) {
                    console.log(error);
                });


            this.getUsers();


        }
        ,
        getUsers: function () {
            axios.get('/user').then(function (response) {
                this.users=response.data.users;
                console.log(response.data);
            }.bind(this)).catch(function (error) {
                console.log(error);
            });
        }
        ,
        edit:function (user) {

            this.name=user.name;
            this.email=user.email;
        },
        deleteUser:function (user) {
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this imaginary file!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        axios.delete('/user/'+user.id) .then(function (response) {
                            swal("Poof! Your imaginary file has been deleted!", {
                                icon: "success",
                            });
                            this.getUsers();
                            console.log(response);
                        }.bind(this))
                            .catch(function (error) {
                                console.log(error);
                            });

                    } else {
                        swal("Your imaginary file is safe!");
                    }
                });
        }
    }

});