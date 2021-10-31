import http from 'k6/http';
import { check } from 'k6';

export let options = {
    scenarios: {
      constant_request_rate: {
        executor: "constant-arrival-rate",
        rate: 10000,
        timeUnit: "1s",
        duration: "2m",
        preAllocatedVUs: 100,
        maxVUs: 300,
      },
    }
  };

export default function () {
    const testUrl = 'http://18.117.99.68:5000/api/author?authorId=9123455';
    // const testUrl = 'http://localhost:5000/api/author?authorId=9120456';
    const response = http.get(testUrl);
    check(response, {
        'response status 200': (r) => r.status === 200,
    });
}
