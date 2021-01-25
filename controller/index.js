import { Taskservice } from '../service/Taskservice.js';
import { Task } from '../models/task.js'


// Khai báo đối tượng service
const taskSV = new Taskservice();

const getAllTask = async () => {
    // Bước 2:
    // dùng service để gọi API từ Backend lấy dữ liệu về
    // const promise = taskSV.getAllTask();

    // promise.then(result => {
    //     console.log('result', result);
    // })
    try {
        const result = await taskSV.getAllTask();
        // Bước 3 : Từ dữ liệu lấy về tách ra mảng => render dữ liệu lên giao diện
        // task todo
        let taskToDo = result.data.filter(task => task.status === false);
        // Gọi hàm hiển thị dữ liệu lên giao diện  
        console.log(taskToDo);
        renderToDo(taskToDo);
        // task done
        let taskComplete = result.data.filter(task => task.status === true);
        renderDone(taskComplete);
        // Lỗi hàm try sẽ trả về biến err của catch
    }
    catch (err) {
        console.log(err)
    }
}

const renderToDo = (taskToDo) => {
    const contentToDo = taskToDo.reduce((content, task, index) => {
        return content += `
        <li>
            <span>${task.taskName}</span>
            <a class="buttons" style="cursor: pointer;" onclick="deleteTask('${task.taskName}')"><i class="fa fa-trash"></i></a>
            <a class="buttons" style="cursor: pointer;" onclick="doneTask('${task.taskName}')"><i class="fa fa-check"></i></a>                    
        </li>
    `
    }, '');
    document.getElementById('todo').innerHTML = contentToDo;
}

const renderDone = (taskComplete) => {
    const contentDone = taskComplete.reduce((content, task, index) => {
        return content += `
        <li>${task.taskName}
            <a class="buttons" style="cursor: pointer;" onclick="deleteTask('${task.taskName}')"><i class="fa fa-trash"></i></a>
            <a class="buttons" style="cursor: pointer;" onclick="rejectTask('${task.taskName}')"><i class="fa fa-redo"></i></a>
        </li>
        `;
    }, '');
    document.getElementById('completed').innerHTML = contentDone;
}

// Bước 1 : Định nghĩa và gọi hàm GetAllTask để lấy dữ liệu từ API  
getAllTask();

// Nghiệp vụ thêm task
// B1 : Định nghĩa sự kiện click cho button #addItem
document.getElementById('addItem').addEventListener('click', async (event) => {
    // event.preventDefault(); Chặn sự kiện hiện tại của thẻ submit hay href của thẻ a
    // event.target => đại diện cho thẻ button đang được onclick

    // Lấy thông tin người dùng nhập từ giao diện
    let taskName = document.getElementById('newTask').value;

    // Tạo ra object backend yêu cầu
    const taskModel = new Task();
    taskModel.taskName = taskName;
    // Gọi API đưa dữ liệu về server
    try {
        let result = await taskSV.addTask(taskModel);
        console.log(result.data);
        // Sau khi thêm thành công gọi API getAllTask từ hàm đã viết sẵn
    } catch (err) {
        console.log(err);
    }
})

// Nghiệp vụ xóa dữ liệu
window.deleteTask = async (taskName) => {
    let cfm = confirm('Bạn có muốn xóa task ?');
    if (cfm) {
        // Gọi API mỗi lần người dùng bấm nút xóa dữ liệu
        try {
            let result = taskSV.deleteTask(taskName);
            console.log(result.data);
            // Gọi lại hàm get task sau khi xóa
            getAllTask();
        } catch (err) {
            console.log(err);
        }
    }
}

window.doneTask = async(taskName) => {
    try {
        let result = taskSV.doneTask(taskName);
        console.log(result.data);
        getAllTask();
    }catch(err){
        console.log(err);
    }
}

window.rejectTask = async(taskName) => {
    try {
        let result = taskSV.rejectTask(taskName);
        console.log(result.data);
        getAllTask();
    } catch(err){
        console.log(err);
    }
}