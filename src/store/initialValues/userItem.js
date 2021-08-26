

export const token = (localStorage.getItem('token'))
export const userLoggedIn = token==null||token===undefined?false:true