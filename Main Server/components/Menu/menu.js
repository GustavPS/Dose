import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Styles from './menu.module.css';

const Menu = (props) => {
    const {
        server,
        className
    } = props;
    const router = useRouter();

    useEffect(() => {
        const links = document.getElementsByClassName(Styles.link);
        for (const link of links) {
            if (router.asPath === link.getAttribute('href')) {
                link.classList.add(Styles.active);
            }
        }
    }, []);

    return (
        <nav className={className}>
            <Link href={`/server/${server.server_id}`}><a className={Styles.link}>Home</a></Link>
            <Link href={`/server/${server.server_id}/movies`}><a className={Styles.link}>Movies</a></Link>
            <Link href={`/server/${server.server_id}/shows`}><a className={Styles.link}>TV Shows</a></Link>
        </nav>
    );
}

export default Menu;