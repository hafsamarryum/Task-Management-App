import { todoStore } from "../state/todoStore";

const FilterTask = () => {

  const { filter, setFilter, todos } = todoStore();

  const completedCount = todos.filter((item) => item.isDone).length;
  const pendingCount = todos.filter((item) => !item.isDone).length;
  const allCount = todos.length;

  return (
   <>
      <div className="w-[95%] flex justify-end align-center gap-[5px] flex-wrap text-[#FFF]">
      <h4>Filter by:</h4>
      <input
        type="radio"
        value="completed"
        checked={filter === "completed"}
        onChange={() => setFilter("completed")}
      />
      <label className="my-[22px]">Completed ({completedCount})</label>

      <input
        type="radio"
        value="pending"
        checked={filter === "pending"}
        onChange={() => setFilter("pending")}
      />
      <label className="my-[22px]">Pending ({pendingCount})</label>

      <input
        type="radio"
        value="all"
        checked={filter === "all"}
        onChange={() => setFilter("all")}
      />
      <label className="my-[22px]">All Tasks ({allCount})</label>
    </div>
   </>
  )
}

export default FilterTask
