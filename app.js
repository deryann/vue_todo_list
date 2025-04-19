// TodoItem 元件
const TodoItem = {
  props: ['todo'],
  template: `
    <li :class="{ completed: todo.completed }">
      <span class="task-text">{{ todo.text }}</span>
      <div class="task-actions">
        <button @click="$emit('toggle-todo', todo.id)" class="complete-btn">
          {{ todo.completed ? '取消完成' : '完成' }}
        </button>
        <button @click="$emit('delete-todo', todo.id)" class="delete-btn">刪除</button>
      </div>
    </li>
  `
};

// TodoList 頁面元件
const TodoList = {
  components: {
    TodoItem
  },
  data() {
    return {
      todos: JSON.parse(localStorage.getItem('todos') || '[]'),
      newTodo: '',
      filter: 'all' // all, active, completed
    };
  },
  computed: {
    filteredTodos() {
      switch (this.filter) {
        case 'active':
          return this.todos.filter(todo => !todo.completed);
        case 'completed':
          return this.todos.filter(todo => todo.completed);
        default:
          return this.todos;
      }
    },
    activeTodoCount() {
      return this.todos.filter(todo => !todo.completed).length;
    },
    completedTodoCount() {
      return this.todos.filter(todo => todo.completed).length;
    }
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim()) {
        const newTask = {
          id: Date.now(),
          text: this.newTodo,
          completed: false
        };
        this.todos.push(newTask);
        this.newTodo = '';
        this.saveTodos();
      }
    },
    toggleTodo(id) {
      const todo = this.todos.find(todo => todo.id === id);
      if (todo) {
        todo.completed = !todo.completed;
        this.saveTodos();
      }
    },
    deleteTodo(id) {
      this.todos = this.todos.filter(todo => todo.id !== id);
      this.saveTodos();
    },
    clearCompleted() {
      this.todos = this.todos.filter(todo => !todo.completed);
      this.saveTodos();
    },
    setFilter(filter) {
      this.filter = filter;
    },
    saveTodos() {
      localStorage.setItem('todos', JSON.stringify(this.todos));
    }
  },
  template: `
    <div>
      <h1>Vue 待辦清單</h1>
      
      <div class="input-container">
        <input 
          type="text" 
          v-model="newTodo" 
          @keyup.enter="addTodo" 
          placeholder="新增待辦事項..."
        >
        <button @click="addTodo">新增</button>
      </div>
      
      <div class="filter-container">
        <button 
          @click="setFilter('all')" 
          :class="{ active: filter === 'all' }"
        >
          全部 ({{ todos.length }})
        </button>
        <button 
          @click="setFilter('active')" 
          :class="{ active: filter === 'active' }"
        >
          進行中 ({{ activeTodoCount }})
        </button>
        <button 
          @click="setFilter('completed')" 
          :class="{ active: filter === 'completed' }"
        >
          已完成 ({{ completedTodoCount }})
        </button>
        <button 
          v-if="completedTodoCount > 0" 
          @click="clearCompleted"
        >
          清除已完成
        </button>
      </div>
      
      <ul v-if="filteredTodos.length > 0">
        <todo-item
          v-for="todo in filteredTodos"
          :key="todo.id"
          :todo="todo"
          @toggle-todo="toggleTodo"
          @delete-todo="deleteTodo"
        ></todo-item>
      </ul>
      
      <p v-else class="empty-list">
        {{ filter === 'all' ? '沒有待辦事項' : 
           filter === 'active' ? '沒有進行中的待辦事項' : '沒有已完成的待辦事項' }}
      </p>
    </div>
  `
};

// 路由設定
const routes = [
  { path: '/', component: TodoList }
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes
});

// 建立 Vue 應用程式
const app = Vue.createApp({
  template: `<router-view></router-view>`
});
app.use(router);
app.mount('#app');
