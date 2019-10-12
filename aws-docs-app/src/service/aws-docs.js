import axios from "axios";
import { getAwsApiUrl } from "../util/url";

export const getAwsTemplate = async ()  => {
  try {
    const links  = await axios.get(getAwsApiUrl());
    return links.data
  } catch (err) {
    console.error(err);
  }
}

export const downloadDocs=  (docId) => {
  try {
    axios({
      url: getAwsApiUrl()+`/download/${docId}`,
      method: 'GET',
      responseType: 'blob', // important
    })
      .then((blob) => {

        // 2. Create blob link to download
        const url = window.URL.createObjectURL(new Blob([blob.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${docId}`);
        // 3. Append to html page
        document.body.appendChild(link);
        // 4. Force download
        link.click();
        // 5. Clean up and remove the link
        link.parentNode.removeChild(link);
      })
      .catch(err => {
        throw err
      });

  } catch (err) {
    console.error(err);
  }
}

export const uploadDocument = (formData) => {
  return axios.post(getAwsApiUrl(), formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
    .then(response => {
      return "Done !"
    })
    .catch(err => {
      throw err
    })
}

export const openDoc =  async (docName) => {
  try {
    const docData =  await axios.get(
      getAwsApiUrl()+`/download/${docName}`
    )
    return docData.data;

  } catch (err) {
    console.error(err);
  }
}
