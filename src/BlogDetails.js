import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";

const BlogDetails = () => {
    const {id} = useParams()
    const {data, isPending, errorMessage} = useFetch(`http://localhost:8000/blogs/${id}`)
    const history = useHistory();
    const handleDelete = ()=>{
        fetch(`http://localhost:8000/blogs/${data.id}`,{
            method: 'DELETE'
        }).then(()=>history.push('/'));
    }
    return ( 
        <div className="blog-details">
            {errorMessage && <div>{errorMessage}</div>}
            {isPending && <div>Loading...</div>}
            {data && 
                <article>
                    <h2>{data.title}</h2>
                    <p>Written by {data.author}</p>
                    <div>{data.body}</div>
                    <button onClick={handleDelete}>delete</button>
                </article>}
            
        </div>
     );
}
 
export default BlogDetails;