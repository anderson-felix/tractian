export const roleTypes = <const>['basic', 'admin', 'owner'];

export type RoleTypes = typeof roleTypes[number];
