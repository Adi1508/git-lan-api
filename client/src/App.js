import React from 'react';
import {Navbar} from "./components/Navbar";
import {
    EuiButton,
    EuiFieldText,
    EuiFlexGrid,
    EuiFlexItem,
    EuiPage,
    EuiPageBody,
    EuiPageContent,
    EuiPageHeader
} from '@elastic/eui'

function App() {

    const [formElements, setFormElements] = useState({
        loading: false,
    });

    const submitForm = () => {

    }

    return (
        <EuiPage>
            <EuiPageBody component="div">
                <EuiPageHeader>
                    <Navbar/>
                </EuiPageHeader>
                <EuiPageContent>
                    <EuiFlexGrid columns={3}>
                        <EuiFlexItem>
                            <EuiFieldText
                                placeholder="Enter Github Username"

                            />
                        </EuiFlexItem>
                        <EuiFlexItem>
                            <EuiFieldText
                                placeholder="Enter Github Token"

                            />
                        </EuiFlexItem>
                        <EuiFlexItem grow={false}>
                            <EuiButton
                                color={'text'}
                                fill
                                onClick={submitForm}>
                                Submit
                            </EuiButton>
                        </EuiFlexItem>
                    </EuiFlexGrid>
                    {formElements.loading && (
                        <EuiPageContentBody className="loading-chart">
                            <EuiLoadingChart size="xl" />
                        </EuiPageContentBody>
                    )}
                    {!formElements.loading && (
                        <EuiPageContentBody className="chart-body">

                        </EuiPageContentBody>
                    )}
                </EuiPageContent>
            </EuiPageBody>
        </EuiPage>
    );
}

export default App;
