import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import Tbody, { Td } from "../../../components/Tables/Tbody";
import Thead, { Th } from "../../../components/Tables/Thead";
import Table from "../../../components/Tables/Table";
import Template from "../Template";
import SimplePagination from "../../../components/Others/SimplePagination";
import { Container, Drawer, Grid, List, Typography } from "@mui/material";
import { VscChromeClose } from "react-icons/vsc";
import { backend_routes, frontend_routes } from "../../../routeNames";
import CsAlertBox from "../../../components/Others/CsAlertBox";
import useForm from "../../../functions/useForm";
import { useDispatch } from "react-redux";
import {
  endPageLoading,
  startPageLoading,
} from "../../../actions/PageLoadingAction";
import { toast } from "react-toastify";
import useRouter from "../../../functions/useRouter";
import { useLocation, useNavigate } from "react-router-dom";

export const Index = () => {
  let [leads, setLeads] = useState([]);
  let [totalPages, setTotalPages] = useState(1);
  let [loading, setLoading] = useState(true);
  let [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const search = useLocation().search;
  const url_query_page = new URLSearchParams(search).get("page");

  let [page, setPage] = useState(
    Number(url_query_page > 0 ? url_query_page : 1)
  );
  let [meta, setMeta] = useState(null);
  let [viewLead, setViewLead] = useState(null);
  console.log(page);
  let [deleteLeadConfirmationID, setDeleteLeadConfirmationID] = useState(null);

  let { request } = useForm(); // destroy is a function as a DELETE method;
  const dispatch = useDispatch();

  const deleteLead = async () => {
    dispatch(startPageLoading());

    request(
      backend_routes("leads", "delete", { lead_id: deleteLeadConfirmationID }),
      false,
      getLeadsAfterDelete
    );
  };

  const getLeadsAfterDelete = () => {
    getLeads();
    setDeleteLeadConfirmationID(null);
    dispatch(endPageLoading());
    toast.success("Lead deleted successfully");
  };

  const reset = () => {
    setLoading(true);
    setLeads({});
    setMeta({});
    setTotalPages({});
    setErrorMessage(null);
  };

  const getLeads = () => {
    reset();

    navigate("?page=" + page);

    axios
      .get(backend_routes("leads", "index", {}, { page }).url)
      .then((response) => {
        setLeads(response.data.data);
        setMeta(response.data.meta);
        setTotalPages(response.data.meta.pagination.total_pages);
        setLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error.message ?? "Internal Server Error");
        setLoading(false);
      });
  };

  useEffect(() => {
    getLeads(leads);
  }, []);

  useEffect(() => {
    getLeads(leads);
  }, [page]);

  const { visit } = useRouter();

  return (
    <Template title="Leads">
      {leads.length > 0 && (
        <Fragment>
          <button
            className="simple-white-btn"
            onClick={() => visit(frontend_routes("leads", "create"))}
          >
            Add New
          </button>
          <br />
          <br />
        </Fragment>
      )}

      <div className="card">
        <div className="card-body">
          {leads.length > 0 ? (
            <Table>
              <Thead>
                <tr>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Phone</Th>
                  <Th>Country</Th>
                  <Th>Status</Th>
                  <Th>&nbsp;</Th>
                </tr>
              </Thead>
              <Tbody
                isLoading={loading}
                errorMessage={errorMessage ?? null}
                retryCallback={getLeads}
              >
                {leads.map((lead, index) => {
                  return (
                    <tr key={index} style={{ cursor: "pointer" }}>
                      <Td>
                        {lead.salutation} {lead.first_name} {lead.last_name}
                      </Td>
                      <Td>{lead.email}</Td>
                      <Td>{lead.phone_number}</Td>
                      <Td>{lead.address.country}</Td>
                      <Td>{lead.status.toUpperCase()}</Td>
                      <Td>
                        <button
                          className="simple-white-btn"
                          onClick={() => setViewLead(lead)}
                        >
                          View
                        </button>
                        <button
                          className="simple-blue-btn"
                          onClick={() =>
                            visit(
                              frontend_routes("leads", "edit", {
                                lead_id: lead.lead_id,
                              })
                            )
                          }
                        >
                          Update
                        </button>
                        <button
                          className="simple-red-btn"
                          onClick={() =>
                            setDeleteLeadConfirmationID(lead.lead_id)
                          }
                        >
                          Delete
                        </button>
                      </Td>
                    </tr>
                  );
                })}
              </Tbody>
            </Table>
          ) : (
            <div className="text-center text-muted fs-14 py-5">
              No leads found &nbsp;&nbsp;
              <button
                className="simple-white-btn"
                onClick={() => visit(frontend_routes("leads", "create"))}
              >
                Add New
              </button>
            </div>
          )}
        </div>
      </div>
      {/* <br />
      {Object.keys(meta).length > 0 && (
        <>
          <Typography variant="button">
            <span>Page:&nbsp; {meta.pagination.page}</span>
            &nbsp; &nbsp;
            <span>
              Records: &nbsp;
              {meta.pagination.per_page * (meta.pagination.page - 1) + 1} -{" "}
              {meta.pagination.per_page * (meta.pagination.page - 1) +
                leads.length}
            </span>
          </Typography>
        </>
      )}
      <br /> */}
      <br />

      <SimplePagination
        page={page}
        totalPages={totalPages}
        forceDisable={loading ?? false}
        callback={setPage}
      />
      {/* Total Pages {Object.keys(meta).length > 0 && meta.pagination.total_pages}{" "}
        <br />
        Per Page {Object.keys(meta).length > 0 && meta.pagination.per_page} <br />
        Current Page {Object.keys(meta).length > 0 && meta.pagination.page} <br />
        Total {Object.keys(meta).length > 0 && meta.pagination.total} <br />
        <br />
        <br /> */}
      {leads.length > 0 && (
        <Fragment>
          <Drawer
            anchor={"right"}
            open={viewLead != null}
            onClose={() => setViewLead(null)}
          >
            {viewLead != null && (
              <div
                className="position-relative"
                style={{ maxWidth: "550px", width: "100%" }}
                className="py-4"
              >
                <button
                  onClick={() => setViewLead(null)}
                  className="simple-white-btn m-0 drawer-close-btn"
                >
                  <VscChromeClose size="1.2rem" />
                </button>

                <Container>
                  <Typography
                    variant="h6"
                    component="div"
                    className="text-primary mb-3"
                  >
                    General Information
                  </Typography>

                  <Grid container rowSpacing={5}>
                    <Grid item md={12}>
                      <Typography variant="button" component="div">
                        Lead ID
                      </Typography>
                      <Typography variant="body2" component="div">
                        {viewLead.lead_id}
                      </Typography>
                    </Grid>
                    <Grid item md={6}>
                      <Typography variant="button" component="div">
                        Salutation & First Name
                      </Typography>
                      <Typography variant="body2" component="div">
                        {viewLead.salutation ?? "-"}{" "}
                        {viewLead.first_name ?? "Not Available"}
                      </Typography>
                    </Grid>
                    <Grid item md={6}>
                      <Typography variant="button" component="div">
                        Last Name
                      </Typography>
                      <Typography variant="body2" component="div">
                        {viewLead.last_name ?? "Not Available"}
                      </Typography>
                    </Grid>
                    <Grid item md={6}>
                      <Typography variant="button" component="div">
                        Email Address
                      </Typography>
                      <Typography variant="body2" component="div">
                        {viewLead.email ?? "Not Available"}
                      </Typography>
                    </Grid>
                    <Grid item md={6}>
                      <Typography variant="button" component="div">
                        Phone Number
                      </Typography>
                      <Typography variant="body2" component="div">
                        {viewLead.phone_number ?? "Not Available"}
                      </Typography>
                    </Grid>
                    <Grid item md={6}>
                      <Typography variant="button" component="div">
                        Source
                      </Typography>
                      <Typography variant="body2" component="div">
                        {viewLead.source ?? "Not Available"}
                      </Typography>
                    </Grid>
                    <Grid item md={6}>
                      <Typography variant="button" component="div">
                        Status
                      </Typography>
                      <Typography variant="body2" component="div">
                        {viewLead.status ?? "Not Available"}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Typography
                    variant="h6"
                    component="div"
                    className="text-primary my-3"
                  >
                    Address Information
                  </Typography>

                  <Grid container rowSpacing={5}>
                    <Grid item md={12}>
                      <Typography variant="button" component="div">
                        Address
                      </Typography>
                      <Typography variant="body2" component="div">
                        {viewLead.address.street ?? "Not Available"}
                      </Typography>
                    </Grid>
                    <Grid item md={6}>
                      <Typography variant="button" component="div">
                        City
                      </Typography>
                      <Typography variant="body2" component="div">
                        {viewLead.address.city ?? "Not Available"}
                      </Typography>
                    </Grid>
                    <Grid item md={6}>
                      <Typography variant="button" component="div">
                        State
                      </Typography>
                      <Typography variant="body2" component="div">
                        {viewLead.address.state ?? "Not Available"}
                      </Typography>
                    </Grid>
                    <Grid item md={6}>
                      <Typography variant="button" component="div">
                        Zip
                      </Typography>
                      <Typography variant="body2" component="div">
                        {viewLead.address.zip ?? "Not Available"}
                      </Typography>
                    </Grid>
                    <Grid item md={6}>
                      <Typography variant="button" component="div">
                        Country
                      </Typography>
                      <Typography variant="body2" component="div">
                        {viewLead.address.country ?? "Not Available"}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Typography
                    variant="h6"
                    component="div"
                    className="text-primary my-3"
                  >
                    Social Information
                  </Typography>

                  <Grid container rowSpacing={5}>
                    {viewLead.social &&
                      viewLead.social.map((item, index) => {
                        return (
                          <Grid item md={12} key={index}>
                            <Typography variant="button" component="div">
                              {item.name ?? "Not Available"}
                            </Typography>
                            <a
                              href={item.profile_url ?? "#"}
                              target="_blank"
                              className="text-dark text-decoration-none"
                            >
                              <Typography variant="body2" component="div">
                                {item.profile_url ?? "Not Available"}
                              </Typography>
                            </a>
                          </Grid>
                        );
                      })}
                  </Grid>
                </Container>
              </div>
            )}
          </Drawer>

          <CsAlertBox
            show={deleteLeadConfirmationID !== null}
            onCancel={() => setDeleteLeadConfirmationID(null)}
            heading="Delete Lead"
            message="This will permanently remove the Lead. This action cannot be undone."
            callback={() => deleteLead(deleteLeadConfirmationID ?? null)}
          />
        </Fragment>
      )}
    </Template>
  );
};
