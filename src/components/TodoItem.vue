<template>
	<div class="todo-item">	
		<div class="todo-item-left">
               <input type="checkbox" v-model="completed" @change="doneEdit">
              <div class="todo-item-label" :class="{ completed : completed }" v-if="!editing" @dblclick="editTodo">
                    {{ title }}
              </div>
                <input v-else class="todo-item-edit" type="text" v-model="title" @blur="doneEdit" @keyup.enter="doneEdit" v-focus 
                 @keyup.esc="cancleEdit">
        </div>
        	
        <div>

        	<button @click="pluralize">Plural</button>
        	<span class="remove-item" @click="removeTodo(id, index)">
                &times; 
           </span>

        </div>
	</div>
</template>

<script>
	export default{
		name: 'todo-item',

		data(){
			return{
				'id': this.todo.id,
				'title': this.todo.title,
				'completed': this.todo.completed,
				'editing': this.todo.editing,
				'beforeEditCache': ''

			}
		},

        props: {
            todo: {
                type: Object, 
                required: true,
            },
            index:{
                type: Number, 
                required: true,
            },
            checkAll:{
                type:Boolean,
                required: true,
            }
        },

	

		watch:{
			checkAll(){
				/*if (this.checkAll) {
					this.completed = true
				}else{
					this.completed = this.todo.completeds
				}*/

				this.completed = this.checkAll ? true : this.todo.completed
			}
		},

		created(){
			eventBus.$on('pluralize', this.handlePluralize)
		},

		beforeDestroy(){
			eventBus.$off('pluralize', this.handlePluralize)
		},

		methods:{
			removeTodo(index){
                this.$store.dispatch('removeTodo', index)
            },

            editTodo(){
                this.beforeEditCache = this.title;
                this.editing = true;
            },

            doneEdit(){
                if(this.title.trim() == ''){
                    this.title = this.beforeEditCache;
                }

                this.editing = false;
                this.$store.dispatch('doneEdit', {
                    'id': this.id,
                    'title' : this.title,
                    'completed' : this.completed,
                    'editing' : this.editing,
                })
            },

            cancleEdit(){
                this.editing = false;
                this.title = this.beforeEditCache;

            },

            pluralize(){
            	eventBus.$emit('pluralize')
            },

            handlePluralize(){
            	
                this.title = this.title + 's';
            	this.$store.state.todos.splice(this.index, 1, {
                    'id': this.id,
                    'title' : this.title,
                    'completed' : this.completed,
                    'editing' : this.editing,
                });
            }
		},

		directives: {
                focus: {
                    // directive definition
                    inserted: function (el) {
                    el.focus()
                    }
                }
            }
	}
</script>