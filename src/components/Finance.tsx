import React, { useEffect, useState } from 'react';
import styles from './Finance.module.css';
import { Currency, api } from '../services/api';

const Finance: React.FC = () => {
    const [currencies, setCurrencies] = useState<Currency[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchFinanceData = async () => {
            try {
                const data = await api.getFinanceData();
                setCurrencies(data);
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
                <div className={styles.tickerWrapper}>
                    <div className={styles.financeTicker}>
                        {[...currencies, ...currencies, ...currencies].map((currency, index) => (
                            <div key={index} className={styles.financeItem}>
                                <span className={styles.currencyName}>{currency.name}</span>
                                <span className={styles.currencyValue}>{currency.value.toFixed(2)}</span>
                                <span className={`${styles.currencyChange} ${currency.change >= 0 ? styles.positive : styles.negative}`}>
                                    {currency.change >= 0 ? '+' : ''}{currency.change.toFixed(2)}%
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Finance;