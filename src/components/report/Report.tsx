import './Report.css'
import React, {useState} from 'react';
import {ReportTransactionRecord} from '../../models/ReportTransactionRecord.ts';
import {validateEndBalance, validateUniqueReferences} from '../../utils/Validators.ts';
import {ErrorType} from '../../enums/ErrorType.ts';
import {processCSV, processXML} from '../../components/report/Processors.ts';

function Report() {
    const FILE_TYPE_CSV: string = 'text/csv';
    const FILE_TYPE_XML: string = 'text/xml';

    const [csvFile, setCsvFile] = useState<string | undefined>(undefined);
    const [xmlFile, setXmlFile] = useState<string | undefined>(undefined);
    const [transactionRecords, setTransactionRecords] = useState<ReportTransactionRecord[] | null>(null);

    const [fileName, setFileName] = useState<string>("");

    const getInvalidRecords = (transactionRecords: TransactionRecord[]): ReportTransactionRecord[] => {
        const reportTransactionRecords: ReportTransactionRecord[] = [];
        transactionRecords.forEach((transactionRecord) => {
            if (transactionRecord.reference) {
                if (!validateUniqueReferences(transactionRecord, transactionRecords)) {
                    reportTransactionRecords.push({
                        reference: transactionRecord.reference,
                        description: transactionRecord.description,
                        errorType: ErrorType.DUPLICATE
                    })
                } else {
                    if (!validateEndBalance(transactionRecord)) {
                        reportTransactionRecords.push({
                            reference: transactionRecord.reference,
                            description: transactionRecord.description,
                            errorType: ErrorType.MUTATION
                        })
                    }
                }
            }
        });
        return reportTransactionRecords;
    }

    const handleOnSubmit = (event: React.MouseEvent) => {
        event.preventDefault()
        let transactionRecords: TransactionRecord[] | null = null
        if (csvFile) {
            transactionRecords = processCSV(csvFile);
        } else if (xmlFile) {
            transactionRecords = processXML(xmlFile)
        }
        if (transactionRecords) {
            setTransactionRecords(getInvalidRecords(transactionRecords))
        }
    }

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        resetState();
        const file = event.target?.files?.[0];
        if (file) {
            const fileReader = new FileReader();
            fileReader.onload = () => {
                const fileContent = fileReader.result as string;
                if (file.type === FILE_TYPE_CSV) {
                    setCsvFile(fileContent)
                    setFileName(file.name)
                } else if (file.type === FILE_TYPE_XML) {
                    setXmlFile(fileContent)
                    setFileName(file.name)
                }
            };
            fileReader.readAsText(file)
        }
    }

    const resetState = () => {
        setTransactionRecords(null)
        setCsvFile(undefined)
        setXmlFile(undefined)
        setFileName("")
    }

    return (
        <>
            <form className="form">
                <label className="form-label">Selected csv or xml file</label>
                <label className="file-input mt-16 mb-16">
                    <input type='file' accept='.csv,.xml' onChange={handleOnChange} hidden/>
                    Choose
                </label>
                <label className="form-label">Selected file</label>
                <span className="file-name mb-16">{fileName ? fileName : "No file selected"}</span>
                <button className="submit-button mb-16" onClick={handleOnSubmit} type='submit'
                        disabled={!(csvFile || xmlFile)}>Validate
                </button>
            </form>
            {transactionRecords && transactionRecords.length > 0 ?
                <table>
                    <thead>
                    <tr>
                        <th>Transaction reference</th>
                        <th>Description</th>
                        <th>Error</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        transactionRecords.map((item, i) => (
                            <tr key={i}>
                                <td>{item.reference}</td>
                                <td>{item.description}</td>
                                <td>{item.errorType}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
                : null}
            {transactionRecords && transactionRecords.length === 0 ?
                <span>All records are valid.</span>
                : null}
        </>
    )
}

export default Report
