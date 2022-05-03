import { ISimpleInterface } from '../config/simpleInterface';

export default (base: ISimpleInterface) => {
  return {
    uploadDocument(data: any) {
      return base.create(`document/create`, data, undefined, 'multipart/form-data');
    },
    getDocumentsList(data: any) {
      return base.detail(`document/list?order=${data.sortBy}&page=${data.pageNo}&take=${10}`);
    },
  };
};