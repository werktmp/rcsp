/**
 * @name validateUniqueReferences
 *
 * @description
 * Validates that the references is unique.
 *
 * @returns {boolean} Validation result.
 * @param transactionRecord TransactionRecord.
 * @param transactionRecords TransactionRecord[].
 */
export const validateUniqueReferences = (transactionRecord: TransactionRecord, transactionRecords: TransactionRecord[]): boolean => {
    return transactionRecords.filter(tr => tr.reference === transactionRecord.reference).length === 1;
}

/**
 * @name validateEndBalance
 *
 * @description
 * Validates that the end balance is valid.
 *
 * @returns {boolean} Validation result.
 * @param transactionRecord TransactionRecord.
 */
export const validateEndBalance = (transactionRecord: TransactionRecord): boolean => {
    const expected = Number(transactionRecord.endBalance.toFixed(2));
    const result = Number((transactionRecord.startBalance + transactionRecord.mutation).toFixed(2));
    return result === expected;
}