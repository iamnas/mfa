
import api from './api'



export const register = async (username: string, email: string, password: string) => {
    const response = await api.post('/auth/register', { email, name: username, password })
    return response.data
}

export const loginUser = async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password }, {
        withCredentials: true,
    })
    return response.data
}

export const logoutUser = async () => {
    const response = await api.post('/auth/logout', {}, {
        withCredentials: true,
    })
    return response.data
}

export const authStatus = async () => {
    const response = await api.get('/auth/status', {
        withCredentials: true,
    })
    return response.data
}


//2FA
export const setup2FA = async () => {
    const response = await api.post('/auth/2fa/setup', {}, {
        withCredentials: true,
    })
    return response.data
}

export const verify2FA = async (token: string) => {
    const response = await api.post('/auth/2fa/verify', { token }, {
        withCredentials: true,
    })
    return response.data
}

export const reset2FA = async () => {
    const response = await api.post('/auth/2fa/reset', {}, {
        withCredentials: true,
    })
    return response.data
}