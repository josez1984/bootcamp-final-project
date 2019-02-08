// file-upload.service.js

import * as axios from 'axios';

const BASE_URL = '';

function upload(formData) {
    console.log(formData);
    const url = `${BASE_URL}/api/items/image`;
    return axios.post(url, formData)
        // get data
        .then(x => x.data)
        // add url field
        // .then(x => x.map(img => Object.assign({},
        //     img, { url: `${BASE_URL}/images/${img.id}` })));
}

export { upload }