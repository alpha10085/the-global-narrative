 
import React, { useEffect, useState } from "react";
import "./popup.css";
import { useNavigate } from "react-router-dom";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import Link from "@/_components/Shared/Link/Link";
const Popup = ({ openpop, setopenpop, type }) => {
  const navigate = useNavigate();

  return (
    <div className="PopupCart" onClick={(e) => setopenpop(!openpop)}>
      <div className="wrapper-popup">
        {type === "NoAccount" ? <h1> sign in to Next step </h1> : ""}
        {type === "NoCollections" ? (
          <h1 className="NoCollections-h1"> Oops' no Collections in Cart </h1>
        ) : (
          ""
        )}
        {type === "NoCollections" ? (
          <p>
            Allow push Notification so we can inform you about new updates, tips
            and sprcial offers
          </p>
        ) : (
          ""
        )}
        {type === "NoAccount" ? (
          <p>
            Allow push Notification so we can inform you about new updates, tips
            and sprcial offers
          </p>
        ) : (
          ""
        )}
        <div className="btn-box">
          {type === "NoAccount" ? (
            <button>
              <Link href={"/registration"}>
                {" "}
                Sign up <PersonAddAltIcon />
              </Link>
            </button>
          ) : (
            <button className=" Go-Shopping">
              <Link href={"/"}>Go Shopping</Link>
            </button>
          )}
          {type === "NoAccount" ? (
            <button>
              {" "}
              <Link href={"/login"}>log in</Link>{" "}
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Popup;
