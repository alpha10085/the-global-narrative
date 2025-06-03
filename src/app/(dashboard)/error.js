"use client";
import ErrorLayOut from "@/_Dashboard/Components/ErrorLayOut/ErrorLayOut";
import ErrorPage from "@/Components/Shared/ErrorPage/ErrorPage";
const handler = (props) => <ErrorPage Component={ErrorLayOut} {...props} />;
export default handler;
