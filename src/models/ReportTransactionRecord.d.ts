import {ErrorType} from '../enums/ErrorType.ts';

type ReportTransactionRecord = {
    reference: number;
    description: string;
    errorType: ErrorType;
}

