import React, { useEffect, useState } from 'react';
import styles from './Finance.module.css';

interface Currency {
    name: string;
    code: string;
    value: number;
    change: number;
}

const Finance: React.FC = () => {
    const [currencies, setCurrencies] = useState<Currency[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchFinanceData = async () => {
            try {
                const mockData: Currency[] = [
                    { name: 'DOLAR', code: 'USD', value: 37.98, change: 0.18 },
                    { name: 'EURO', code: 'EUR', value: 41.68, change: -0.85 },
                    { name: 'STERLİN', code: 'GBP', value: 49.01, change: -1.65 },
                    { name: 'BITCOIN', code: 'BTC', value: 82671.76, change: 0.18 },
                    { name: 'BIST 100', code: 'BIST', value: 9379.83, change: -1.10 },
                    { name: 'ALTIN', code: 'XAU', value: 3710.58, change: -2.27 },
                    { name: 'FAİZ', code: 'INT', value: 45.99, change: 0.00 },
                ];

                setCurrencies(mockData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching finance data:', error);
                setLoading(false);
            }
        };

        fetchFinanceData();
    }, []);

    return (
        <div className={styles.financeContainer}>
            {loading ? (
                <div className={styles.loading}>Loading finance data...</div>
            ) : (
                <div className={styles.financeTicker}>
                    {currencies.map((currency, index) => (
                        <div key={index} className={styles.financeItem}>
                            <span className={styles.currencyName}>{currency.name}</span>
                            <span className={styles.currencyValue}>{currency.value.toLocaleString()}</span>
                            <span className={`${styles.currencyChange} ${currency.change >= 0 ? styles.positive : styles.negative}`}>
                {currency.change >= 0 ? '↑' : '↓'} {Math.abs(currency.change).toFixed(2)}%
              </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Finance;