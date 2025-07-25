// Tipos para erros padronizados da API
export interface StandardErrorResponse {
  success: false;
  code: string;
  message: string;
  httpStatus: number;
  details?: any;
}

export interface SuccessResponse<T = any> {
  success: true;
  message: string;
  data?: T;
}

export type ApiResponse<T = any> = SuccessResponse<T> | StandardErrorResponse;

// Códigos de erro específicos
export enum AuthErrorCodes {
  // Validação (400)
  MISSING_FIELDS = 'AUTH_001',
  INVALID_EMAIL_FORMAT = 'AUTH_002', 
  INVALID_PASSWORD_FORMAT = 'AUTH_003',
  INVALID_USERNAME_FORMAT = 'AUTH_004',
  INVALID_PHONE_FORMAT = 'AUTH_005',
  INVALID_DATE_FORMAT = 'AUTH_006',
  MISSING_TOKEN = 'AUTH_007',
  MISSING_GOOGLE_TOKEN = 'AUTH_008',

  // Autenticação (401)
  INVALID_CREDENTIALS = 'AUTH_101',
  INVALID_TOKEN = 'AUTH_102',
  GOOGLE_TOKEN_INVALID = 'AUTH_103',
  UNAUTHORIZED_ACCESS = 'AUTH_104',
  GOOGLE_ONLY_ACCOUNT = 'AUTH_106',

  // Recursos não encontrados (404)
  USER_NOT_FOUND = 'AUTH_201',
  GOOGLE_USER_NOT_FOUND = 'AUTH_202',

  // Conflitos (409)
  EMAIL_ALREADY_EXISTS = 'AUTH_301',
  USERNAME_ALREADY_EXISTS = 'AUTH_302',
  PHONE_ALREADY_EXISTS = 'AUTH_303',
  GOOGLE_ACCOUNT_ALREADY_LINKED = 'AUTH_304',

  // Erros internos (500)
  INTERNAL_SERVER_ERROR = 'AUTH_501',
  DATABASE_ERROR = 'AUTH_502',
  JWT_GENERATION_ERROR = 'AUTH_503',
  GOOGLE_API_ERROR = 'AUTH_504',
  PASSWORD_HASH_ERROR = 'AUTH_505',

  // Validação Zod
  VALIDATION_ERROR = 'VALIDATION_001'
}

// Interface para erro customizado
export class ApiError extends Error {
  public readonly code: string;
  public readonly httpStatus: number;
  public readonly details?: any;

  constructor(errorResponse: StandardErrorResponse) {
    super(errorResponse.message);
    this.code = errorResponse.code;
    this.httpStatus = errorResponse.httpStatus;
    this.details = errorResponse.details;
    this.name = 'ApiError';
  }

  // Método para verificar se é um erro específico
  isErrorCode(code: AuthErrorCodes): boolean {
    return this.code === code;
  }

  // Método para verificar se é erro de validação
  isValidationError(): boolean {
    return this.code === AuthErrorCodes.VALIDATION_ERROR || this.code.startsWith('AUTH_00');
  }

  // Método para verificar se é erro de autenticação
  isAuthError(): boolean {
    return this.code.startsWith('AUTH_10');
  }

  // Método para verificar se é erro de conflito
  isConflictError(): boolean {
    return this.code.startsWith('AUTH_30');
  }
}