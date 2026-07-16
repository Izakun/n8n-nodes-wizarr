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
					{ name: 'Get Libraries', value: 'getLibraries', action: 'Get many libraries' },
					{ name: 'Get Servers', value: 'getServers', action: 'Get many media servers' },
					{ name: 'Get Status', value: 'getStatus', action: 'Get the instance status' },
					{ name: 'Get Users', value: 'getUsers', action: 'Get many users' },
				],
				default: 'getInvitations',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		// Wizarr list endpoints wrap the array under a named key alongside `count`.
		const ENDPOINT_BY_OP: Record<string, { url: string; key?: string }> = {
			getInvitations: { url: '/api/invitations', key: 'invitations' },
			getLibraries: { url: '/api/libraries', key: 'libraries' },
			getServers: { url: '/api/servers', key: 'servers' },
			getStatus: { url: '/api/status' },
			getUsers: { url: '/api/users', key: 'users' },
		};

		for (let i = 0; i < items.length; i++) {
			try {
				const credentials = await this.getCredentials('wizarrApi', i);
				const baseURL = (credentials.baseUrl as string).replace(/\/+$/, '');
				const operation = this.getNodeParameter('operation', i) as string;

				const endpoint = ENDPOINT_BY_OP[operation];
				if (!endpoint) {
					throw new NodeOperationError(this.getNode(), `Unsupported operation: ${operation}`, {
						itemIndex: i,
					});
				}

				const response = (await this.helpers.httpRequestWithAuthentication.call(
					this,
					'wizarrApi',
					{
						method: 'GET' as IHttpRequestMethods,
						baseURL,
						url: endpoint.url,
						json: true,
					} as IHttpRequestOptions,
				)) as IDataObject;

				const rows = endpoint.key ? (response?.[endpoint.key] as IDataObject[]) : null;
				if (Array.isArray(rows)) {
					for (const element of rows) {
						returnData.push({ json: element, pairedItem: { item: i } });
					}
				} else {
					returnData.push({ json: response, pairedItem: { item: i } });
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
