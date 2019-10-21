const apiCall = async (route, type, data, token=null) => {
    try {
        const config = {
            method: type,
            baseURL: 'http://localhost:8002/',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
        };

        if (type !== 'get') {
            config.body = JSON.stringify(data);
        }

        const url = `${config.baseURL}${route}`;
        const response = await fetch(url, config);
        const updatedData = await response.json();
        if (response.ok) {
            return updatedData
        } else {
            return updatedData

        }
    } catch (err) {
        return new Error (err);
    }
};

export const authAPI = {
    getUser (token) {
        return apiCall('users', 'get', null, token)
    },
    signIn (data) {
        return apiCall('users/login', 'post', data)
    },
    signUp (data) {
        return apiCall('users/add', 'post', data)
    },
    token: '',
    setToken: (token) => {
        this.token = token
    }
};