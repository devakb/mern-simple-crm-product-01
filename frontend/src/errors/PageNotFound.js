import { Typography } from "@mui/material";

const PageNotFound = () => {
  return (
    <div className="w-100 h-screen d-flex justify-content-center align-items-center">
      <div className="card w-100" style={{ maxWidth: "400px" }}>
        <div className="card-body p-0 m-0 text-center text-muted">
          <Typography variant="button" component="div" className="py-4">
            404 | Page Not Found
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
