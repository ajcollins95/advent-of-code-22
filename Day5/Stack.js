import { TaskList } from './lists';
import DOM from './domManipulation';

//Contains Tasks, Projects, and their parent, Stack

//Stack Factory function
//Stack is a 'parent class'
const Stack = () => {
    let _data = {
        type: "default",
        name: "untitled"
    }

    const validTypes = ['Project','Task']

    //getters and setters
    const setType = (newType) => {
        if (validTypes.includes(newType)){
            _data.type = newType
        }
        else {
            throws `${newType} is invalid type`
        } 
    }

    const getProps = () => {
        return _data
    }

    const setName = (newName) => {
        _data.name = newName
    }

    const setList = (list) => {
        _data['list'] = list
    }

    const setActive = (val) => {
        //should be 0 or 1
        if (1 >= val && val >= 0) {
            _data['active'] = val
        }
    }

    const set = (prop, val) => {
        _data[prop] = val
    }

    

    //log display data
    const show = () => {
        console.log(_data)
    }
    
    //duck initialization function
    const _init = (args) => {
        setName(args['name'])
    }

    const addTask = (task) => {
        //adds a task to the Project List of this Item
        if (_data.list) {
            _data.list.add(task)
        }
        else {
            throw 'This Project has no list property'
        }
    }



    return {
        setType,
        setName,
        setList,
        setActive,
        getProps,
        _init,
        addTask,
        set
    }
}


//Task Factory function
//Task is a 'class'
const Task = (arg) => {
    //inheritance
    const {
        setType,
        getProps,
        setName,
        _init,
        set
    } = Stack()

    //class variables


    const initTask = (args) => {
        setType('Task')
        setName(args.name)
        let defaults = {
            date: new Date(), //needs help from date fns
            description: '(optional description)',
            isComplete: false,
            isPriority: false,
        }
        for (const prop in defaults) {
            const val = args[prop] || defaults[prop]
            //if (prop=='date'){console.log(val)}
            set(prop,val)
          }
    }

    const toggleComplete = () => {
        let toggled = ! getProps().isComplete
        set('isComplete', toggled)
    }

    const showItem = (args) => {
        const obj = getProps()
        for (const prop in obj) {
            console.log(`${obj.name}.${prop} = ${obj[prop]}`);
          }
    }

    const updateTask = (args) => {
        for (const prop in args) {
            set(prop,args[prop])
        }
    }



    initTask(arg)

    return {
        getProps,
        showItem,
        toggleComplete,
        updateTask
    }
}


//Project Factory function
//Project is a 'class'
const Project = (arg) => {
    //inheritance
    const {
        setType,
        setName,
        addTask,
        setList,
        setActive,
        getProps,
        _init,
        set
    } = Stack()

    //class variables

    const initProject = (args) => {
        setType('Project')
        setName(args.name)
        let defaults = {
            active: 0,
            list: TaskList()
        }
        for (const prop in defaults) {
            const val = args[prop] || defaults[prop]
            set(prop,val)
          }
    }

    /*
    const initProject = (args) => {
        setType('Project')
        _init(args)
        setList(TaskList())
        setActive(0)
    }
    */

    const showItem = (args) => {
        //displays a project to console
        console.log(`Project: ${getProps().name}`)
        getProps().list.showList()
    }

   



    initProject(arg)

    return {
        showItem,
        getProps,
        addTask,
        setActive,

    }
}

export { Stack, Project }