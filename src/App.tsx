import "./index.css";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { todoStore } from "./state/todoStore";
import FilterTask from "./components/FilterTask";
import Header from "./components/Header";

function App() {
  const [todo, setTodo] = useState("");
  const [searchTask, setSearchTask] = useState("");
  const todoState = todoStore();
  const { todos, filter } = todoState;

  const filteredTodos = todos.filter((item) => {
    if (filter === "completed") return item.isDone;
    if (filter === "pending") return !item.isDone;
    return true;
  });

  const displayedTodos = filteredTodos.filter((item) =>
    item.todo.toLowerCase().includes(searchTask.toLowerCase())
  );

  const randomId = (): number => {
    const min = 1000;
    const max = 9999;
    return Math.round(Math.random() * (max - min + 1)) + min;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (todo.length > 0) {
      todoState.addTodo({
        id: randomId(),
        todo: todo,
        isDone: false,
      });
    }
    setTodo("");
  };

  return (
    <>
      <ToastContainer />
      <Header />
      <div className="font">
        <div className="h-100 w-full flex justify-center items-center bg-black text-white">
          <div className="w-[60%] formDiv mt-[15px] rounded-[16px] bg-[#22332B]"> 
            <h1 className="font-bold text-3xl flex justify-center items-center text-black flex-wrap mt-[0px] h-[80px] w-full mb-[15px] px-[0px] bg-img text-white">
              Task Management App
            </h1>
            <div className="pl-[15px] pr-[4px]">
              <p className="text-sm text-gray-300 mb-[10px]">Add your daily task:</p>

              <form onSubmit={handleSubmit}>
                <div className="mt-5">
                  <input
                    type="text"
                    className="w-[95%] h-[40px] pl-[6px] mb-[1px] rounded-[8px] bg-[#dcfce7] border font"
                    placeholder="Enter your task"
                    onChange={(e) => setTodo(e.target.value)}
                    value={todo}
                  />
                </div>
              </form>

              <FilterTask />

              <div className="w-[95%] flex justify-end">
                <input
                  type="text"
                  value={searchTask}
                  onChange={(e) => setSearchTask(e.target.value)}
                  placeholder="Search task here ..."
                  className="w-[35%] h-[40px] pl-[6px] mb-[6px] rounded-[8px] bg-[#dcfce7] border font"
                />
              </div>

              <p className="text-sm text-gray-300 mb-[10px] mt-[1px]">List of tasks:</p>
              <hr className="mr-[15px] mb-[15px]" />

              <div className="h-[230px] overflow-y-auto pr-2 custom-scroll mr-[10px]">
                {displayedTodos.length > 0 ? (
                  displayedTodos.map((item) => (
                    <div
                      key={item.id}
                      className={`relative w-[95%] rounded-[10px] px-[15px] py-[4px] mb-[10px] border flex justify-between items-center transition-transform duration-200 hover:translate-x-[5px] hover:shadow-[0_0_15px_rgba(0,255,231,0.2)] before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[4px] before:bg-teal-400 before:rounded-tl-[10px] before:rounded-bl-[10px] before:scale-y-0 before:origin-top hover:before:scale-y-100`}
                    >
                      <p className={item.isDone ? "text-gray-400" : ""}>
                        <span className={item.isDone ? "line-through" : ""}>{item.todo}</span>
                        {item.isDone && <span className="ml-[9px]">- completed</span>}
                      </p>

                      <div className="flex items-center pr-[6px]">
                        <input
                          type="checkbox"
                          onChange={(e) => todoState.toggleTodo(item.id, e.target.checked)}
                          checked={item.isDone}
                          className="mr-[10px] w-[18px] h-[18px] accent-teal-400"
                        />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-red-400 cursor-pointer hover:text-red-600"
                          onClick={() => todoState.deleteTodo(item.id)}
                        >
                          <path d="M3 6h18" />
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                          <line x1="10" x2="10" y1="11" y2="17" />
                          <line x1="14" x2="14" y1="11" y2="17" />
                        </svg>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-300 bg-[#282828] h-[50px] mr-[10px] flex justify-center items-center">Task not found</p>
                )}
              </div>
               
               {/* card section */}
            <div className="flex md:flex-row gap-5 my-[20px] gap-[10px] relative z-[1] mr-[13px]">
              <div className="flex-1 text-center p-[28px] rounded-[12px] bg-[rgba(0,0,0,0.2)] border border-white/5 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)] before:content-[''] before:absolute before:-top-1/2 before:-left-1/2 before:w-[200%] before:h-[200%] before:bg-[radial-gradient(circle,rgba(255,255,255,0.1)_0%,rgba(0,0,0,0)_70%)] before:opacity-0 hover:before:opacity-100 before:transition-all before:duration-300">
                <div className="text-3xl mr-[8px] pb-[12px]">{todos.length}</div>
                <div className="text-sm text-gray-300">Total Tasks</div>
              </div>
              <div className="flex-1 text-center p-[28px] rounded-[12px] bg-[rgba(0,0,0,0.2)] border border-white/5 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)] before:content-[''] before:absolute before:-top-1/2 before:-left-1/2 before:w-[200%] before:h-[200%] before:bg-[radial-gradient(circle,rgba(255,255,255,0.1)_0%,rgba(0,0,0,0)_70%)] before:opacity-0 hover:before:opacity-100 before:transition-all before:duration-300">
                <div className="text-3xl  mr-[8px] pb-[12px]">{todos.filter(t => t.isDone).length}</div>
                <div className="text-sm text-gray-300">Completed</div>
              </div>
              <div className="flex-1 text-center p-[28px] rounded-[12px] bg-[rgba(0,0,0,0.2)] border border-white/5 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)] before:content-[''] before:absolute before:-top-1/2 before:-left-1/2 before:w-[200%] before:h-[200%] before:bg-[radial-gradient(circle,rgba(255,255,255,0.1)_0%,rgba(0,0,0,0)_70%)] before:opacity-0 hover:before:opacity-100 before:transition-all before:duration-300">
                <div className="text-3xl mr-[8px] pb-[12px]">{todos.filter(t => !t.isDone).length}</div>
                <div className="text-sm text-gray-300">Pending</div>
              </div>
            </div>
            


            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
