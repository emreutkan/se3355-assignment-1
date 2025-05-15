import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setGecmisVisible } from '../redux/actions';
import styles from './TopMenu.module.css';

interface MenuItem {
    onClick?: () => void;
    name: string;
    link: string;
    subMenu?: MenuItem[];
}

const TopMenu: React.FC = () => {
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const dispatch = useDispatch();

    const menuItems: MenuItem[] = [
        { name: 'SON DAKİKA', link: '/son-dakika', subMenu: [
                { name: 'Türkiye', link: '/son-dakika/turkiye' },
                { name: 'Dünya', link: '/son-dakika/dunya' },
                { name: 'Ekonomi', link: '/son-dakika/ekonomi' },
            ]},
        { name: 'YAZARLAR', link: '/yazarlar', subMenu: [
                { name: 'Köşe Yazıları', link: '/yazarlar/kose-yazilari' },
                { name: 'Röportajlar', link: '/yazarlar/roportajlar' },
                { name: 'Analizler', link: '/yazarlar/analizler' },
            ]},
        { name: 'GÜNDEM', link: '/gundem' },
        { name: 'EKONOMİ', link: '/ekonomi' },
        { name: 'DÜNYA', link: '/dunya' },
        { name: 'GÜNÜN İÇİNDEN', link: '/gunun-icinden' },
        { name: 'SPOR', link: '/spor' },
        { name: 'HAYAT', link: '/hayat' },
        { name: 'MAGAZİN', link: '/magazin' },
        { name: 'FİNANS', link: '/finans' },
        { name: 'RESMİ İLANLAR', link: '/resmi-ilanlar' },
        { name: 'GEÇMİŞ', link: '#', onClick: () => dispatch(setGecmisVisible(true)) },
    ];

    const handleMouseEnter = (name: string) => {
        setActiveMenu(name);
    };

    const handleMouseLeave = () => {
        setActiveMenu(null);
    };

    return (
        <nav className={styles.topMenu}>
            <div className={styles.menuContainer}>
                <ul className={styles.mainMenu}>
                    {menuItems.map((item, index) => (
                        <li
                            key={index}
                            onMouseEnter={() => handleMouseEnter(item.name)}
                            onMouseLeave={handleMouseLeave}
                            className={activeMenu === item.name ? styles.active : ''}
                        >
                            {item.onClick ? (
                                <a href={item.link} onClick={(e) => {
                                    e.preventDefault();
                                    item.onClick && item.onClick();
                                }}>
                                    {item.name}
                                </a>
                            ) : (
                                <Link to={item.link}>{item.name}</Link>
                            )}

                            {item.subMenu && activeMenu === item.name && (
                                <ul className={styles.subMenu}>
                                    {item.subMenu.map((subItem, subIndex) => (
                                        <li key={subIndex}>
                                            <Link to={subItem.link}>{subItem.name}</Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default TopMenu;