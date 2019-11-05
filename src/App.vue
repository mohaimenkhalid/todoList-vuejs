<template>
  <div id="app" class="container">
    <img src="./assets/logo.png" class="logo">
    <TodoList></TodoList>
  </div>
</template>

<script>
  
import TodoList from './components/TodoList';

export default {
  name: 'App',
  components:{
    TodoList
  }
}
</script>

<style>

#app{
  font-family: 'Avenir', Arial, Helvetica, sans-serif;
  -webkit-font-smooting: antialiased;
  -moz-osx-font-smooting: grayscale;

  color: #2c3e50;
  font-size: 24px;
}

*{
  box-sizing: border-box;
}

.container{

  max-width: 600px;
  margin: 0 auto;
}

.logo{
  display: block;
  margin: 20px auto;
  height: 75px;

}
</style>
