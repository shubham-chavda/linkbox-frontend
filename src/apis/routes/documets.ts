import { ISimpleInterface } from '../config/simpleInterface';
const { DOC_URL } = process.env;

export default (base: ISimpleInterface) => {
  return {
    uploadDocument(data: any) {
      console.log("data --------->", data);
      return base.create(`document/create`, data);
    },
    // async uploadDocument(data: any) {
    //   // https://b6b4-43-249-234-229.ngrok.io/v1/document/create
    //   return await fetch(`${DOC_URL}document/create`, {
    //     method: 'POST',
    //     // mode: 'cors',
    //     redirect: 'follow',
    //     // credentials: 'include', // Don't forget to specify this if you need cookies
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Access-Control-Allow-Credentials': 'true',
    //       // "Access-Control-Allow-Origin": "*"
    //     },
    //     body: JSON.stringify(data)
    //   }).then(res => res.json()).then(function (data) {
    //     console.log("data -------->", data);
    //     return data;
    //   });
    // }

  };
};