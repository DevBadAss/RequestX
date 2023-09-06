/**
 * A custom XMLHttpRequest wrapper for making HTTP requests.
 * @module RequestX
 * @link https://github.com/devbadass
 * @author Olawoore Emmanuel Collins
 */
class RequestX {
    /**
     * Create a RequestX instance.
     * @constructor
     * @param {Object} param - Request parameters
     * @param {String} param.url - Request URL
     * @param {String} param.response_type - Response Type
     */
    constructor({ url, response_type }) {
        /**
         * The URL of the HTTP request.
         * @type {String}
         */
        this.url = url;

        /**
         * The desired response type (e.g., 'json', 'text', etc.).
         * @type {String}
         */
        this.responseType = response_type;

        /**
         * The XMLHttpRequest instance for making requests.
         * @type {XMLHttpRequest}
         */
        this.xhr = new XMLHttpRequest();
    }

    /**
     * Sets and combines a header for the request.
     * @param {String} name - Header Name
     * @param {String} value - Header Value
     */
    setHeader(name, value) {
        this.xhr.setRequestHeader(name, value);
    }

    /**
     * Executes an HTTP request (GET or POST).
     * @param {String} method - HTTP method (GET or POST)
     * @param {Object|String} data - Request Data
     * @param {Function} callback - Request Callback
     * @throws {Error} If the HTTP request encounters an error.
     * @example
     * const request = new RequestX({ url: 'https://api.example.com/data', response_type: 'json' });
     * request.request('GET', null, (response) => {
     *     console.log('Response:', response);
     * });
     */
    request(method, data, callback) {
        this.xhr.open(method, this.url, true);
        this.xhr.responseType = this.responseType;
        this.xhr.onload = () => {
            if (this.xhr.readyState === 4) {
                if (this.xhr.status >= 200 && this.xhr.status < 300) {
                    callback(this.xhr.response);
                } else {
                    console.error(`RequestX Error: ${this.xhr.status}`);
                }
            }
        };

        this.xhr.onerror = () => {
            console.error('RequestX Error: An error occurred.');
        };

        if (method === 'POST') {
            if (typeof data === 'object') {
                data = JSON.stringify(data);
            }
            this.setHeader('Content-Type', 'application/json');
            this.xhr.send(data);
        } else {
            this.xhr.send();
        }
    }

    /**
     * Executes a POST Request.
     * @param {Object|String} data - Request Data
     * @param {Function} callback - Request Callback
     * @throws {Error} If the HTTP request encounters an error.
     * @example
     * const request = new RequestX({ url: 'https://api.example.com/data', response_type: 'json' });
     * request.post({ key: 'value' }, (response) => {
     *     console.log('Response:', response);
     * });
     */
    post(data, callback) {
        this.request('POST', data, callback);
    }

    /**
     * Executes a GET Request.
     * @param {Function} callback - Request Callback
     * @throws {Error} If the HTTP request encounters an error.
     * @example
     * const request = new RequestX({ url: 'https://api.example.com/data', response_type: 'json' });
     * request.get((response) => {
     *     console.log('Response:', response);
     * });
     */
    get(callback) {
        this.request('GET', null, callback);
    }

    /**
     * Executes a File Upload Request.
     * @param {Object} fileOptions - File Options containing file, filename, and upload_directory
     * @param {Function} callback - Request Callback
     * @throws {Error} If the HTTP request encounters an error.
     * @example
     * const request = new RequestX({ url: 'https://api.example.com/upload', response_type: 'json' });
     * const fileOptions = {
     *     file: fileInput.files[0],
     *     file_name: 'example.txt',
     *     upload_directory: '/uploads'
     * };
     * request.uploadFile(fileOptions, (response) => {
     *     console.log('Upload Response:', response);
     * });
     */
    uploadFile(fileOptions, callback) {
        const formData = new FormData();
        formData.append('file', fileOptions.file);
        formData.append('file_name', fileOptions.file_name);
        formData.append('upload_directory', fileOptions.upload_directory);

        this.xhr.onreadystatechange = () => {
            if (this.xhr.readyState === 4 && this.xhr.status === 200) {
                callback(this.xhr.response);
            }
        };

        this.setHeader('Content-Type', 'multipart/form-data');
        this.request('POST', formData, callback);
    }
}

export default RequestX
