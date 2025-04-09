import { toast } from "react-toastify";
import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"

export type TodoType = {
  id:number,
  todo: string,
  isDone: boolean
}

type States = {
  todos:Array<TodoType> | [],
  filter: "all" | "completed" | "pending"
}
type Actions  = {
  addTodo: (todo: TodoType) => void
  toggleTodo:(id:number , isChecked:boolean) => void
  deleteTodo: (id:number) => void
  setFilter: (filter: "all" | "completed" | "pending") => void
}

export const todoStore = create<States & Actions>()(
  devtools(
    persist(
      (set) => ({
        todos: [],
        addTodo: (todo: TodoType) => { set((state) => ({ todos: [todo, ...state.todos] }));
        toast.success("Task added successfully! 🎉");
      },
        toggleTodo:(id:number, isChecked:boolean) => { set((state) => ({
          todos: state.todos.map((item) => {
            if (item.id === id){
              item.isDone = isChecked;
            }
            return item;
          })
        }));
        toast.info(`Task marked as ${isChecked ? "completed" : "pending"}`);
      },
        deleteTodo:(id:number) => { set((state) => ({
          todos:state.todos.filter((item) => item.id !== id),
        }));
        toast.info("Task is deleted")
      },
        filter: "all",
        setFilter: (filter) => set(() => ({ filter })),
      }),
      {name: "todoStore"}
    )
  )
);