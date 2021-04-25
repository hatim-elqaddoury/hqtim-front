import { environment } from '../../../environments/environment';

export const api = {
    //base back end url, to specify in the index.html 
    envUrl: environment.apiUrl,
    url: window["cfgApiBaseUrl"]
};

export const title = {
    //base back end url, to specify in the index.html 
    value: window["title"]
};
