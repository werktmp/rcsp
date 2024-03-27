import {describe, expect, it} from 'vitest'
import {processCSV, processXML} from './Processors.ts';

describe('validators', () => {
    it('processCSV should be returning list with transaction records', () => {
        //Given
        const csvFile: string = `Reference,Account Number,Description,Start Balance,Mutation,End Balance
        111111,NL56RAB00000000000,Tickets form User,33.34,+5.55,38.89
        222222,NL56RAB00000000000,Tickets form User,33.34,+5.55,38.89`;

        const transactionRecord1: TransactionRecord = {
            reference: 111111,
            accountNumber: "NL56RAB00000000000",
            description: "Tickets form User",
            startBalance: 33.34,
            mutation: +5.55,
            endBalance: 38.89
        }
        const transactionRecord2: TransactionRecord = {
            reference: 222222,
            accountNumber: "NL56RAB00000000000",
            description: "Tickets form User",
            startBalance: 33.34,
            mutation: +5.55,
            endBalance: 38.89
        }
        const transactionRecords: TransactionRecord[] = [transactionRecord1, transactionRecord2]

        //When
        const result = processCSV(csvFile);
        const expected = transactionRecords;

        console.log(result)

        //Then
        expect(result).toEqual(expected)
    })

    it('processCSV should be returning null', () => {
        //Given
        const csvFile: string = "";

        //When
        const result = processCSV(csvFile);
        const expected = null;

        //Then
        expect(result).toEqual(expected)
    })

    it('processXML should be returning list with transaction records', () => {
        //Given
        const xmlFile: string = `
        <records>
          <record reference="111111">
            <accountNumber>NL56RAB00000000000</accountNumber>
            <description>Tickets form User</description>
            <startBalance>33.34</startBalance>
            <mutation>+5.55</mutation>
            <endBalance>38.89</endBalance>
          </record>
          <record reference="222222">
            <accountNumber>NL56RAB00000000000</accountNumber>
            <description>Tickets form User</description>
            <startBalance>33.34</startBalance>
            <mutation>+5.55</mutation>
            <endBalance>38.89</endBalance>
          </record>
        </records>`;

        const transactionRecord1: TransactionRecord = {
            reference: 111111,
            accountNumber: "NL56RAB00000000000",
            description: "Tickets form User",
            startBalance: 33.34,
            mutation: +5.55,
            endBalance: 38.89
        }
        const transactionRecord2: TransactionRecord = {
            reference: 222222,
            accountNumber: "NL56RAB00000000000",
            description: "Tickets form User",
            startBalance: 33.34,
            mutation: +5.55,
            endBalance: 38.89
        }
        const transactionRecords: TransactionRecord[] = [transactionRecord1, transactionRecord2]

        //When
        const result = processXML(xmlFile);
        const expected = transactionRecords;

        console.log(result)

        //Then
        expect(result).toEqual(expected)
    })

    it('processXML should be returning null', () => {
        //Given
        const xmlFile: string = "";

        //When
        const result = processXML(xmlFile);
        const expected = null;

        //Then
        expect(result).toEqual(expected)
    })


})