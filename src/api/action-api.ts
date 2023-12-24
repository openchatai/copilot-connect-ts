import axios, { AxiosResponse } from 'axios';
import { GetActionsRequest, GetActionsResponse, GetActionRequest, GetActionResponse, AddActionRequest, Action } from '../models';

export class ActionApi {
  private backendBase: string;

  constructor(baseUrl: string) {
    this.backendBase = baseUrl;
  }

  private async makeRequest<T>(url: string, method: 'get' | 'post', data?: any): Promise<T> {
    try {
      const response: AxiosResponse<T> =
        method === 'get'
          ? await axios.get(url)
          : await axios.post(url, data);

      return response.data;
    } catch (error: any) {
      console.error(`Error making ${method.toUpperCase()} request:`, error);
      throw error;
    }
  }

  public async getActions(request: GetActionsRequest): Promise<Action[]> {
    const url = `${this.backendBase}/actions/bot/${request.chatbot_id}`;
    return this.makeRequest<Action[]>(url, 'get');
  }

  public async getAction(request: GetActionRequest): Promise<GetActionResponse> {
    const url = `${this.backendBase}/actions/p/${request.action_id}`;
    return this.makeRequest<GetActionResponse>(url, 'get');
  }

  public async addAction(request: AddActionRequest): Promise<string[]> {
    const {bot_id, ...rest} = request;
    const url = `${this.backendBase}/actions/bot/${bot_id}`;
    return this.makeRequest<string[]>(url, 'post', rest);
  }
}

// // Example usage:
// const backendBase = 'YOUR_BACKEND_BASE_URL';
// const actions = new Actions(backendBase);

// // Now you can call the methods on the actions instance
// const actionsResponse = await actions.getActions({ chatbot_id: '123' });
// const actionResponse = await actions.getAction({ action_id: '456' });
// const addActionResponse = await actions.addAction({ bot_id: '789', /* other properties */ });

