import { Subject } from 'rxjs';

export function httpGet(uri: string, body?: any, header?: any): Subject<any> {
    return Subject.create(sub => {
        fetch(uri, {method: 'GET', headers: header, body: body}).then(
            success => {
                sub.next(success);
            },
            reject => {
                sub.next(null);
            }
        );
    });
}

export function httpPost(uri: string, body: any, header?: any): Subject<any> {
    return Subject.create(sub => {
        fetch(uri, {method: 'POST', headers: header, body: body}).then(
            success => {
                sub.next(success);
            },
            reject => {
                sub.next(null);
            }
        );
    });
}