import { useParams } from "react-router-dom"

function SingleDoc() {
     const { id: documentId } = useParams();
     return (
          <div>SingleDoc id: {documentId}</div>
     )
}

export default SingleDoc