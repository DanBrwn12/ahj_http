const createRequest = async (options = {}) => {
    // const { url, method = 'GET', data = null} = options;
    const url = options.url;
    let method = options.method;
    const data = options.data;

    if (method === undefined) {
        method = 'GET';
    }

    const config = {
        method,
    };

    if (data) {
        config.headers = { 'Content-Type': 'application/json' };;
        config.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(url, config);

        if (response.status === 204) {
            return null;
        }

        return await response.json();
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default createRequest;
