import { Subject, Observable } from 'rxjs';
import globalVariables from '../../../../global';

export function httpGet(uri: string, body?: any, header?: any): Subject<any> {
    return Observable.create((obs:Subject<any>) => {
        fetch(globalVariables.ENDPOINT+uri, {method: 'GET', headers: header, body: body}).then(
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
    return Observable.create((obs:Subject<any>) => {
        fetch(globalVariables.ENDPOINT+uri, {method: 'POST', headers: header, body: JSON.stringify(body)}).then(
            success => {
                obs.next(success);
            },
            reject => {
                obs.next(reject);
            }
        );
    });
}