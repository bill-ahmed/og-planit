import { Subject, Observable } from 'rxjs';

const ENDPOINT = '192.168.0.26:4000/';  // MUST BE YOUR IP ADDRESS ON LOCAL NETWORK!!

export function httpGet(uri: string, body?: any, header?: any): Subject<any> {
    return Observable.create((obs:Subject<any>) => {
        fetch(ENDPOINT+uri, {method: 'GET', headers: header, body: body}).then(
            success => {
                obs.next(success);
            },
            reject => {
                obs.next(reject);
            }
        );
    });
}

export function httpPost(uri: string, body: any, header?: any): Subject<any> {
    console.log(ENDPOINT+uri, header, body);
    return Observable.create((obs:Subject<any>) => {
        console.log("fetch out");
        fetch(ENDPOINT+uri, {method: 'POST', headers: header, body: JSON.stringify(body)}).then(
            success => {
                obs.next(success);
            },
            reject => {
                obs.next(reject);
            }
        );
    });
}