import { Link } from "react-router-dom";

type Props = {
    href: string;
    cls?: string;
    onClick: () => void;
    text: string;
};

export default function NavigationElement({ href, cls, onClick, text }: Props) {
    return (
        <li className={`navigation-element ${cls}`}>
            <Link to={href} className="nav-link" onClick={onClick}>
                {text}
            </Link>
        </li>
    );
}
