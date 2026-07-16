import {
	IDataObject,
	IExecuteFunctions,
	IHttpRequestMethods,
	IHttpRequestOptions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	JsonObject,
	NodeApiError,
	NodeConnectionTypes,
	NodeOperationError,
} from 'n8n-workflow';

export class Wizarr implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Wizarr',
		name: 'wizarr',
		icon: { light: 'file:wizarr.svg', dark: 'file:wizarr.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Manage your Wizarr media-server invitations through its API',
		defaults: { name: 'Wizarr' },
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [{ name: 'wizarrApi', required: true }],
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Get Invitations', value: 'getInvitations', action: 'Get many invitations' },
					{ name: 'Get Users', value: 'getUsers', action: 'Get many users' },
				],
				default: 'getInvitations',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const URL_BY_OP: Record<string, string> = {
			getInvitations: '/api/invitations',
			getUsers: '/api/users',
		};

		for (let i = 0; i < items.length; i++) {
			try {
				const credentials = await this.getCredentials('wizarrApi', i);
				const baseURL = (credentials.baseUrl as string).replace(/\/+$/, '');
				const operation = this.getNodeParameter('operation', i) as string;

				const url = URL_BY_OP[operation];
				if (!url) {
					throw new NodeOperationError(this.getNode(), `Unsupported operation: ${operation}`, {
						itemIndex: i,
					});
				}

				const response = await this.helpers.httpRequestWithAuthentication.call(this, 'wizarrApi', {
					method: 'GET' as IHttpRequestMethods,
					baseURL,
					url,
					json: true,
				} as IHttpRequestOptions);

				if (Array.isArray(response)) {
					for (const element of response) {
						returnData.push({ json: element as IDataObject, pairedItem: { item: i } });
					}
				} else {
					returnData.push({ json: response as IDataObject, pairedItem: { item: i } });
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: (error as Error).message }, pairedItem: { item: i } });
					continue;
				}
				throw new NodeApiError(this.getNode(), error as JsonObject, { itemIndex: i });
			}
		}

		return [returnData];
	}
}
