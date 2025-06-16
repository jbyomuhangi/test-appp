import clsx from "clsx";
import Link from "next/link";

import { emptyObject } from "@/utils/noOpUtils";
import styles from "./LinkBase.module.css";

const LinkBase = ({ children, href, LinkProps = emptyObject }) => {
  const { className, ...otherLinkProps } = LinkProps;

  return (
    <Link
      className={clsx(styles.linkBase, className)}
      href={href}
      {...otherLinkProps}
    >
      {children}
    </Link>
  );
};

export default LinkBase;
