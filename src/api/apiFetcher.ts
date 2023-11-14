import axios, { AxiosResponse } from 'axios';
import {
  AddTaskQuery,
  ChangeTaskQuery,
  GetFilteredTasksQuery,
  IGetTaskResponse,
  IGetTasksResponse,
  IPatchTaskResponse,
  IPostTaskResponse,
} from './apiTypes';

export default class Fetcher {
  private abortController: AbortController | null = null;

  async getData(url: string, filters: GetFilteredTasksQuery): Promise<IGetTasksResponse> {
    if (this.abortController) {
      this.abortController.abort();
    }

    this.abortController = new AbortController();

    try {
      const response: AxiosResponse<IGetTasksResponse> = await axios.get(url, {
        timeout: 5000,
        params: filters,
        signal: this.abortController.signal,
      });
      return response.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        return [];
      }
    }

    const response: AxiosResponse<IGetTasksResponse> = await axios.get(url, {
      timeout: 5000,
      params: filters,
      signal: this.abortController.signal,
    });
    return response.data;
  }

  async addData(url: string, formData: AddTaskQuery): Promise<IPostTaskResponse> {
    try {
      const response: AxiosResponse<IPostTaskResponse> = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error();
    }
  }

  async changeData(url: string, formData: ChangeTaskQuery): Promise<IPatchTaskResponse> {
    try {
      const resource = `${url}/${formData.id}`;
      const response: AxiosResponse<IPatchTaskResponse> = await axios.patch(
        resource,
        {
          name: formData.name,
          info: formData.info,
          isCompleted: formData.isCompleted,
          isImportant: formData.isImportant,
        },
        {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error();
    }
  }

  async deleteData(url: string, id: number): Promise<void> {
    try {
      const resource = `${url}/${id}`;
      const response: AxiosResponse<void> = await axios.delete(resource);
      if (!(response.status === 200)) {
        throw new Error("Task doesn't exist");
      }
    } catch (error) {
      throw new Error();
    }
  }

  async getDataById(url: string, id: number): Promise<IGetTaskResponse> {
    try {
      const resource = `${url}/${id}`;
      const response: AxiosResponse<IGetTaskResponse> = await axios.get(resource);
      return response.data;
    } catch (error) {
      throw new Error();
    }
  }
}
