import http from "k6/http";
import { check } from "k6";

export const options = {
  stages: [
    { duration: "15s", target: 50  },
    { duration: "15s", target: 0   },
  ],
  thresholds: {
    http_req_duration: ["p(95)<500", "p(99)<1000"],
    http_req_failed: ["rate<0.01"],
  },
};

const BASE_URL = __ENV.BASE_URL || "http://localhost:3000";

export default function () {
  const res = http.get(`${BASE_URL}/api/users/stats`);
  check(res, { "status is 200": (r) => r.status === 200 });
}
