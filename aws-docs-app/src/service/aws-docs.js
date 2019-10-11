import axios from "axios";
import { getAwsApiUrl } from "../util/url";

export async function getAwsTemplate() {
  try {
    const response = await axios.get(getAwsApiUrl());
    return response.data;
  } catch (err) {
    console.error(err);
  }
}
