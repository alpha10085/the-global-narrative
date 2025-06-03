"use client";
import ErrorLayOut from "@/_Dashboard/Components/ErrorLayOut/ErrorLayOut";
import ErrorPage from "@/_components/Shared/ErrorPage/ErrorPage";
const handler = (props) => <ErrorPage Component={ErrorLayOut} {...props} />;
export default handler;
