interface Observer {

    onChange(type: string, data: any): void;
}

class EventEmitter {

    private _list: Observer[] = [];
    constructor() {

    }
    add(o: Observer) {
        this._list.push(o);
    }
    remove(o: Observer) {
        var index = this._list.indexOf(o);
        this._list.splice(index);
    }

    notify(type: string, data: any) {
        for (var i = 0; i < this._list.length; i++) {
            var observer = this._list[i];
            observer.onChange(type, data);
        }
    }
}

class TaskService extends EventEmitter {

    private _tasks: Task[];

    constructor() {
        super();

    }

    public addTask(task:Task){
        this._tasks.push(task);
    }

    public finishTask(task:Task) {
        this.notify("finish", task);
    }

}

class TaskPanel implements Observer {

    onChange(type: string, task: Task): void {
        alert(type+task.name);
    }
}


class Task {
    id: number;
    name: String;
}

function run() {
    var task = new Task();
    var taskservice = new TaskService();
    task.id = 1;
    task.name = "welcome";
    taskservice.addTask(task);
    var panel = new TaskPanel();
    taskservice.add(panel);
    egret.setTimeout(() => {    
    taskservice.finishTask(task);
    }, this, 3000);
}