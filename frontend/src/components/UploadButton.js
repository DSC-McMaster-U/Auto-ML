import UploadIcon from "@mui/icons-material/Upload";
import Button from "@mui/material/Button";

function UploadButton ({setter}) {
    return (<Button
        style={{
          "background-color": "white",
          border: "1px solid #333",
          width: 150,
          height: 55,
          fontFamily: "Public Sans",
          color: "blue",
        }}
        onClick={setter}
      >
        <UploadIcon />
        Dataset
      </Button>)
}

export default UploadButton