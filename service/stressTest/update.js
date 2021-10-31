import http from 'k6/http';
import { check } from 'k6';
const { generateAuthor } = require('./authorGen.js');

export let options = {
    scenarios: {
        constant_request_rate: {
            executor: "constant-arrival-rate",
            rate: 10000,
            timeUnit: "1s",
            duration: "120s",
            preAllocatedVUs: 100,
            maxVUs: 300,
        },
    }
}

export default function () {
    const testUrl = 'http://3.15.228.199:4095/author';
    const author = JSON.stringify(generateAuthor());
    const response = http.post(testUrl, author, { headers: { 'Content-Type': 'application/json' } });
    check(response, {
        'response status 201': (r) => r.status === 201,
    });
}
