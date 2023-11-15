import {
  GetFilteredTasksQuery,
  GetTasksResponse,
  GetTaskResponse,
  AddTaskQuery,
  PostTaskResponse,
  ChangeTaskQuery,
  PatchTaskResponse,
} from 'api/apiTypes';
import Fetcher from 'api/apiFetcher';

export default class Controller {
  url: string;
  dataFetcher: Fetcher;

  constructor(url: string, dataFetcher: Fetcher) {
    this.url = url;
    this.dataFetcher = dataFetcher;
  }

  async getData(filters: GetFilteredTasksQuery): Promise<GetTasksResponse> {
    const response = await this.dataFetcher.getData(this.url, filters);
    return response;
  }
  async getDataById(id: number): Promise<GetTaskResponse> {
    const response = await this.dataFetcher.getDataById(this.url, id);
    return response;
  }
  async addData(formData: AddTaskQuery): Promise<PostTaskResponse> {
    const response: PostTaskResponse = await this.dataFetcher.addData(this.url, formData);
    return response;
  }
  async changeData(formData: ChangeTaskQuery): Promise<PatchTaskResponse> {
    const response = await this.dataFetcher.changeData(this.url, formData);
    return response;
  }
  async deleteData(id: number): Promise<void> {
    const response = await this.dataFetcher.deleteData(this.url, id);
    return response;
  }
}
