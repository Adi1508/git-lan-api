import React from 'react';

import {
    EuiFlexItem,
    EuiButtonIcon,
    EuiPageHeader,
    EuiPageHeaderSection,
    EuiTitle,
} from "@elastic/eui";

export function Navbar() {
    return (
        <EuiPageHeader>
            <EuiPageHeaderSection>
                <EuiTitle size="l">
                    <h1>knowyourgit</h1>
                </EuiTitle>
            </EuiPageHeaderSection>
            <EuiPageHeaderSection>
                <EuiFlexItem grow={false}>
                    <EuiButtonIcon
                        iconSize="xl"
                        iconType="logoGithub"
                        onClick={() =>
                            window.open("https://github.com/neo7337")
                        }
                        aria-label="homepage"
                    />
                </EuiFlexItem>
            </EuiPageHeaderSection>
        </EuiPageHeader>
    )
}