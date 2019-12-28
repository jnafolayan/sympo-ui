let baseURL;
const env = process.env.NODE_ENV;

if (env == "production")
  baseURL = "";
else
  baseURL = "http://localhost:8080/api/v1";

export default function prefixAPI(url) {
  return baseURL + url;
}