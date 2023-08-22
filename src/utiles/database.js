import Axios, * as others from 'axios';
import { url } from './String';

export const getExamsList = async() => {
    try {
        const {data} = await Axios.get(`${url}/exams/showexams`);
        return data;
    } catch (error) {
        console.log("error:",error)
        return null
    }
}