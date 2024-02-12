import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { NavPagesObject, getNavPages } from "../../services/headerData";
import device from "../../data/deviceSizes.json"

class NavPagesError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'NavPagesError';
    }
  }

export const NavPages = () => {
    const [navPagesList, setNavPagesList] = useState<NavPagesObject>({navPages: []});
    const [maxNumberOfPages, setMaxNumberOfPages] = useState(0);

    // get navbar pages on load
    useEffect(() => {
        (async (): Promise<void> => {
            try {
                const data = await getNavPages();
                setNavPagesList(data);
            } catch (e) {
                throw new NavPagesError("Unable to get navigation pages");
            }
        })();
    }, [])

    const getMaxNumberOfNavPages = () => {
        if (window.innerWidth < device.medium.minWidth) {
            setMaxNumberOfPages(0)
        } else if (window.innerWidth > device.medium.minWidth && window.innerWidth < device.medium.maxWidth) {
            setMaxNumberOfPages(3)
        } else {
            setMaxNumberOfPages(5)
        }
    }

    useEffect(() => {
        getMaxNumberOfNavPages();

        window.addEventListener("resize", getMaxNumberOfNavPages);

        return () => {
            window.removeEventListener("resize", getMaxNumberOfNavPages);
        }
    }, [])

    return (
        <ul className="nav_pages">
            {navPagesList.navPages.map((page, index) => {
                if (index < maxNumberOfPages) {
                    return (                
                    <li key={index}>
                        <h4>
                            <Link to={page.path}>{page.name}</Link>
                        </h4>
                    </li>
                    )
                }
            })}
        </ul>
    )
}