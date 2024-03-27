const DELIMITER: string = ',';
/**
 * @name processCSV
 *
 * @description
 * Convert CSV File string to TransactionRecord objects
 *
 * @returns {TransactionRecord[]} TransactionRecord[].
 * @param csvFile string.
 */
export const processCSV = (csvFile: string): TransactionRecord[] | null => {
    if (!csvFile) {
        return null;
    }
    const headers = csvFile.slice(0, csvFile.indexOf('\n')).split(DELIMITER);
    const rows = csvFile.slice(csvFile.indexOf('\n') + 1).split('\n');
    return rows.map(row => {
        const values = row.split(DELIMITER);
        const eachObject: TransactionRecord = headers.reduce((transactionRecord, header, index) => {
            if (header.toLowerCase() === "reference") {
                transactionRecord.reference = Number(values[index]);
            } else if (header.toLowerCase().trim() === "account number") {
                transactionRecord.accountNumber = values[index];
            } else if (header.toLowerCase().trim() === "description") {
                transactionRecord.description = values[index];
            } else if (header.toLowerCase().trim() === "start balance") {
                transactionRecord.startBalance = Number(values[index]);
            } else if (header.toLowerCase().trim() === "mutation") {
                transactionRecord.mutation = Number(values[index]);
            } else if (header.toLowerCase().trim() === "end balance") {
                transactionRecord.endBalance = Number(values[index]);
            }
            return transactionRecord;
        }, {} as TransactionRecord)
        return eachObject;
    })
}

/**
 * @name processXML
 *
 * @description
 * Convert XML File string to TransactionRecord objects
 *
 * @returns {TransactionRecord[]} TransactionRecord[].
 * @param xmlFile string.
 */
export const processXML = (xmlFile: string): TransactionRecord[] | null => {
    if (!xmlFile) {
        return null;
    }

    const parser = new DOMParser();
    const document = parser.parseFromString(xmlFile, "application/xml");
    const records = document.getElementsByTagName('record');

    return Array.prototype.map.call(records, (record): TransactionRecord => {
        return {
            reference: Number(record.getAttribute('reference')),
            accountNumber: record.getElementsByTagName('accountNumber')[0].textContent,
            description: record.getElementsByTagName('description')[0].textContent,
            startBalance: Number(record.getElementsByTagName('startBalance')[0].textContent),
            mutation: Number(record.getElementsByTagName('mutation')[0].textContent),
            endBalance: Number(record.getElementsByTagName('endBalance')[0].textContent),
        }
    }) as TransactionRecord[] | null;

}