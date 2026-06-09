import { ListTodo } from "lucide-react";
const Todo = ({ data }: any) => {
  return (
    <>
      <div className=" flex flex-col gap-4 border-solid border-slate-100  rounded-2xl shadow-sm p-8 mt-4 md:m-0  bg-white">
        <div className="flex gap-2">
          <ListTodo className=" text-indigo-600 text-xl" />
          <span className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-3  mb-2">
            Suggestions
          </span>
        </div>
        <div className=" mb-8">
          {data.suggestions.map((info: string) => (
            <span className=" text-sm text-slate-600 font-bold flex m-4  items-start gap-2 p-6  bg-slate-50 border-2 border-solid border-slate-100  border-l-4 border-l-indigo-600 leading-relaxed rounded-xl ">
              {info}
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default Todo;
