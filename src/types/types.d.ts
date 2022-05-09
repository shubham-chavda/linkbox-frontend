declare module '*.less' {
	const resource: { [key: string]: string };
	export = resource;
}

declare type SagaType = {
	type: string;
};

declare module "*.svg" {
	const content: any;
	export default content;
	
  }

  declare module "*.png" {
	const content: any;
	export default content;
  }
  declare module 'react-mic';
  declare module 'name-initials';