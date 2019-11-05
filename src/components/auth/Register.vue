<template>
	<div class="row">
		<div class="col-md-4"></div>
		<div class="col-md-4 ">
			
			<h2>Register</h2>
			<hr>
			<form @submit.prevent="register">
				  <div class="form-group">
				  	 <label for="exampleInputEmail1"><small>Name</small></label>
				    <input name="name" type="name" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter name" v-model="name">

				    <label for="exampleInputEmail1"><small>Email address</small></label>
				    <input name="email" type="email" class="form-control" id="exampleInputEmail2" aria-describedby="emailHelp" placeholder="Enter email" v-model="email">
				 
				  </div>
				  <div class="form-group">
				    <label for="exampleInputPassword1"><small>Password</small></label>
				    <input name="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="password"> 
				  </div>

				  <div class="form-group">
				    <label for="exampleInputPassword1"><small>Confirm Password</small></label>
				    <input name="confirm_password" type="password" class="form-control" id="exampleInputPassword2" placeholder="Confirm Password" v-model="confirm_password"> 
				  </div>
				  <div class="form-group form-check">
				 
				    
				  </div>
				  <button type="submit" class="btn btn-primary">Create new account</button>

			</form>
		</div>
		
	</div>
</template>

<script>
	
export default{
	
	data(){
		return{
			name: '',
			email: '',
			password: '',
			confirm_password: '',
		}
	},

	methods:{
		register(){
			this.$store.dispatch('register', {
				name: this.name,
				email: this.email,
				password: this.password,
				confirm_password: this.confirm_password
			})

			.then(response => {
				this.$router.push({name : 'login'});
			})
		}
	}
}
</script>


<style>

</style>