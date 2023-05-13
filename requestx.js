/**
 * Use RequestX to interacts with servers in realtime.
 * @module RequestX
 * @author Olawoore Emmanuel Collins
 * @link https://github.com/devbadass
 */

class RequestX extends XMLHttpRequest {


    /**
     * Parameters for making an HTTP request with RequestX
     * @constructor
     * @param {Object} param RequestParameters
     * @param {String} param.url -  Request URL
     * @param {String} param.response_type -  Response Type
     */

    constructor({
        url,
        response_type
    }) {
        super();
        this.url = url;
        this.responseType = response_type
    }

    /**
     * Sets and combines a header in the POST request headers.
     * @param {String} name Header Name
     * @param {String} value Header Value
     */


    setPOSTHeader(name, value) {
        this.open("POST", this.url, true);
        this.setRequestHeader(name, value);
    }

    /**
     * Sets and combines a header in the GET request headers.
     * @param {String} name Header Name
     * @param {String} value Header Value
     */


    setPOSTHeader(name, value) {
        this.open("GET", this.url, true);
        this.setRequestHeader(name, value);
    }

    /**
     * Executes an Error Callback on the Request
     * @param {Function} callback Error Callback
     */

    error(callback) {
        this.onerror = () => {
            callback(this.response)
        }
    }

    /**
     * Executes a POST Request.
     * @param {Object} param
     * @param {Any} data Request Data
     * @param {Function} callback Request Callback
     */

    push(data, callback) {
        if (typeof data === "object") {
            this.data = JSON.stringify(data);
        } else {
            this.data = data;
        }
        this.open("POST", this.url, true);
        this.onload = () => {
            if (this.readyState === 4) {
                if (this.status >= 200 && this.status < 300) {
                    callback(this.response);
                } else {
                    console.log(new Error(`RequestX Error: ${this.status}`));
                }
            }
        }
        this.send(this.data);
    }

    /**
     * Executes a GET Request.
     * @param {Function} callback Request Callback
     */

    pull(callback) {
        this.open("GET", this.url, true);
        this.onload = () => {
            if (this.readyState === 4) {
                if (this.status >= 200 && this.status < 300) {
                    callback(this.response);
                } else {
                    console.log(new Error(`RequestX Error: ${this.status}`));
                }
            }
        }
        this.send();
    }

    /**
     * Executes a FileUpload Request.
     * @param {Object} fileOptions File Options containing file, filename, upload_directory
     * @param {Function} callback Request Callback
     */

    uploadFile(fileOptions, callback) {
        const form_data = new FormData();
        form_data.append("file", fileOptions.file);
        form_data.append("file_name", fileOptions.file_name);
        form_data.append("upload_directory", fileOptions.upload_directory);

        this.onreadystatechange = () => {
            if (this.readyState === 4 && this.status === 200) {
                callback(this.response);
            }
        }
        this.open("POST", this.url, true);
        this.send(form_data);
    }
}

export default RequestX;