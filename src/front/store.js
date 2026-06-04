const savedToken = sessionStorage.getItem("token")
const savedUser = (() => {
	try {
		return JSON.parse(sessionStorage.getItem("user"))
	} catch {
		return null
	}
})()

export const initialStore=()=>{
  return{
    message: null,
    token: savedToken || null,
    user: savedUser || null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ]
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'set_hello':
      return {
        ...store,
        message: action.payload
      };

    case 'set_token':
      return {
        ...store,
        token: action.payload
      };

    case 'set_user':
      return {
        ...store,
        user: action.payload
      };

    case 'logout':
      sessionStorage.removeItem("token")
      sessionStorage.removeItem("user")
      return {
        ...store,
        token: null,
        user: null
      };
      
    case 'add_task':

      const { id,  color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };
    default:
      throw Error('Unknown action.');
  }    
}
