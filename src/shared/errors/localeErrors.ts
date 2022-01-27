export type LocaleErrorType =
  | 'userNotFound'
  | 'operationNotPermitted'
  | 'userAlreadyExists'
  | 'emailAlreadyExists'
  | 'userNotAuthorized'
  | 'companyNotFound'
  | 'unitNotFound'
  | 'assetNotFound'
  | 'healthInvalid';

export const localeErrorLanguage = <const>['pt', 'en'];

export type LocaleErrorLanguage = typeof localeErrorLanguage[number];

export const defaultLocaleErrorLanguage: LocaleErrorLanguage = 'pt';

export type LocaleErrorMessage = Record<LocaleErrorLanguage, string>;

export type LocaleErrorObject = {
  status: number;
  message: LocaleErrorMessage;
};

export const localeErrors: Record<LocaleErrorType, LocaleErrorObject> = {
  userNotFound: {
    status: 404,
    message: {
      pt: 'Usuário não encontrado',
      en: 'User not found',
    },
  },
  userNotAuthorized: {
    status: 401,
    message: {
      pt: 'Usuário não autorizado',
      en: 'User not authorized',
    },
  },
  operationNotPermitted: {
    status: 403,
    message: {
      pt: 'Operação não permitida',
      en: 'Operation not permitted',
    },
  },
  userAlreadyExists: {
    status: 403,
    message: {
      pt: 'Usuário já cadastrado',
      en: 'User already exists',
    },
  },
  emailAlreadyExists: {
    status: 403,
    message: {
      pt: 'Este email já existe',
      en: 'This email already exists',
    },
  },
  companyNotFound: {
    status: 404,
    message: {
      pt: 'Empresa não encontrada',
      en: 'Company not found',
    },
  },
  unitNotFound: {
    status: 404,
    message: {
      pt: 'Unidade não encontrada',
      en: 'Unit not found',
    },
  },
  assetNotFound: {
    status: 404,
    message: {
      pt: 'Ativo não encontrado',
      en: 'Asset not found',
    },
  },
  healthInvalid: {
    status: 400,
    message: {
      pt: 'A saúde deve estar entre 0% e 100%',
      en: 'Health must be between 0% and 100%',
    },
  },
};
