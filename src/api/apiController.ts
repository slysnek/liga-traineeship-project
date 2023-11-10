import Fetcher from './apiFetcher';
import { AddTaskForm, ChangeTaskForm, IGetTasksResponse, IPatchTaskResponse, IPostTaskResponse } from './apiTypes';

export default class Controller {
  url: string;
  dataFetcher: Fetcher;

  constructor(url: string, dataFetcher: Fetcher) {
    this.url = url;
    this.dataFetcher = dataFetcher;
  }

  async getData(): Promise<IGetTasksResponse> {
    const response = await this.dataFetcher.getData(this.url);
    console.log('Getting data:');
    return response;
  }
  async addData(formData: AddTaskForm): Promise<IPostTaskResponse> {
    const response = await this.dataFetcher.addData(this.url, formData);
    console.log('Adding data:');
    return response;
  }
  async changeData(formData: ChangeTaskForm): Promise<IPatchTaskResponse> {
    const response = await this.dataFetcher.changeData(this.url, formData);
    console.log('Changing data:');
    return response;
  }
  async deleteData(id: string): Promise<void> {
    const response = await this.dataFetcher.deleteData(this.url, id);
    console.log('Deleted data.');
    return response;
  }
}
