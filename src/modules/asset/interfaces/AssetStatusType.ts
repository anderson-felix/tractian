export const assetStatusType = <const>['running', 'alerting', 'stopped'];

export type AssetStatusType = typeof assetStatusType[number];
