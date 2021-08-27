

export const accessToken = (localStorage.getItem('accessToken'))
export const refreshToken=(localStorage.getItem('refreshToken'))

export const userLoggedIn = accessToken==null||accessToken===undefined || refreshToken==null||refreshToken===undefined ?false:true



