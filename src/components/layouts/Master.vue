<template>
	<div id="app">
		<ul class="nav">
			<li><router-link :to="{ name: 'home'}">Home</router-link></li>
			<li><router-link to="/todo">App</router-link></li>
			<li><router-link to="/about">About</router-link></li>
			<li v-if="!loggedIn"><router-link to="/login">Login</router-link></li>
			<li v-if="!loggedIn"><router-link to="/register">Register</router-link></li>
			<li v-if="loggedIn"><router-link to="/logout">Logout</router-link></li>
		</ul>

		<router-view></router-view>
	</div>
</template>

<script>
	export default{
		computed:{
			loggedIn(){
				return this.$store.getters.loggedIn;
			}
		}
	}
</script>

<style>
	
	*{
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing:antialiased;
		-moz-osx-font-smoothing:grayscale ;
		color: #2c3e50;
		font-size: 24px;
		height:100vh;
	}

	.flex-center{
		display: flex;
		justify-content: center;
	}

	.nav{
		display: flex;
		list-style: none;
		padding: 15px 0;
		margin: 0;
		justify-content: flex-end;
		background: #F5F8FA;
		border-bottom: 1px solid lightgrey;
		margin-bottom: 24px;
	}

	.nav a{
		color: #636b6f;
		padding: 0 25px;
		font-size: 14px;
		font-weight: 600;
		letter-spacing: .1rem;
		text-decoration: none;
		text-transform: uppercase;
	}
</style>