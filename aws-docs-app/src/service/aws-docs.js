import axios from "axios";
import { getAwsApiUrl } from "../util/url";

export async function getAwsTemplate() {
  try {
    const response = await axios.get(getAwsApiUrl());
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}
