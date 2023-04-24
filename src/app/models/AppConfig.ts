export interface AppConfig {
	openLastView: boolean,
	lastview: string,
	theme: string
}
export const defaultAppConfig: AppConfig = {
	openLastView: false,
	lastview: "",
	theme: "theme-default"
}
