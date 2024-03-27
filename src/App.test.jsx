import {render, screen} from '@testing-library/react'
import App from './App'
import {describe, it} from 'vitest'

describe('App', () => {

    it('Check if alle component are rendered', async () => {
        render(<App/>)
        expect(screen.getByText("Rabobank Customer Statement Processor")).toBeTruthy();
        expect(screen.getByText("Selected csv or xml file")).toBeTruthy();
        expect(screen.getByText("Selected file")).toBeTruthy();
        expect(screen.getByText("No file selected")).toBeTruthy();
    })


})