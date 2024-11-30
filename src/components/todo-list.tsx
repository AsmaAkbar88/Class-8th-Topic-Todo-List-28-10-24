'use client'  //hm apny project ko 1 client side bnana chah rhy hen 

import { useState, useEffect, ChangeEvent, KeyboardEvent } from "react"

import { Input } from "./ui/input";
import { Button } from "./ui/button";    //ye 3 components hy jo hm ny shandcn lib sy liye hen 
import { Checkbox } from "./ui/checkbox";



interface Task {
    id: number;        //ham apni data type define kr rhy hen 
    text: string;
    completed: boolean;
}
export default function TodoList(){
                                               ///state mangement 5 stage
    const [tasks, setTasks] = useState<Task[]>([]);    // new task ko add krta hy (hellow world)
    const [newTask, setNewTask] = useState<string>("");     // task ko show krtwta hy hellow world
    const [editingTaskId, setEditingTaskId] = useState<number | null>(null);   // task ki id ko show krtwa hy: ham yahan py har 1 todo-list ko id day rhy hen  wo nzr nhi aarhi par sara kam backend py ho rha hy 
    const [editedTaskText, setEditedTaskText] = useState<string>("");      //task ko edit krty hen : hellow world change value
    const [isMounted, setIsMounted] = useState<boolean>(false);   // boht ssary error sy bachny ky liye

// Get 
    useEffect(() => {   //hmry use effect hook kko nhi pta kia krna hy jaisy hi ye call ho ga waisy hi ye kam kry ga
        setIsMounted(true);
        const savedTasks = localStorage.getItem("tasks");   //verible
        if (savedTasks) {
          setTasks(JSON.parse(savedTasks) as Task[]);
        }
      }, []);


//    ADD 
      useEffect(() => {
        if (isMounted) {
          localStorage.setItem("tasks", JSON.stringify(tasks));
        }
      }, [tasks, isMounted]);   //sab sy phly ye [] chaly ga is main jitny bhi task hen or ye mounted main add kr day ga

/// yahan  eror function  use kia hy 
      const addTask = (): void => {
        if (newTask.trim() !== "") {
          setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
          setNewTask("");   //yahan py hm is ko call kr ky new value update kr rhy hen 
        }
      };

                                // voide ka mtlb huta hy hmy pta nhi hy yahan kon si value aae gi
      const toggleTaskCompletion = (id: number): void => {
        setTasks(
          tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
          )
        );
      };
      const startEditingTask = (id: number, text: string): void => {
        setEditingTaskId(id);
        setEditedTaskText(text);
      }

      const updateTask = (): void => {
        if (editedTaskText.trim() !== "") {
          setTasks(
            tasks.map((task) =>
              task.id === editingTaskId ? { ...task, text: editedTaskText } : task
            )
          );
          setEditingTaskId(null);
          setEditedTaskText("");
        }
      };


      const deleteTask = (id: number): void => {
        setTasks(tasks.filter((task) => task.id !== id));
      };
      
      return (
        <div className="flex flex-col items-center justify-center h-screen bg-orange-200 ">
          <div className="w-full max-w-lg min-h-[200px] bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 border-4 border-black">
            <h1 className="text-5xl font-bold mb-6 text-gray-800 ">
              Todo List
            </h1>


            {/* ye (div )aad new task */}
            <div className="flex items-center mb-4">    
              <Input
                type="text"
                placeholder="Add a new task"
                value={newTask}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setNewTask(e.target.value)}
                className="flex-1 mr-2 px-3 py-2 rounded-md border border-gray-300
                 dark:border-gray-600 "
              />
              <Button
                onClick={addTask}
                className="bg-black hover:bg-slate-800 text-white font-medium py-2 px-4 rounded-md"
              > Add
              </Button>
            </div>





            <div className="space-y-2">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 rounded-md px-4 py-2"
                >
                  <div className="flex items-center">
                    <Checkbox
                      checked={task.completed}
                      className="mr-2"
                      onCheckedChange={() => toggleTaskCompletion(task.id)}
                    />
                    {editingTaskId === task.id ? (
                      <Input
                        type="text"
                        value={editedTaskText}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setEditedTaskText(e.target.value)}
                        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                          if (e.key === "Enter") {
                            updateTask();
                          }
                        }}
                        className="flex-1 px-3 py-2 rounded-md border border-gray-300
                         dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                      />
                    ) : (
                      <span
                        className={`flex-1 text-gray-800 dark:text-gray-200 ${
                          task.completed
                            ? "line-through text-gray-500 dark:text-gray-400"
                            : ""
                        }`}
                      >
                        {task.text}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center">
                    {editingTaskId === task.id ? (
                      <Button
                        onClick={updateTask}
                        className="bg-black hover:bg-slate-800 text-white font-medium py-1 px-2 rounded-md mr-2"
                      >
                        Save
                      </Button>
                    ) : (
                      <Button
                        onClick={() => startEditingTask(task.id, task.text)}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-gray-200 font-medium py-1 px-2 rounded-md mr-2"
                      >
                        Edit
                      </Button>
                    )}
                    <Button
                      onClick={() => deleteTask(task.id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-2 rounded-md"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
      
      
}
















