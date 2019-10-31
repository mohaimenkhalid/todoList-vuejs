<template>
    <div>
        <input type="text" class="todo-input" placeholder="What needs to be done" v-model="newTodo" @keyup.enter="addTodo">

    <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">

        <todo-item v-for="(todo, index) in todosFilter" :key="todo.id"  :todo="todo" :index="index" :checkAll="anyRemaining" @removedTodo="removeTodo" @finishedEdit= "finishedEdit">
           <!-- <div class="todo-item-left">
               <input type="checkbox" v-model="todo.completed">
              <div class="todo-item-label" :class="{ completed : todo.completed }" v-if="!todo.editing" @dblclick="editTodo(todo)">
                    {{ todo.title }}
              </div>
                <input v-else class="todo-item-edit" type="text" v-model="todo.title" @blur="doneEdit(todo)" @keyup.enter="doneEdit(todo)" v-focus 
                 @keyup.esc="cancleEdit(todo)">
           </div> 

            <div class="remove-item" @click="removeTodo(index)">
                &times;
           </div> -->

        </todo-item>

    </transition-group>

        <div class="extra-container">
            <div><label><input type="checkbox" :checked="anyRemaining" @change="checkAllTodos"> Check  All</label></div>
            <div>{{ remaining }} item left</div>
        </div>

        <div class="extra-container">
            <div>
                <button :class="{ active : filter == 'all'}" @click="filter = 'all'">All</button>
                <button :class="{ active : filter == 'active'}" @click="filter = 'active'">Active</button>
                <button :class="{ active : filter == 'completed'}" @click="filter = 'completed'">Completed</button>
            </div>

            <div>
            <transition name="fade">
                <button v-if="showClearCompletedButton" @click="clearCompleted">Clear Completed</button>
            </transition>
            </div>
        </div>
    </div>
</template>

<script>
    import TodoItem from './TodoItem';
        export default {
            name: 'todo-list',
            components:{
                TodoItem,
            },

          data () {
            return {
                newTodo: '',
                isForTogo: 3,
                beforeEditCache: '',
                filter: 'all',
                todos: 
                    [
                        {
                            'id': 1,
                            'title': 'Finish vue Screenshot',
                            'completed' : true,
                            'editing' : false
                        },

                        {
                            'id': 2,
                            'title': 'Take over',
                            'completed' : false,
                            'editing' : false
                        }
                    ]
            }
          },

          methods:{
            addTodo(){

                if(this.newTodo.trim().length == 0){
                    return
                }

                this.todos.push({
                    id: this.isForTogo,
                    title: this.newTodo,
                    completed: false,
                });
                this.newTodo ='',
                this.isForTogo++
            },

            removeTodo(index){
                this.todos.splice(index, 1);
            },


            checkAllTodos(){
              this.todos.forEach((todo)=>
                todo.completed = event.target.checked  )
            },

            clearCompleted(){
                this.todos = this.todos.filter(todo=> !todo.completed)
            },

            finishedEdit(data){
                this.todos.splice(data.index, 1, data.todo);
            }

            },



          computed:{
            remaining(){
                    return this.todos.filter(todo=> !todo.completed).length;
                },

            anyRemaining(){
                  return  this.remaining == 0;
                },

            todosFilter(){
               if(this.filter == 'all'){
                    return this.todos;
               }else if(this.filter == 'active'){

                   return this.todos.filter(todo => !todo.completed)

               }else if(this.filter == 'completed'){
                return this.todos.filter(todo => todo.completed)
               }
               return this.todos;
            },

            showClearCompletedButton(){
                return this.todos.filter(todo=> todo.completed).length > 0;
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