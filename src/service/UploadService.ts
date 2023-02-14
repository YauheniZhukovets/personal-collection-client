import axios from 'axios';
import {RcFile} from 'antd/es/upload';


export class UploadService {
    static async uploadImage(file: RcFile) {
        const data = new FormData();
        data.append('file', file)
        data.append('upload_preset', 'personal-collection')
        data.append('cloud_name', 'dqndufvke')

        return axios.post('https://api.cloudinary.com/v1_1/dqndufvke/image/upload', data , {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}