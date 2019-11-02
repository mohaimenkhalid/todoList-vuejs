<template>
    <div>
        <input type="text" class="todo-input" placeholder="What needs to be done" v-model="newTodo" @keyup.enter="addTodo">

    <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">

        <todo-item v-for="(todo, index) in todosFilter" :key="todo.id"  :todo="todo" :index="index" :checkAll="anyRemaining" >

        </todo-item>

    </transition-group>

        <div class="extra-container">
           <TodoCheckAll ></TodoCheckAll>
          <TodoItemRemaining></TodoItemRemaining>
        </div>

        <div class="extra-container">
          <TodoFiltered></TodoFiltered>
            <div>
            <transition name="fade">
               <TodoClearCompleted></TodoClearCompleted>
            </transition>
            </div>
        </div>
    </div>
</template>

<script>
    import TodoItem from './TodoItem';
    import TodoItemRemaining  from'./TodoItemRemaining';
    import TodoCheckAll  from'./TodoCheckAll';
    import TodoFiltered  from'./TodoFiltered';
    import TodoClearCompleted  from'./TodoClearCompleted';

        export default {
            name: 'todo-list',
            components:{
                TodoItem,
                TodoItemRemaining,
                TodoCheckAll,
                TodoFiltered,
                TodoClearCompleted
            },

          data () {
            return {
                newTodo: '',
                isForTogo: 3,
                beforeEditCache: '',
                filter: 'all',
                todos: []
            }
          },

          methods:{
            addTodo(){

                if(this.newTodo.trim().length == 0){
                    return
                }

                this.$store.dispatch('addTodo', {
                    id: this.isForTogo,
                    title: this.newTodo,
                    completed: false,
                    editing: false
                })

                this.newTodo ='',
                this.isForTogo++
            }

         },

         created(){
            this.$store.dispatch('retrieveTodos')
         },


          computed:{
            remaining(){
                    return this.$store.getters.remaining
                },

            anyRemaining(){
                  return this.$store.getters.anyRemaining
                },

            todosFilter(){
               return this.$store.getters.todosFilter
            },

            showClearCompletedButton(){
                 return this.$store.getters.showClearCompletedButton
            },

          }
    }
</script>

<style>

@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.css");

.todo-input{
    width: 100%;
    padding: 10px 18px;
    font-size: 18px;
    margin-bottom: 16px;
}

.todo-item{
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.remove-item{
    cursor: pointer;
    margin-left: 14px;
}

.todo-item-left{
    display: flex;
    align-items: center;
}

.todo-item-label{
    padding: 10px;
    border: 1px solid white;
    margin-left: 12px;
}

.todo-item-edit{
    font-size: 24px;
    color: #2c3e50;
    margin-left: 12px;
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    font-family: 'Avenir', Arial, Helvetica, sans-serif;
}

.completed{
    text-decoration: line-through;
    color: grey;
}

.extra-container{
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    border-top: 1px solid lightgrey;
    padding-top: 14px;
    margin-bottom: 14px;
}

button{
    font-size:14px;
    background-color: white;
    appearance: none;
}

.active{
    background: rgb(103, 216, 103);
}

.fade-enter-active, .fade-leave-active{
    transition: opacity .2s;
}

.fade-enter, .fade-leave-to{
    opacity: 0;
}

</style>