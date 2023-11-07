import { useState } from "react";
import NavigationElement from "./navigationElement";

const links = [
    {
        href: "/",
        text: "BankPerebank",
        cls: "navigation-element-logo",
    },
    {
        href: "/deposits",
        text: "Вклады",
    },
    {
        href: "/exchange",
        text: "Обмен Валюты",
    },
];

export default function Navigation() {
    const [open, setOpen] = useState(false);
    function Toggle() {
        setOpen(!open);
    }
    function Close() {
        setOpen(false);
    }
    const linksElements = links.map((link) => {
        return <NavigationElement key={link.href} {...link} onClick={Close} />;
    });
    return (
        <header className="header">
            <nav className={`navigation ${open ? "open" : ""}`}>
                <div className="back" onClick={Close}></div>
                <div className="hamburger-menu" onClick={Toggle}>
                    <span className="hamburger"></span>
                </div>
                <ul className="navigation-list">{linksElements}</ul>
            </nav>
        </header>
    );
}
