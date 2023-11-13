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
    console.log('Getting filtered data:');
    return response;
  }
  async getDataById(id: number): Promise<IGetTaskResponse> {
    const response = await this.dataFetcher.getDataById(this.url, id);
    console.log('Getting filtered data:');
    return response;
  }
  async addData(formData: AddTaskQuery): Promise<IPostTaskResponse> {
    const response: IPostTaskResponse = await this.dataFetcher.addData(this.url, formData);
    console.log('Adding data:');
    return response;
  }
  async changeData(formData: ChangeTaskQuery): Promise<IPatchTaskResponse> {
    const response = await this.dataFetcher.changeData(this.url, formData);
    console.log('Changing data:');
    return response;
  }
  async deleteData(id: number): Promise<void> {
    const response = await this.dataFetcher.deleteData(this.url, id);
    console.log('Deleted data.');
    return response;
  }
}
