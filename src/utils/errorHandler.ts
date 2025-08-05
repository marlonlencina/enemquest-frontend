import { ApiError, AuthErrorCodes, StandardErrorResponse } from '@/types/api';

/**
 * Classe para tratamento padronizado de erros da API
 */
export class ErrorHandler {
  /**
   * Converte uma resposta de erro da API em um ApiError
   */
  static fromApiResponse(error: any): ApiError {
    // Se já for um ApiError, retorna diretamente
    if (error instanceof ApiError) {
      return error;
    }

    // Se for uma resposta padronizada da API
    if (error?.code && error?.message && error?.httpStatus) {
      return new ApiError(error as StandardErrorResponse);
    }

    // Se for um erro do axios
    if (error?.response?.data) {
      const responseData = error.response.data;
      
      // Resposta padronizada
      if (responseData.code && responseData.message && responseData.httpStatus) {
        return new ApiError(responseData as StandardErrorResponse);
      }

      // Resposta antiga (fallback para compatibilidade)
      if (responseData.message) {
        return new ApiError({
          success: false,
          code: 'LEGACY_ERROR',
          message: responseData.message,
          httpStatus: error.response.status || 500
        });
      }
    }

    // Erro genérico de rede
    return new ApiError({
      success: false,
      code: 'NETWORK_ERROR',
      message: error?.message || 'Erro de conexão. Verifique sua internet',
      httpStatus: 500
    });
  }

  /**
   * Verifica se o erro requer logout do usuário
   */
  static requiresLogout(error: ApiError): boolean {
    return error.isErrorCode(AuthErrorCodes.INVALID_TOKEN) ||
           error.isErrorCode(AuthErrorCodes.UNAUTHORIZED_ACCESS);
  }

  /**
   * Verifica se o erro é relacionado a conta Google
   */
  static isGoogleAccountError(error: ApiError): boolean {
    return error.isErrorCode(AuthErrorCodes.GOOGLE_ONLY_ACCOUNT) ||
           error.isErrorCode(AuthErrorCodes.GOOGLE_USER_NOT_FOUND) ||
           error.isErrorCode(AuthErrorCodes.GOOGLE_ACCOUNT_ALREADY_LINKED);
  }

  /**
   * Processa erros de validação Zod
   */
  static getValidationErrors(error: ApiError): Array<{field: string, message: string}> {
    if (error.details?.validationErrors) {
      return error.details.validationErrors;
    }
    return [];
  }

  /**
   * Processa dados do Google em erros específicos
   */
  static getGoogleData(error: ApiError): any {
    return error.details?.googleData || null;
  }
}

/**
 * Hook personalizado para tratamento de erros
 */
export const useErrorHandler = () => {
  const handleError = (error: any) => {
    const apiError = ErrorHandler.fromApiResponse(error);
    
    return {
      error: apiError,
      message: apiError.message, // Usa a mensagem que já vem do backend
      code: apiError.code,
      requiresLogout: ErrorHandler.requiresLogout(apiError),
      isGoogleError: ErrorHandler.isGoogleAccountError(apiError),
      validationErrors: ErrorHandler.getValidationErrors(apiError),
      googleData: ErrorHandler.getGoogleData(apiError),
      isValidationError: apiError.isValidationError()
    };
  };

  /**
   * Aplica erros de validação do servidor no Formik
   */
  const applyValidationErrors = (formik: any, validationErrors: Array<{field: string, message: string}>) => {
    const errors: Record<string, string> = {};
    
    validationErrors.forEach(({ field, message }) => {
      errors[field] = message;
    });
    
    formik.setErrors(errors);
  };

  return { handleError, applyValidationErrors };
};