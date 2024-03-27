import {describe, expect, it} from 'vitest'
import {validateEndBalance, validateUniqueReferences} from './Validators.ts';

describe('validators', () => {
    it('should be unique', () => {
        //Given
        const transactionRecord1: TransactionRecord = {
            reference: 111111,
            accountNumber: "NL56RAB00000000000",
            description: "Tickets form User",
            startBalance: 13.62,
            mutation: -15.08,
            endBalance: -1.46
        }
        const transactionRecord2: TransactionRecord = {
            reference: 222222,
            accountNumber: "NL56RAB00000000000",
            description: "Tickets form User",
            startBalance: 13.62,
            mutation: -15.08,
            endBalance: -1.46
        }
        const transactionRecords: TransactionRecord[] = [transactionRecord1, transactionRecord2]

        //When
        const result = validateUniqueReferences(transactionRecord1, transactionRecords);
        const expected = true;

        //Then
        expect(result).toEqual(expected)
    })

    it(' should not be unique', () => {
        //Given

        const transactionRecord1: TransactionRecord = {
            reference: 111111,
            accountNumber: "NL56RAB00000000000",
            description: "Tickets form User",
            startBalance: 13.62,
            mutation: -15.08,
            endBalance: -1.46
        }
        const transactionRecord2: TransactionRecord = {
            reference: 111111,
            accountNumber: "NL56RAB00000000000",
            description: "Tickets form User",
            startBalance: 13.62,
            mutation: -15.08,
            endBalance: -1.46
        }
        const transactionRecords: TransactionRecord[] = [transactionRecord1, transactionRecord2]

        //When
        const result = validateUniqueReferences(transactionRecord1, transactionRecords);
        const expected = false;

        //Then
        expect(result).toEqual(expected)
    })

    it('should be validated end balance', () => {
        //Given
        const transactionRecord1: TransactionRecord = {
            reference: 111111,
            accountNumber: "NL56RAB00000000000",
            description: "Tickets form User",
            startBalance: 13.62,
            mutation: -15.08,
            endBalance: -1.46
        }

        //When
        const result = validateEndBalance(transactionRecord1);
        const expected = true;

        //Then
        expect(result).toEqual(expected)
    })

    it('should not be validated end balance', () => {
        //Given
        const transactionRecord1: TransactionRecord = {
            reference: 111111,
            accountNumber: "NL56RAB00000000000",
            description: "Tickets form User",
            startBalance: 13.62,
            mutation: -18.08,
            endBalance: -1.46
        }

        //When
        const result = validateEndBalance(transactionRecord1);
        const expected = false;

        //Then
        expect(result).toEqual(expected)
    })
})