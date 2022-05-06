import { ISimpleInterface } from '../config/simpleInterface';

export default (base: ISimpleInterface) => {
  return {
    uploadDocument(data: any) {
      return base.create(`document/create`, data, undefined, 'multipart/form-data');
    },
    getDocumentsList(data: any) {
      return base.detail(`document/list?order=${data.sortBy}&page=${data.pageNo}&take=${10}`);
    },
    getDocumentsListBySearch(data: any) {
      return base.detail(`document/list?order=${data.sortBy}&page=${data.pageNo}&take=${10}&q=${data.q}`);
    },
    getDocumentInfo(uuid: string) {
      return base.detail(`document/info/${uuid}`);
    },
    updateDocumentInfo(payload: any) {
      return base.edit(`document/update/${payload.uuid}`, payload);
    }
  };
};