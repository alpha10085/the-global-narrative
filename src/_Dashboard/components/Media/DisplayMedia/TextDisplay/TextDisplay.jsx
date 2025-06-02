'use client'
import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import styles from './TextDisplay.module.css'
import axios from 'axios';
import Spinner from '@/components/shared/Spinner/Spinner';
import { delay } from '@/utils/time';
import Skeleton from '@/components/shared/Skeleton/skeleton';
import { useTheme } from "@/_Dashboard/context/ThemeCTX"
function FileDisplay({ url = '', }) {
    const [fileContent, setFileContent] = useState('');
    const [fileType, setFileType] = useState('');
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const { theme } = useTheme()
    const handleFetchFile = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(url, {
                responseType: 'text', // Important for handling binary data
            })
            // Check the file extension or content-type to determine the file type
            if (url?.endsWith('.csv')) {
                Papa?.parse(data, {
                    header: true,
                    complete: (result) => {
                        setFileContent(result.data);
                        setFileType('csv');
                    },
                });
            } else {
                setFileContent(data);
                setFileType('text');
            }
        } catch (error) {
            setError({
                message: error?.message || 'Failed to fetch file',
                error: true,
            })
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        url && handleFetchFile()
    }, [url])
    if (loading) return (

        <Skeleton theme={theme?.name} className={styles.Skeleton} type="image" />

    )
    if (!url) return null

    return (
        <div className={`${styles.container} ${theme.scrollBar} showSmooth`}>
            {error ? "error" : fileType === 'csv' ? renderTable(fileContent) : <pre>{fileContent}</pre>}
        </div>
    );
}

function renderTable(data) {
    if (!data?.length) return null;

    const headers = Object?.keys(data?.[0]);
    if (!headers?.length) return null;
    return (
        <table >
            <thead>
                <tr>
                    {headers?.map((header, index) => (
                        <th key={index}>{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data?.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {headers?.map((header, colIndex) => (
                            <td key={colIndex}>{row[header]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default FileDisplay;
