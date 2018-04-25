import axios from 'axios';
import { URL_API } from '../constants/url-constant';
import { TOKEN_NEWS } from '../constants/token-constant';

export const getNews = () => {
    try {
        const results = axios.get(URL_API, {
            params: {
                sources: 'techcrunch',
                apiKey: TOKEN_NEWS
            }
        });

        return {
            type: 'GET_NEWS',
            payload: results
        };
    } catch (error) {
        console.log('[NEW ACITIONS] RESULT NEWS ERROR', error);
        return {
            type: 'GET_NEWS',
            payload: []
        };
    }
}