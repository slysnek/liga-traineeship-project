import axios, { AxiosResponse } from 'axios';
import {
  AddTaskQuery,
  ChangeTaskQuery,
  GetFilteredTasksQuery,
  GetTaskResponse,
  GetTasksResponse,
  PatchTaskResponse,
  PostTaskResponse,
} from 'api/apiTypes';

export default class Fetcher {
  private abortController: AbortController | null = null;

  async getData(url: string, filters: GetFilteredTasksQuery): Promise<GetTasksResponse> {
    if (this.abortController) {
      this.abortController.abort();
    }

    this.abortController = new AbortController();

    try {
      const response: AxiosResponse<GetTasksResponse> = await axios.get(url, {
        timeout: 5000,
        params: filters,
        signal: this.abortController.signal,
      });
      return response.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        return [];
      } else {
        throw new Error();
      }
    }
  }

  async addData(url: string, formData: AddTaskQuery): Promise<PostTaskResponse> {
    try {
      const response: AxiosResponse<PostTaskResponse> = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch {
      throw new Error();
    }
  }

  async changeData(url: string, formData: ChangeTaskQuery): Promise<PatchTaskResponse> {
    try {
      const resource = `${url}/${formData.id}`;
      const response: AxiosResponse<PatchTaskResponse> = await axios.patch(
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
    } catch {
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
    } catch {
      throw new Error();
    }
  }

  async getDataById(url: string, id: number): Promise<GetTaskResponse> {
    try {
      const resource = `${url}/${id}`;
      const response: AxiosResponse<GetTaskResponse> = await axios.get(resource);
      return response.data;
    } catch {
      throw new Error();
    }
  }
}
