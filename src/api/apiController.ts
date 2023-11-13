import Fetcher from './apiFetcher';
import {
  AddTaskQuery,
  ChangeTaskQuery,
  GetFilteredTasksQuery,
  IGetTaskResponse,
  IGetTasksResponse,
  IPatchTaskResponse,
  IPostTaskResponse,
} from './apiTypes';

export default class Controller {
  url: string;
  dataFetcher: Fetcher;

  constructor(url: string, dataFetcher: Fetcher) {
    this.url = url;
    this.dataFetcher = dataFetcher;
  }

  async getData(filters: GetFilteredTasksQuery): Promise<IGetTasksResponse> {
    const response = await this.dataFetcher.getData(this.url, filters);
    return response;
  }
  async getDataById(id: number): Promise<IGetTaskResponse> {
    const response = await this.dataFetcher.getDataById(this.url, id);
    return response;
  }
  async addData(formData: AddTaskQuery): Promise<IPostTaskResponse> {
    const response: IPostTaskResponse = await this.dataFetcher.addData(this.url, formData);
    return response;
  }
  async changeData(formData: ChangeTaskQuery): Promise<IPatchTaskResponse> {
    const response = await this.dataFetcher.changeData(this.url, formData);
    return response;
  }
  async deleteData(id: number): Promise<void> {
    const response = await this.dataFetcher.deleteData(this.url, id);
    return response;
  }
}
