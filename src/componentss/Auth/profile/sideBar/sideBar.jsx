"use client";
import Link from "@/componentss/Shared/Link/Link";
import styles from "./sideBar.module.css";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthProvider";
import Skeleton from "../../Shared/Skeleton/skeleton";
const SideBar = () => {
  const { session, logOut, isLoading } = useAuth();
  let isSeller =
    session?.influencer && session?.influencer?.state === "approved";
  const pathname = usePathname();
  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <div className={`${styles.head} flex just-sb al-i-c wrap gap10 `}>
          <div className={`${styles.left} flex column gap5`}>
            {isLoading ? (
              <>
                <Skeleton
          className={styles.skTitle}
                />
                <Skeleton
                className={styles.skTitlebig}
        
                />
              </>
            ) : (
              <>
                <h1 className="showSmooth">Hello</h1>
                <p className="showSmooth">{session?.fullName}</p>
              </>
            )}
          </div>
          <div className={`${styles.right} flex `}>
            {isLoading ? (
              <Skeleton
                className={`${styles.showOntablet} ${styles.skTbtnLogOut}`}
          
              />
            ) : (
              <button
                onClick={logOut}
                className={`${styles.btnLogOut} showSmooth ${styles.showOntablet}`}
              >
                log out
              </button>
            )}
          </div>
        </div>
        {isLoading ? (
          <>
            <ul className={`${styles.list} gap20 `}>
              <Skeleton
              
              className={styles.skul}
            />
              <Skeleton  className={styles.skul} />
              <Skeleton  className={styles.skul} />
            </ul>
          </>
        ) : (
          <ul className={`${styles.list} gap20 `}>
            <li className={`${pathname === "/profile" && styles.active} `}>
              <Link href={"/profile"}>Personal details</Link>
            </li>
            <li
              className={`${
                pathname === "/profile/my-purchases" && styles.active
              }`}
            >
              <Link href={"/profile/my-purchases"}>My purchases</Link>
            </li>
            <li
              className={`${pathname === "/profile/vatcher" && styles.active}`}
            >
              <Link href={"/profile/vatcher"}>
                {isSeller ? "transactions" : "become a seller "}
              </Link>
            </li>
          </ul>
        )}
        {isLoading ? (
          <>
            <Skeleton  className={styles.skbtnLogOutbig} type="title" />
          </>
        ) : (
          <button
            onClick={logOut}
            className={`${styles.btnLogOut} showSmooth ${styles.hideOntablet}`}
          >
            log out
          </button>
        )}
      </div>
    </section>
  );
};

export default SideBar;
