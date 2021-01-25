import {BaseService} from './BaseService.js';

export class Taskservice extends BaseService {
    constructor(){
        super(); //Gọi lại phương thức constructor của class cha
    }
    // Định nghĩa phương thức getAllTask
    getAllTask = () => {
       return this.get('http://svcy.myclass.vn/api/ToDoList/GetAllTask');
    }

    // Định nghĩa hàm đưa dữ liệu về BackEnd
    addTask = (task) => { // <= đúng định dạng BackEnd quy định
        return this.post('http://svcy.myclass.vn/api/ToDoList/AddTask', task);
    }
    
    // Định nghĩa hàm xóa dữ liệu 
    deleteTask = (taskName) => {
        return this.delete(`http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`);
    }

    // Xây dựng chức năng donetask, reject task
    doneTask = (taskName) => {
        return this.put(`http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`);
    }
    rejectTask = (taskName) => {
        return this.put(`http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`);
    }
}