import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

axios.defaults.baseURL = 'http://127.0.0.1:8000/api';

export const store = new Vuex.Store({

	state:{

		filter: 'all',
		todos: [],
	},

	getters:{
		remaining(state){
                    return state.todos.filter(todo=> !todo.completed).length;
                },

            anyRemaining(state, getters){
                  return  getters.remaining == 0;
                },

            todosFilter(state){
               if(state.filter == 'all'){
                    return state.todos;
               }else if(state.filter == 'active'){

                   return state.todos.filter(todo => !todo.completed)

               }else if(state.filter == 'completed'){
                return state.todos.filter(todo => todo.completed)
               }
               return state.todos;
            },

            showClearCompletedButton(state){
                return state.todos.filter(todo=> todo.completed).length > 0;
            },
	},


	mutations:{

	
		addTodo(state, todo){
			state.todos.push({
				id: todo.id,
				title:todo.title,
				completed: false,
				editing: false
			});
		},

		clearCompleted(state){
			
			state.todos = state.todos.filter(todo=> !todo.completed);
		},

		updateFilter(state, filter){
			state.filter = filter;
		},

		checkAll(state, checked){
			state.todos.forEach((todo)=> todo.completed = checked)
		},

		removeTodo(state, id){

			const index = state.todos.findIndex(item => item.id == id);
			 state.todos.splice(index, 1);
		},

		doneEdit(state, todo){
			const index = state.todos.findIndex(item => item.id == todo.id)
			state.todos.splice(index, 1, {
                    'id': todo.id,
                    'title' : todo.title,
                    'completed' : todo.completed,
                    'editing' : todo.editing,
                });
		},

		retrieveTodos(state, todos){

			state.todos = todos;
		}
	}, 

	actions: {

		retrieveTodos(context){
			axios.get('/todos')
				.then(response=>{
					context.commit('retrieveTodos', response.data)
				})
				.catch(error=>{
					console.log(error)
				})
		},

		addTodo(context, todo){

			axios.post('/todos', todo)
				.then(response=>{
					context.commit('addTodo', response.data)
				})
				.catch(error=>{
					console.log(error)
				})
		},

		clearCompleted(context){

			const completed = store.state.todos
				.filter(todo=> todo.completed)
				.map(todo => todo.id)

			axios.delete('/todosdeletecompleted', {
				data:{
					todos: completed,
				}
			})
				.then(response=>{
					context.commit('clearCompleted')
				})
				.catch(error=>{
					console.log(error)
				})
		},

		updateFilter(context, filter){
			context.commit('updateFilter', filter);
		},

		checkAll(context, checked){

			axios.patch('/todoscheckall', {
				completed: checked,
			})
				.then(response=>{
					context.commit('checkAll', checked)
				})
				.catch(error=>{
					console.log(error)
				})
		},

		removeTodo(context, id, index){

			axios.delete('/todos/'+id)
				.then(response=>{
					context.commit('removeTodo', index)
				})
				.catch(error=>{
					console.log(error)
				})
		},

		doneEdit(context, todo){
			axios.patch('/todos/'+todo.id, todo)
				.then(response=>{
					context.commit('doneEdit', response.data)
				})
				.catch(error=>{
					console.log(error)
				})
		}

	}
})