import React, { useLayoutEffect, useState } from "react";
import useForm from "../../../functions/useForm";
import Template from "../Template";
import ActionForm from "./Forms/ActionForm";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { PAGE_CONTECT_LOAD_SIZE } from "../../../config";
import FullWidthErrorMessage from "../../../components/errors/FullWidthErrorMessage";
import useRouter from "../../../functions/useRouter";
import { toast } from "react-toastify";
import { backend_routes, frontend_routes } from "../../../routeNames";
export const Edit = () => {
  const { data, setData, errors, errorMessage, request, processing } =
    useForm();

  let { lead_id } = useParams();
  let { visit } = useRouter();

  let [leadErrorMessage, setLeadErrorMessage] = useState(null);
  let [pageContentLoading, setPageContentLoading] = useState(true);

  const submitHandler = (e) => {
    e.preventDefault();
    request(backend_routes("leads", "edit", { lead_id: lead_id }), false); // if false then it will not reset the form data
    toast.success("Lead updated successfully");
  };

  const getLead = (lead_id) => {
    setPageContentLoading(true);
    setLeadErrorMessage(null);

    axios
      .get(backend_routes("leads", "show", { lead_id: lead_id }).url)
      .then((res) => {
        setPageContentLoading(false);
        setData(res.data.data);
      })
      .catch((err) => {
        setPageContentLoading(false);
        setLeadErrorMessage(
          err.response ? err.response.data.message : err.message
        );
      });
  };

  useLayoutEffect(() => getLead(lead_id), []);

  return (
    <Template title="Leads Create">
      {pageContentLoading ? (
        <div className="d-flex justify-content-center">
          <CircularProgress color="inherit" size={PAGE_CONTECT_LOAD_SIZE} />
        </div>
      ) : (
        <>
          {leadErrorMessage ? (
            <>
              {leadErrorMessage == "Network Error" ? (
                <FullWidthErrorMessage
                  message={leadErrorMessage}
                  callback={() => getLead(lead_id)}
                  callbackMessage="Reload"
                />
              ) : (
                <FullWidthErrorMessage
                  message={leadErrorMessage}
                  callback={() => visit(frontend_routes("leads", "index"))}
                  callbackMessage="View all leads"
                />
              )}
            </>
          ) : (
            <ActionForm
              data={data ?? {}}
              setData={setData}
              errors={errors ?? {}}
              errorMessage={errorMessage ?? null}
              processing={processing ?? false}
              callback={submitHandler}
            />
          )}
        </>
      )}
    </Template>
  );
};
