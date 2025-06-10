"use client";
import ErrorLayOut from "@/_Dashboard/components/ErrorLayOut/ErrorLayOut";
import ErrorPage from "@/componentss/Shared/ErrorPage/ErrorPage";
const handler = (props) => <ErrorPage Component={ErrorLayOut} {...props} />;
export default handler;
