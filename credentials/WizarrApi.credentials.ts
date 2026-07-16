import { IAuthenticateGeneric, ICredentialType, INodeProperties } from 'n8n-workflow';

export class WizarrApi implements ICredentialType {
	name = 'wizarrApi';

	displayName = 'Wizarr API';

	icon = 'file:wizarrApi.svg' as const;

	documentationUrl = 'https://docs.wizarr.dev/';

	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'http://wizarr:5690',
			required: true,
			description: 'Base URL of the Wizarr instance (e.g. http://wizarr:5690). No trailing slash.',
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description: 'Wizarr API key (Settings → API Keys)',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-API-Key': '={{$credentials.apiKey}}',
			},
		},
	};
}
