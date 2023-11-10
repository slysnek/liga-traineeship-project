import axios, { AxiosResponse } from 'axios';
import { AddTaskForm, ChangeTaskForm, IGetTasksResponse, IPatchTaskResponse, IPostTaskResponse } from './apiTypes';

export default class Fetcher {
  async getData(url: string): Promise<IGetTasksResponse> {
    try {
      const response: AxiosResponse<IGetTasksResponse> = await axios.get(url);
      return response.data;
    } catch (error) {
      throw new Error();
    }
  }

  async addData(url: string, formData: AddTaskForm): Promise<IPostTaskResponse> {
    try {
      const response: AxiosResponse<IPostTaskResponse> = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
      return response.data;
    } catch (error) {
      throw new Error();
    }
  }

  async changeData(url: string, formData: ChangeTaskForm): Promise<IPatchTaskResponse> {
    try {
      const resource = `${url}/${formData.id}`;
      const response: AxiosResponse<IPatchTaskResponse> = await axios.patch(
        resource,
        {
          info: formData.info,
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

  async deleteData(url: string, id: string): Promise<void> {
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
}
