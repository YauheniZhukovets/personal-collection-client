import axios from 'axios';
import {RcFile} from 'antd/es/upload';


export class UploadService {
    static async uploadImage(file: RcFile) {
        const data = new FormData();
        data.append('file', file)
        data.append('upload_preset', `${process.env.REACT_APP_UPLOAD_PRESET}`)
        data.append('cloud_name', `${process.env.REACT_APP_CLOUD_NAME}`)

        return axios.post(`${process.env.REACT_APP_UPLOAD_URL}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}