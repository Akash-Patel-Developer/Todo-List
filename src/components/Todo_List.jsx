import React, { useEffect, useState } from "react";

function List() {
    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([]);
    useEffect(()=>{
        let todos = JSON.parse(localStorage.getItem("todos"));
        setTodos(todos);
    },[]);
    const saveToLS = ()=>{
        localStorage.setItem("todos",JSON.stringify(todos));
    }
    const handleChange = (e) => {
        setTodo(e.target.value);
    };
    const handleAdd = () => {
        if (todo.trim()) { // Prevent adding empty todos
            setTodos([...todos, { id: Date.now(), todo, isCompleted: false }]);
            setTodo("");
        }
        saveToLS();
    };

    const handleDelete = (id) => {
        const newTodos = todos.filter(item => item.id !== id);
        setTodos(newTodos);
    };

    const handleEdit = (id) => {
        const edit = todos.filter(item => item.id === id);
        setTodo(edit[0].todo);
        const newTodos = todos.filter(item => item.id !== id);
        setTodos(newTodos);
        saveToLS();
    };

    const handleCheckbox = (e) => {
        let id = Number(e.target.name);
        let index = todos.findIndex(item => item.id === id);
        if (index !== -1) {
            const newTodos = [...todos];
            newTodos[index].isCompleted = !newTodos[index].isCompleted;
            setTodos(newTodos);
        }
        saveToLS();
    };

    return (
        <>
            <div className="bg-white h-[100vh] pt-0 md:pt-4">
                <h1 className="h-16 bg-violet-500 text-orange-300 text-2xl pt-4 pl-4 font-extrabold md:ml-4 md:mr-4 rounded-md shadow-red-400">Tasks</h1>
                <div className="border md:mt-4 md:ml-[8rem] md:mr-[8rem]     ml-4 mr-4 mt-2 bg-slate-300 rounded-sm p-3">
                    <input type="text" name=""
                        onChange={handleChange} value={todo}
                        placeholder="Todo-List"
                        className="h-7 w-4/5 pl-5 md:h-10 outline-none" />
                    <button
                        onClick={() => handleAdd()}
                        className="h-7 w-12 border ml-3 md:h-10 md:w-20 bg-blue-400 font-extrabold text-white"
                    >Save</button>
                    <br />
                    {todos.map(item => {
                        return (
                            <div key={item.id} className="flex justify-evenly mt-5 bg-slate-200 p-2">
                                <input name={item.id} onChange={handleCheckbox} checked={item.isCompleted} type="checkbox"
                                    className="h-5 w-5 mt-1"
                                />
                                <p className={`border w-[11rem] text-black font-medium ${item.isCompleted ? "line-through text-red-600" : ""}`}>
                                    {item.todo}
                                </p>
                                <div className="button">
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="h-7 w-12 ml-2 bg-blue-400 text-white"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => handleEdit(item.id)}
                                        className="h-7 w-10 ml-2 bg-blue-400 text-white"
                                    >
                                        Edit
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default List;
