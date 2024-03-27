import './App.css'
import Report from './components/report/Report.tsx';
import rabobankLogo from './assets/rabobank_logo.png'

function App() {
    return (
        <>
            <img src={rabobankLogo} className="rabobank-logo" alt="Rabobank logo"/>
            <h1>Rabobank Customer Statement Processor</h1>
            <Report/>
        </>
    )
}

export default App
