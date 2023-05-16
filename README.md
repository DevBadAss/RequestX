# RequestX

`RequestX` is a JavaScript module that provides a simplified interface for making HTTP requests and interacting with servers in real-time. It extends the `XMLHttpRequest` class and adds additional methods to handle common use cases like sending POST requests, handling errors, and uploading files.

## Installation

To use `RequestX` in your project, you can include the module in your code:

### Import as a module

```javascript

import RequestX from 'path/to/requestx.js';

```

## Usage

Create an instance with the desired request parameters:

```javascript

const request = new RequestX({

  url: 'https://api.example.com',

  response_type: 'json'

});

```

### Sending a POST Request 

To send a POST request, use the `push` method:

```javascript

const data = { name: 'John', age: 30 };

request.push(data, response => {

  console.log(response);

});

```

### Sending a GET Request

To send a GET request, use the `pull` method:

```javascript

request.pull(response => {

  console.log(response);

});

```

### Setting Headers

To set custom headers for a request, use the `setRequestHeader` method:

```javascript

request.open("POST", request.url, true);

request.setRequestHeader('Content-Type', 'application/json');

```

### Handling Errors

To handle errors, use the error method:

```javascript

request.error(response => {

  console.log('Error:', response);

});

```

### Uploading a File

To upload a file, use the `uploadFile` method:

```javascript

const fileOptions = {

  file: fileInput.files[0],

  file_name: 'example.jpg',

  upload_directory: 'uploads/'

};

request.uploadFile(fileOptions, response => {

  console.log(response);

});

```

## Authors

- [@DevBadAss](https://www.github.com/devbadass)

## License

This project is licensed under the [MIT Licence](https://choosealicense.com/licenses/mit/)

