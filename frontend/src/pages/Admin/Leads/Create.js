import React from "react";
import useForm from "../../../functions/useForm";
import Template from "../Template";
import { useNavigate } from "react-router-dom";
import useRouter from "../../../functions/useRouter";
import ActionForm from "./Forms/ActionForm";
import { toast } from "react-toastify";
import { backend_routes } from "../../../routeNames";
export const Create = () => {
  const { data, setData, errors, errorMessage, request, processing } =
    useForm();

  const submitHandler = (e) => {
    e.preventDefault();
    request(backend_routes("leads", "create"));
    toast.success("Lead created successfully");
  };

  return (
    <Template title="Leads Create">
      <ActionForm
        data={data ?? {}}
        setData={setData}
        errors={errors ?? {}}
        errorMessage={errorMessage ?? null}
        processing={processing ?? false}
        callback={submitHandler}
      />
    </Template>
  );
};
