import { defineStore } from "pinia";
import { reactive } from "vue";

export const useTaskStore = defineStore("task", () => {
    
    const tasks = reactive(
        localStorage.getItem('tasks') ? 
            JSON.parse(localStorage.getItem('tasks')) : 
            [
                {
                    id: 1,
                    name: "Go to shop",
                    completed: false,
                    dueDate: '2024-02-03',
                    dueTime: '15:00'    
                },
                {
                    id: 2,
                    name: "Get Bananas",
                    completed: false,
                    dueDate: '2024-01-04',
                    dueTime: '16:00'
                },
                {
                    id: 3,
                    name: "Do the homework",
                    completed: false,
                    dueDate: '2024-07-05',
                    dueTime: '12:00'
                },
            ]
    )
    return { tasks }
})