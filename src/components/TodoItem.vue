<template>
  <li :class="{ completed: todo.completed }">
    <span class="task-text">{{ todo.text }}</span>
    <div class="task-actions">
      <button @click="$emit('toggle-todo', todo.id)" class="complete-btn">
        {{ todo.completed ? '取消完成' : '完成' }}
      </button>
      <button @click="$emit('delete-todo', todo.id)" class="delete-btn">刪除</button>
    </div>
  </li>
</template>

<script>
export default {
  props: ['todo']
}
</script>

<style scoped>
.completed {
  text-decoration: line-through;
  opacity: 0.7;
}

.task-text {
  flex: 1;
}

.task-actions {
  display: flex;
  gap: 5px;
}
</style>
