import {describe, expect, it} from 'vitest'
import {processCSV, processXML} from './Processors.ts';

describe('validators', () => {
    it('processCSV should be returning list with transaction records', () => {
        //Given
        const csvFile: string = `Reference,Account Number,Description,Start Balance,Mutation,End Balance
111111,NL56RAB00000000000,Tickets form User,94.9,+14.63,108.53
222222,NL56RAB00000000000,Tickets form User,5429,-939,6368`;

        const transactionRecord1: TransactionRecord = {
            reference: 111111,
            accountNumber: "NL56RAB00000000000",
            description: "Tickets form User",
            startBalance: 94.9,
            mutation: +14.63,
            endBalance: 108.53
        }
        const transactionRecord2: TransactionRecord = {
            reference: 222222,
            accountNumber: "NL56RAB00000000000",
            description: "Tickets form User",
            startBalance: 5429,
            mutation: -939,
            endBalance: 6368
        }
        const transactionRecords: TransactionRecord[] = [transactionRecord1, transactionRecord2]

        //When
        const result = processCSV(csvFile);
        const expected = transactionRecords;

        //Then
        expect(result?.length).toEqual(2)
        expect(result).toEqual(expected)
    })

    it('processCSV should be returning null', () => {
        //Given
        const csvFile: string = "";

        //When
        const result = processCSV(csvFile);
        const expected = null;

        //Then
        expect(result).toEqual(null)
        expect(result).toEqual(expected)
    })

    it('processXML should be returning list with transaction records', () => {
        //Given
        const xmlFile: string = `
        <records>
            <record reference="111111">
                <accountNumber>NL56RAB00000000000</accountNumber>
                <description>Tickets form User</description>
                <startBalance>94.9</startBalance>
                <mutation>+14.63</mutation>
                <endBalance>108.53</endBalance>
            </record>
            <record reference="222222">
                <accountNumber>NL56RAB00000000000</accountNumber>
                <description>Tickets form User</description>
                <startBalance>5429</startBalance>
                <mutation>-939</mutation>
                <endBalance>6368</endBalance>
            </record>
        </records>`;

        const transactionRecord1: TransactionRecord = {
            reference: 111111,
            accountNumber: "NL56RAB00000000000",
            description: "Tickets form User",
            startBalance: 94.9,
            mutation: +14.63,
            endBalance: 108.53
        }
        const transactionRecord2: TransactionRecord = {
            reference: 222222,
            accountNumber: "NL56RAB00000000000",
            description: "Tickets form User",
            startBalance: 5429,
            mutation: -939,
            endBalance: 6368
        }
        const transactionRecords: TransactionRecord[] = [transactionRecord1, transactionRecord2]

        //When
        const result = processXML(xmlFile);
        const expected = transactionRecords;

        //Then
        expect(result?.length).toEqual(2)
        expect(result).toEqual(expected)
    })

    it('processXML should be returning null', () => {
        //Given
        const xmlFile: string = "";

        //When
        const result = processXML(xmlFile);
        const expected = null;

        //Then
        expect(result).toEqual(null)
        expect(result).toEqual(expected)
    })


})